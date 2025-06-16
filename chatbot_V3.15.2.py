import os
import time
import threading
import re
import pyttsx3
from flask import Flask, render_template, request, jsonify, session
from flask_session import Session

from langchain_ollama import OllamaEmbeddings, ChatOllama
from langchain_chroma import Chroma

# Initialize Flask app
app = Flask(__name__)
app.secret_key = 'lavex-secret-key'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

# --- MODEL SETUP ---
class Models:
    def __init__(self):
        self.embeddings_ollama = OllamaEmbeddings(model="mxbai-embed-large")
        self.model_ollama = ChatOllama(model="llama3.2", temperature=0)

        # Text-to-Speech (offline pyttsx3)
        self.engine = pyttsx3.init()
        voices = self.engine.getProperty('voices')
        for voice in voices:
            if "English" in voice.name:
                self.engine.setProperty('voice', voice.id)
                break
        self.engine.setProperty('rate', 160)

        self.system_prompt = (
            "You are LAVEX — an AI expert assistant for the beneficiation washing plant of Benguerir, "
            "the first advanced wash plant at OCP. LAVEX stands for 'Laverie Expert' in French. "
            "Provide clear, concise answers in English, strictly based on the provided data. "
            "Do not include your name unless asked. If asked 'What is your name?', reply: "
            "'My name is Lavex. That means Laverie Expert in French, reflecting my role as an AI assistant in beneficiation and washing processes of b.' "
            "Avoid assumptions or opinions. Respond only with accurate, actionable, and context-specific information. "
            "D'ont give information about a person until its requested"
            "If asked about a person’s role or responsibility (e.g., mechanical maintenance of the hopper), respond with the relevant provided contact details, including name, role, phone, email, and WhatsApp if available."
        )

    def text_to_speech(self, text):
        if not isinstance(text, str) or not text.strip():
            return None
        filename = f"audio_{int(time.time())}.mp3"
        output_dir = os.path.join("static", "audio")
        os.makedirs(output_dir, exist_ok=True)
        output_path = os.path.join(output_dir, filename)
        self.engine.save_to_file(text, output_path)
        self.engine.runAndWait()
        return output_path

model = Models()

# --- VECTOR DB SETUP ---
embeddings = OllamaEmbeddings(model="mxbai-embed-large")
vector_store = Chroma(
    collection_name="documents",
    embedding_function=embeddings,
    persist_directory="./db/chroma_langchain_db"
)

def format_response(text):
    text = text.replace("•", "").strip()

    # Format name, department, and role
    text = re.sub(
        r'(?P<name>[A-Z][A-Za-z\s]+), from (?P<dept>[A-Z]+), is responsible for (?P<role>[^.]+)\.',
        r"""👤 **\g<name>**  
🏢 Department: \g<dept>  
🛠️ Role: \g<role>.""",
        text
    )

    # Add line breaks for each contact method
    text = re.sub(
        r'(Phone:)?\s*\+212[ \-]?(\d{3})[ \-]?(\d{6})',
        r'📞 [Call: +212 \2 \3](tel:+212\2\3)<br>',
        text
    )

    text = re.sub(
        r'(Email:)?\s*([a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+)',
        r'📧 [\2](mailto:\2)<br>',
        text
    )

    text = re.sub(
        r'(WhatsApp:)?\s*(https?://wa\.me/\d+)',
        r'💬 [Chat on WhatsApp](\2)<br>',
        text
    )

    return text



# --- ROUTES ---
@app.route('/')
def home():
    return render_template('index.html')


@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_input = data.get("message", "").strip()
    if not user_input:
        return jsonify({"error": "Empty message"}), 400

    history = session.get('conversation', [])
    history.append({"role": "user", "content": user_input})

    # Retrieve from vector store
    try:
        docs = vector_store.similarity_search(user_input, k=3)
        retrieved_chunks = "\n\n".join([doc.page_content for doc in docs])
    except Exception as e:
        print("Vector DB retrieval error:", e)
        retrieved_chunks = ""

# Build prompt using context and chat history
    prompt_parts = [
        model.system_prompt,
        "\nYou are answering the following user query based strictly on the provided context.\n"
    ]

    if retrieved_chunks:
        prompt_parts.append("📄 Context:\n" + retrieved_chunks)
    else:
        prompt_parts.append("📄 Context: No relevant documents were found.\n")

    prompt_parts.append(f"\n User Question:\n{user_input}\n")
    prompt_parts.append("Assistant Answer:")

    full_prompt = "\n".join(prompt_parts)
    
    # Get AI response
    response = model.model_ollama.invoke(full_prompt)
    response_text = response.content if hasattr(response, 'content') else str(response)
    response_text = format_response(response_text)

    history.append({"role": "assistant", "content": response_text})
    session['conversation'] = history

    # Generate audio
    def generate_audio(text):
        audio_path = model.text_to_speech(text)
        with open("latest_audio_path.txt", "w") as f:
            f.write(audio_path or "")
    threading.Thread(target=generate_audio, args=(response_text,)).start()

    return jsonify({"response": response_text})


@app.route('/generate-audio', methods=['GET'])
def get_audio():
    audio_file = ""
    try:
        with open("latest_audio_path.txt", "r") as f:
            audio_file = f.read().strip()
        if audio_file and os.path.exists(audio_file):
            return jsonify({"audio": "/" + audio_file.replace("\\", "/")})
    except:
        pass
    return jsonify({"audio": None})


@app.route('/clear', methods=['POST'])
def clear_conversation():
    session.pop('conversation', None)
    if os.path.exists("latest_audio_path.txt"):
        os.remove("latest_audio_path.txt")
    audio_folder = os.path.join("static", "audio")
    if os.path.exists(audio_folder):
        for file in os.listdir(audio_folder):
            os.remove(os.path.join(audio_folder, file))
    return jsonify({"message": "Conversation and audio cleared."})


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)

