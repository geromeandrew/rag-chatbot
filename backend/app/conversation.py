from langchain import ConversationChain, LLMChain, PromptTemplate
from dotenv import load_dotenv
from langchain.llms import HuggingFaceHub

load_dotenv()

def conversation(human_input):
    template = """Assistant is a large language model trained by  OpenAI.

    Assistant is designed to be able to assist with a wide range of tasks, from answering simple questions to providing in-depth explanations and discussions on a wide range of topics. As a language model, Assistant is able to generate human-like text based on the input it receives, allowing it to engage in natural-sounding conversations and provide responses that are coherent and relevant to the topic at hand.

    Assistant is constantly learning and improving, and its capabilities are constantly evolving. It is able to process and understand large amounts of text, and can use this knowledge to provide accurate and informative responses to a wide range of questions. Additionally, Assistant is able to generate its own text based on the input it receives, allowing it to engage in discussions and provide explanations and descriptions on a wide range of topics.

    Overall, Assistant is a powerful tool that can help with a wide range of tasks and provide valuable insights and information on a wide range of topics. Whether you need help with a specific question or just want to have a conversation about a particular topic, Assistant is here to assist.
    Human: {human_input}
    Assistant:"""

    prompt = PromptTemplate(
        input_variables=["human_input"],
        template=template
    )

    chatgpt_chain = LLMChain(
        llm=HuggingFaceHub(repo_id="google/flan-t5-xxl", model_kwargs={"temperature":0.5, "max_length":1024}),
        prompt=prompt,
        verbose=True,
    )

    output = chatgpt_chain.predict(human_input=human_input)
    print("The output: ", output)
    print("The datatype: ", type(output))
    return output