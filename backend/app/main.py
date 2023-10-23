from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.chatbot import chat

class Input(BaseModel):
    user_question: str

app=FastAPI()

@app.post("/chat")
async def chat_input(user_input: Input):
    answer = chat(user_input.user_question)
    return answer


origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8000",
    "http://localhost:3000",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
