import google.generativeai as genai
import os
import base64
from time import sleep

GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel(model_name="gemini-1.5-pro")

def encode_image(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")



def  describe_image(image_path, analysis):
    prompt = "Find the problem in the given image and describe it in a few lines (no filler words and don't try to find the cause)"

    image = encode_image(image_path)
    response = model.generate_content(
        [
            {
                "mime_type": "image/png",
                "data": image,
            },
            prompt + "\n\n" + " ".join(analysis),
        ]
    )

    # print(response.text)
    return response.text

if __name__ == "__main__":
    image = "test/poles.png"
    analysis = ["Damaged Pole"]
    text =  describe_image(image, analysis)
    print(text)
