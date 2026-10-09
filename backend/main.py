from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.health import router as health_router
from api.predict import router as predict_router

app = FastAPI(
    title="ClimateTwin AI",
    description="AI Powered Digital Twin for Chhattisgarh Climate",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(predict_router)


@app.get("/")
def home():
    return {
        "project": "ClimateTwin AI",
        "status": "Running",
        "pilot_region": "Chhattisgarh"
    }