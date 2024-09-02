import cv2 as cv
import time
import numpy as np

# Load class names
try:
    with open('Resources/object_detection_classes_coco.txt', 'r') as f:
        class_names = f.read().split('\n')
except Exception as e:
    print(f"Error loading class names: {e}")
    exit()

colors = np.random.uniform(0, 255, size=(len(class_names), 3))

# Load the model
try:
    model = cv.dnn.readNet(model='Resources/frozen_inference_graph.pb', config='Resources/ssd_mobilenet_v2_coco_2018_03_29.pbtxt.txt', framework='TensorFlow')
except Exception as e:
    print(f"Error loading model: {e}")
    exit()

# Open video capture
vid = cv.VideoCapture('new_video_2.mp4')
if not vid.isOpened():
    print("Error opening video file.")
    exit()

frame_w = int(vid.get(3))
frame_h = int(vid.get(4))
output_writer = cv.VideoWriter('new_video_2_result.mp4', cv.VideoWriter_fourcc(*'H264'), 30, (frame_w, frame_h))

while vid.isOpened():
    ret, frame = vid.read()
    if not ret:
        break

    image = frame
    image_h, image_w, _ = image.shape
    
    blob = cv.dnn.blobFromImage(image=image, size=(300, 300), mean=(104, 117, 123), swapRB=True)

    start = time.time()
    model.setInput(blob)
    detections = model.forward()
    end = time.time()

    fps = 1 / (end - start)

    for detection in detections[0, 0, :, :]:
        confidence = detection[2]

        if confidence > 0.4:
            class_id = int(detection[1])
            class_name = class_names[class_id - 1]
            color = colors[class_id]

            box_x = detection[3] * image_w
            box_y = detection[4] * image_h
            box_w = detection[5] * image_w
            box_h = detection[6] * image_h

            box_x, box_y = max(0, int(box_x)), max(0, int(box_y))
            box_w, box_h = min(image_w, int(box_w)), min(image_h, int(box_h))

            cv.rectangle(image, (box_x, box_y), (box_w, box_h), color, thickness=2)
            cv.putText(image, class_name, (box_x, box_y - 5), cv.FONT_HERSHEY_SIMPLEX, 1, color, 2)

    cv.putText(image, f"{fps:.2f} FPS", (20, 30), cv.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv.imshow('image', image)
    output_writer.write(image)

    if cv.waitKey(1) & 0xFF == ord('q'):
        break

vid.release()
output_writer.release()
cv.destroyAllWindows()
