import requests

def main():
    from pydantic import BaseModel
    import base64

    class ImageDesc(BaseModel):
        house_color: str
        sky_colour: str
        has_humans: bool

    schema = ImageDesc.model_json_schema()
    
    with open("./example.png", "rb") as img:
        img_base64 = base64.b64encode(img.read())    

    img_base64 = str(img_base64)
    img_base64 = img_base64[2:-1] # quick hack to get rid of "b'"

    url = "https://erikkaum--converter-api-run-dev.modal.run"
    data = {
        "image": str(img_base64),
        "structure": str(schema)
    }

    res = requests.post(url, json=data)

    print(res)

if __name__ == "__main__":
    main()