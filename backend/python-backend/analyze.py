import torch
import cv2
import numpy as np
from ultralytics import YOLO


def analyze_image(image_path):
    model = YOLO("best.pt")
    analysis = []
    score = 0
    score_dict = {
        "Damaged Pole": 3,
        "Pothole": 2,
        "Garbage": 1,
    }
    image = cv2.imread(image_path)
    results = model(image)

    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])  # Bounding box coordinates
            confidence = box.conf[0].item()  # Confidence score
            class_id = int(box.cls[0].item())  # Class ID
            class_name = model.names[class_id]
            if confidence > 0.5 and class_name != "Fallen Tree":
            
                # Draw bounding box
                cv2.rectangle(image, (x1, y1), (x2, y2), (0, 255, 0), 2)
                
                # Add label text
                if class_name == "Broken Pole" or class_name == "Inclined Pole":
                    class_name = "Damaged Pole"
                label = f"{class_name}: {confidence:.2f}"
                cv2.putText(image, label, (x1, y1 - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
                print(label)
                if class_name not in analysis:
                    analysis.append(class_name)
                score += score_dict.get(class_name, 0)
                print(f"Score: {score}")

    # Save the annotated image
    output_path = "annotated_image.jpg"
    cv2.imwrite(output_path, image)

    print(f"Annotated image saved as {output_path}")
    return analysis, score


if __name__ == "__main__":
    image_path = "test/pool.webp"
    analysis, score = analyze_image(image_path)
    print("FINAL OUTPUT")
    print(analysis)
    print(f"Score: {score}")