import os
from uuid import uuid4
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings

embeddings = OllamaEmbeddings(model="mxbai-embed-large")

def ingest_file(file_path: str, session_id: str):
    if not file_path.lower().endswith(".pdf"):
        print(f"Skipping non-PDF file: {file_path}")
        return

    print(f"Ingesting for session: {session_id}")
    loader = PyPDFLoader(file_path)
    loaded_documents = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000, chunk_overlap=50, separators=["\n", " ", ""]
    )
    documents = text_splitter.split_documents(loaded_documents)
    uuids = [str(uuid4()) for _ in documents]

    vector_store = Chroma(
        collection_name=f"session_{session_id}",
        embedding_function=embeddings,
        persist_directory=f"./db/session_{session_id}"
    )
    vector_store.add_documents(documents=documents, ids=uuids)
    vector_store.persist()

    print(f"Documents added to session {session_id}'s vector DB.")
