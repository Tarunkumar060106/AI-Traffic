import cv2
import numpy as np

# Load the custom image
image_path = 'car.png'  # Replace with your image path
image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)  # Load as grayscale

# Define a threshold below which pixels will be considered black/gray
threshold_value = 50  # You can adjust this value according to your needs

# Convert pixels below the threshold to white (255)
_, result_image = cv2.threshold(image, threshold_value, 255, cv2.THRESH_BINARY_INV)

# Display the original and the processed images
cv2.imshow('Original Image', image)
cv2.imshow('Converted Image', result_image)

cv2.imwrite('White_Image.png', result_image)

# Wait for a key press and close all windows
cv2.waitKey(0)
cv2.destroyAllWindows()
