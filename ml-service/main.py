# from fastapi import FastAPI
# from pydantic import BaseModel
# app=FastAPI()
# class Req(BaseModel):
#     disease:str
# @app.post('/predict')
# def predict(req:Req):
#     sample={
#       'diabetes':[{'drug':'Metformin','score':95},{'drug':'Pioglitazone','score':81}],
#       'alzheimers':[{'drug':'Metformin','score':87},{'drug':'Aspirin','score':79}]
#     }
#     return {'results': sample.get(req.disease.lower(), [{'drug':'No match','score':0}])}


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# =========================
# CORS
# =========================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =========================
# Request Model
# =========================
class DiseaseRequest(BaseModel):
    disease: str

# =========================
# Home Route
# =========================
@app.get("/")
def home():
    return {
        "message": "AI PharmaX ML Service Running"
    }

# =========================
# Prediction API
# =========================
@app.post("/predict")
def predict(data: DiseaseRequest):

    disease = data.disease.lower()

    sample_data = {

        "diabetes": [
            {
                "drug": "Metformin",
                "score": 95
            },
            {
                "drug": "Pioglitazone",
                "score": 84
            },
            {
                "drug": "Acarbose",
                "score": 76
            }
        ],

        "alzheimers": [
            {
                "drug": "Metformin",
                "score": 87
            },
            {
                "drug": "Aspirin",
                "score": 79
            },
            {
                "drug": "Donepezil",
                "score": 91
            }
        ],

        "cancer": [
            {
                "drug": "Doxorubicin",
                "score": 93
            },
            {
                "drug": "Tamoxifen",
                "score": 89
            },
            {
                "drug": "Methotrexate",
                "score": 82
            }
        ],

        "covid": [
            {
                "drug": "Remdesivir",
                "score": 90
            },
            {
                "drug": "Favipiravir",
                "score": 81
            },
            {
                "drug": "Ivermectin",
                "score": 60
            }
        ]
    }

    result = sample_data.get(
        disease,
        [
            {
                "drug": "No Match Found",
                "score": 0
            }
        ]
    )

    return {
        "disease": disease,
        "results": result
    }