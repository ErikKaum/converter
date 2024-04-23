from modal import Image, App, web_endpoint, gpu 
from inference import run_model
from pydantic import BaseModel 

MODEL_ID_MOONDREAM = "vikhyatk/moondream2"
REVISION = "2024-04-02"
MODEL_ID_LLM = "microsoft/phi-2"

app = App("converter-api")

image = Image.debian_slim(python_version="3.11").pip_install(
    "transformers==4.40.0",
    "pillow==10.3.0",
    "torch==2.2.2",
    "einops==0.7.0",
    "torchvision==0.17.2",
    "outlines==0.0.40",
    "datasets==2.19.0",
    "fastapi==0.110.2",
    "pydantic==2.7.0",
    "accelerate==0.27.2",
)

# declaring the model and tokenizer to "cache them in the container image"
def import_models():
    from transformers import AutoModelForCausalLM, AutoTokenizer

    # moondream
    model = AutoModelForCausalLM.from_pretrained(MODEL_ID_MOONDREAM, trust_remote_code=True, revision=REVISION)
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID_MOONDREAM, revision=REVISION)

    # phi-2
    model = AutoModelForCausalLM.from_pretrained(MODEL_ID_LLM, trust_remote_code=True)
    tokenizer = AutoTokenizer.from_pretrained(MODEL_ID_LLM, trust_remote_code=True)


image = image.run_function(import_models)

class Payload(BaseModel):
    image: str
    structure: str


@app.function(image=image, gpu=gpu.A100(memory=80))
@web_endpoint(method="POST")
def run(payload: Payload):
    
    res = run_model(payload.image, payload.structure)
    return {"result": res}

    return payload
