import os
import shutil

# Define dataset paths
base_dir = os.path.join(os.getcwd(), "datasets")  # Ensure it looks inside 'datasets/'

datasets = {
    "damaged-poles": {"path": os.path.join(base_dir, "damaged-poles"), "class": "Broken Pole", "id": 0},
    "fallen-trees": {"path": os.path.join(base_dir, "fallen-trees"), "class": "Fallen Tree", "id": 1},
    "garbage": {"path": os.path.join(base_dir, "garbage"), "class": "Garbage", "id": 2, "keep_only": "garbage"},
    "inclined-poles": {"path": os.path.join(base_dir, "inclined-poles"), "class": "Inclined Pole", "id": 3},
    "potholes": {"path": os.path.join(base_dir, "potholes"), "class": "Pothole", "id": 4},
}

merged_images = os.path.join(os.getcwd(), "merged_dataset/images")
merged_labels = os.path.join(os.getcwd(), "merged_dataset/labels")
os.makedirs(merged_images, exist_ok=True)
os.makedirs(merged_labels, exist_ok=True)

def get_files(folder, ext):
    return [f for f in os.listdir(folder) if f.endswith(ext)]

for dataset, info in datasets.items():
    image_folder = os.path.join(info["path"], "train", "images")
    label_folder = os.path.join(info["path"], "train", "labels")

    if not os.path.exists(image_folder) or not os.path.exists(label_folder):
        print(f"Skipping {dataset}, folders missing.")
        continue

    for img_file in get_files(image_folder, ".jpg") + get_files(image_folder, ".png"):
        img_path = os.path.join(image_folder, img_file)
        new_img_path = os.path.join(merged_images, img_file)
        shutil.copy(img_path, new_img_path)

        label_file = img_file.replace(".jpg", ".txt").replace(".png", ".txt")
        label_path = os.path.join(label_folder, label_file)

        if os.path.exists(label_path):
            with open(label_path, "r") as f:
                lines = f.readlines()

            new_lines = []
            for line in lines:
                parts = line.strip().split()
                if len(parts) < 5:
                    continue

                class_id = int(parts[0])

                # Handle garbage dataset filtering
                if dataset == "garbage":
                    classes = ["0", "c", "garbage", "garbage_bag", "sampah-detection", "trash"]
                    if class_id >= len(classes) or classes[class_id] != info["keep_only"]:
                        continue  # Skip unwanted classes
                    new_class_id = info["id"]
                else:
                    new_class_id = info["id"]

                new_lines.append(f"{new_class_id} {' '.join(parts[1:])}\n")

            if new_lines:
                new_label_path = os.path.join(merged_labels, label_file)
                with open(new_label_path, "w") as f:
                    f.writelines(new_lines)

print("Dataset merging complete.")
