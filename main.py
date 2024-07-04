import os
from fastapi import FastAPI, File, UploadFile,HTTPException
from typing import List
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
import uvicorn
import shutil
import logging
import tempfile

# Use a temporary directory or specify a writable directory
UPLOAD_DIRECTORY = os.path.join(os.path.dirname(__file__), "uploads")
# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace with your React app's URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    try:
        # Ensure the upload directory exists
        os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)
        
        saved_files = []
        
        for file in files:
            try:
                # Create the full file path
                file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
                
                # Save the file using shutil
                with file.file as source_file, open(file_path, "wb") as target_file:
                    shutil.copyfileobj(source_file, target_file)
                
                saved_files.append(file_path)  # Save the full path
                logger.info(f"Successfully saved file: {file_path}")
            except Exception as e:
                logger.error(f"Error saving file {file.filename}: {str(e)}")
                raise HTTPException(status_code=500, detail=f"Error saving file {file.filename}: {str(e)}")
        
        return JSONResponse(
            content={
                "message": "Files uploaded successfully",
                "saved_files": saved_files
            }
        )
    except Exception as e:
        logger.error(f"Unexpected error in upload_files: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}") 
if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)