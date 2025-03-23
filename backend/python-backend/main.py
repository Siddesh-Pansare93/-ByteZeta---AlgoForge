from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil
from pathlib import Path
import uuid
from analyze import analyze_image
from description import describe_image

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):  # The key must match "file" in formData.append()
    print(f"Received file: {file.filename}")

    try:
        filename = file.filename if file.filename else f"{uuid.uuid4()}.jpg"
        file_path = Path(UPLOAD_FOLDER) / filename

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        analysis, score = analyze_image(str(file_path))
        description = describe_image(str(file_path), analysis)

        return {"result": analysis, "description": description, "score": score}

    except Exception as e:
        print(f"Error: {e}")
        return {"error": str(e)}
