import os
import time
import asyncio
import edge_tts
from dotenv import load_dotenv
from langchain_ollama import OllamaEmbeddings, ChatOllama

class Models:
    def __init__(self):
        # Initialisation des embeddings Ollama
        self.embeddings_ollama = OllamaEmbeddings(model="mxbai-embed-large")
        
        # Initialisation du modèle de chat Ollama
        self.model_ollama = ChatOllama(model="llama3.2", temperature=0)

    def get_embedding(self, text):
        return self.embeddings_ollama.embed_query(text)

    def chat_completion(self, prompt):
        response = self.model_ollama.invoke(prompt)
        return response

    async def text_to_speech(self, text, output_file="output.mp3"):
        print("🔊 Début de la conversion texte en parole...")
        
        communicate = edge_tts.Communicate(text, "en-US-JennyNeural")
        await communicate.save(output_file)

        # Vérifier si le fichier a bien été enregistré
        if os.path.exists(output_file):
            print(f"✅ Audio enregistré avec succès : {output_file}")
        else:
            print("❌ Erreur : le fichier audio ne s'est pas enregistré.")

        print("📂 Fichiers dans le dossier actuel :", os.listdir("."))


# Exemple d'utilisation
if __name__ == "__main__":
    models = Models()
    
    # Exemple d'embedding
    embedding = models.get_embedding("Bonjour, comment vas-tu ?")
    print("Embedding:", embedding[:5], "...")  # Affichage partiel
    
    # Exemple de complétion
    response = models.chat_completion("Écris un haïku sur l'IA")
    print("Réponse AI:", response)
    
    # Convertir le texte en parole
    asyncio.run(models.text_to_speech(response))
