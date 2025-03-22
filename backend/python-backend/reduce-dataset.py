import os

def delete_alternate_pics(folder_path):
    images = sorted([f for f in os.listdir(folder_path) if f.lower().endswith(('png', 'jpg', 'txt'))])
    
    for i in range(len(images)):
        if (i % 3) in (1, 2):  # Delete every 2nd and 3rd image in groups of 3
            file_path = os.path.join(folder_path, images[i])
            print(f"Deleting: {file_path}")
            os.remove(file_path)
            print(f"Deleted: {file_path}")

folder_path = "your_folder_path_here"  # Change this to your folder path
delete_alternate_pics("datasets/damaged-poles/valid/labels")

print("Alternate images deleted successfully.")
