from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import numpy as np
import cv2
import tensorflow as tf
from tensorflow.keras.applications import VGG16
from tensorflow.keras.layers import Input, Dense, Dropout, GlobalAveragePooling2D
from tensorflow.keras.models import Model
import os

app = FastAPI()

# Thêm CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Định nghĩa class names
class_names = ["010000", "020000", "050000", "100000", "200000", "500000"]

def get_model():
    base_model = VGG16(weights='imagenet', include_top=False, input_shape=(128, 128, 3))

    # Đóng băng các lớp của VGG16
    for layer in base_model.layers:
        layer.trainable = False

    # Thêm các lớp Fully Connected
    x = base_model.output
    x = GlobalAveragePooling2D()(x)
    x = Dense(512, activation='relu', name='fc1')(x)
    x = Dropout(0.5)(x)
    x = Dense(512, activation='relu', name='fc2')(x)
    x = Dropout(0.5)(x)
    x = Dense(len(class_names), activation='softmax', name='predictions')(x)

    # Tạo mô hình hoàn chỉnh
    model = Model(inputs=base_model.input, outputs=x)
    model.compile(loss='categorical_crossentropy', optimizer='adam', metrics=['accuracy'])

    return model

# Load model và weights
try:
    model = get_model()
    weights_path = './model.keras'  # Đường dẫn đến file weights của bạn
    if not os.path.exists(weights_path):
        raise FileNotFoundError(f"Không tìm thấy file weights tại: {weights_path}")
    
    model.load_weights(weights_path)
    print("Đã load model và weights thành công!")
    model.summary()
except Exception as e:
    print(f"Lỗi khi load model: {str(e)}")
    raise HTTPException(status_code=500, detail="Không thể load model")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Đọc ảnh từ bytes
        image_data = await file.read()
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)  # Đọc bằng OpenCV
        
        # Tiền xử lý giống như lúc training
        image = cv2.resize(image, (128, 128))
        image = image.astype('float32') / 255.0
        image = np.expand_dims(image, axis=0)
        
        # Dự đoán
        predictions = model.predict(image, verbose=0)
        confidence = float(np.max(predictions[0]))
        
        if confidence > 0.7:
            predicted_class = class_names[np.argmax(predictions[0])]
            formatted_value = f"{int(predicted_class):,}"
            return {
                "denomination": formatted_value,
                "confidence": f"{confidence:.2f}"
            }
        else:
            return {
                "denomination": "Unknown",
                "confidence": f"{confidence:.2f}"
            }
            
    except Exception as e:
        print(f"Error details: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {"message": "API nhận diện mệnh giá tiền Việt Nam"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)