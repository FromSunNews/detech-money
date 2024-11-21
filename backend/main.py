from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import cv2
import torch
from torchvision import models
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

# Định nghĩa các biến global
class_names = ["010000", "020000", "050000", "100000", "200000", "500000"]
device = "cuda:0" if torch.cuda.is_available() else "cpu"

def get_model():
    # Khởi tạo mô hình VGG16 với Batch Normalization
    model = models.vgg16_bn()
    model.classifier[6] = torch.nn.Linear(4096, len(class_names))
    return model

# Load model và weights
try:
    model = get_model()
    weights_path = './best_model.pth'  # Đường dẫn đến file weights của bạn
    
    if not os.path.exists(weights_path):
        raise FileNotFoundError(f"Không tìm thấy file weights tại: {weights_path}")
    
    checkpoint = torch.load(weights_path, map_location=device)
    model.load_state_dict(checkpoint['model_state_dict'])
    model = model.to(device)
    model.eval()
    print("Đã load model và weights thành công!")
    
except Exception as e:
    print(f"Lỗi khi load model: {str(e)}")
    raise HTTPException(status_code=500, detail="Không thể load model")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Đọc ảnh từ bytes
        image_data = await file.read()
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Tiền xử lý ảnh
        image = cv2.resize(image, (112, 112))
        image = image[:, :, ::-1]  # Chuyển BGR sang RGB
        image = (image.transpose((2, 0, 1)) - 127.5) * 0.007843137
        
        # Chuyển đổi sang tensor
        image = np.expand_dims(image, axis=0)
        image = torch.from_numpy(image.astype(np.float32))
        image = image.to(device)
        
        # Dự đoán
        with torch.no_grad():
            predictions = model(image)
            predictions = torch.nn.Softmax(dim=1)(predictions)
            predictions = predictions.cpu().detach().numpy()[0]
        
        confidence = float(np.max(predictions))
        
        if confidence > 0.7:
            predicted_class = class_names[np.argmax(predictions)]
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