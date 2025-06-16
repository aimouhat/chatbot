import os
import time
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from uuid import uuid4
from models import Models
from langchain_ollama import OllamaEmbeddings

# Charger les variables d'environnement
load_dotenv()

# Initialiser le modèle Ollama
models = Models()

# Utiliser la classe d'embeddings correcte
embeddings = OllamaEmbeddings(model="mxbai-embed-large")

# Définir les constantes
data_folder = "./data"
chunk_size = 1000
chunk_overlap = 50
check_interval = 10

# Chroma vector store avec Ollama embeddings
vector_store = Chroma(
    collection_name="documents",
    embedding_function=embeddings,  # Utilisation correcte
    persist_directory="./db/chroma_langchain_db",
)

# Fonction pour ingérer un fichier PDF
def ingest_file(file_path):
    if not file_path.lower().endswith('.pdf'):
        print(f"Skipping non-PDF file: {file_path}")
        return

    print(f"Starting to ingest file: {file_path}")
    loader = PyPDFLoader(file_path)
    loaded_documents = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size, chunk_overlap=chunk_overlap, separators=["\n", " ", ""]
    )

    documents = text_splitter.split_documents(loaded_documents)
    uuids = [str(uuid4()) for _ in range(len(documents))]
    
    print(f"Adding {len(documents)} documents to the vector store")
    vector_store.add_documents(documents=documents, ids=uuids)
    print(f"Finished ingesting file: {file_path}")

# Boucle principale pour surveiller le dossier et ingérer les fichiers
def main_loop():
    while True:
        for filename in os.listdir(data_folder):
            if not filename.startswith("_"):
                file_path = os.path.join(data_folder, filename)
                ingest_file(file_path)
                new_filename = "_" + filename
                new_file_path = os.path.join(data_folder, new_filename)
                os.rename(file_path, new_file_path)
        time.sleep(check_interval)

# Exécution du script
if __name__ == "__main__":
    main_loop()
