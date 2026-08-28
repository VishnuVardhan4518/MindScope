import joblib
import pandas as pd
from pathlib import Path


# ---------------------------------------------------------
# MODEL
# ---------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent.parent.parent
MODEL_PATH = BASE_DIR / "model" / "Mental_Health_Model.pkl"

model = joblib.load(MODEL_PATH)


# ---------------------------------------------------------
# COUNTRY GROUPING
# ---------------------------------------------------------

TOP_COUNTRIES = [
    "Other",
    "India",
    "USA",
    "Canada",
    "Australia",
    "UK",
    "Germany",
    "Mexico",
    "Turkey",
    "France",
]


def get_country_group(country: str) -> str:
    """
    Convert a country into the same country grouping
    used during model training.
    """

    if country in TOP_COUNTRIES:
        return country

    return "Other"


# ---------------------------------------------------------
# PREDICTION
# ---------------------------------------------------------

def predict_mental_health(data) -> float:
    """
    Prepare student data in the exact feature structure
    expected by the trained ML pipeline and return the
    predicted mental health score.
    """

    country_group = get_country_group(data.country)

    input_row = pd.DataFrame([
        {
            "Age": data.age,
            "Gender": data.gender,
            "Country": data.country,
            "Academic_Level": data.academic_level,
            "Most_Used_Platform": data.most_used_platform,
            "Purpose_Of_Use": data.purpose_of_use,
            "Avg_Daily_Usage_Hours": data.avg_daily_usage_hours,
            "Daily_Unlocks": data.daily_unlocks,
            "Study_Hours": data.study_hours,
            "Physical_Activity_Hours": data.physical_activity_hours,
            "Sleep_Hours_Per_Night": data.sleep_hours_per_night,
            "Stress_Level": data.stress_level,
            "group_countries": country_group,
        }
    ])

    prediction = model.predict(input_row)[0]

    return round(float(prediction), 2)
