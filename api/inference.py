
MODEL_ID_MOONDREAM = "vikhyatk/moondream2"
REVISION = "2024-04-02"
MODEL_ID_LLM = "microsoft/phi-2"

def run_model(img_base64: str, schema: str):

    from transformers import AutoModelForCausalLM, AutoTokenizer
    import outlines
    from PIL import Image
    from io import BytesIO
    import base64
 
    ###
    # Inference to describe image
    ###

    md_model = AutoModelForCausalLM.from_pretrained(MODEL_ID_MOONDREAM, trust_remote_code=True, revision=REVISION).to('cuda')
    md_tokenizer = AutoTokenizer.from_pretrained(MODEL_ID_MOONDREAM, revision=REVISION)

    image = Image.open(BytesIO(base64.b64decode(img_base64)))
    enc_image = md_model.encode_image(image)
     
    image_description = md_model.answer_question(enc_image, "Describe this image.", md_tokenizer)

    print(f"Image description: {image_description}")

    ###
    # Inference to structure description
    ###
    from pydantic import BaseModel

    class ImageDesc(BaseModel):
        house_color: str
        sky_colour: str
        has_humans: bool
    
    print('starting inference')

    model = outlines.models.transformers(MODEL_ID_LLM, device="cuda")
    generator = outlines.generate.json(model, ImageDesc)
    result = generator(f"Summarize the following as json. \n{image_description}")

    print('inference done')
    print(result)
    
    return {"result": result}

