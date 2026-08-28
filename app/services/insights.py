def generate_insights(data: dict, score: float):

    insights = []

    # ---------------------------------------------------------
    # SCREEN TIME
    # ---------------------------------------------------------

    screen_time = float(
        data.get("avg_daily_usage_hours", 0)
    )

    if screen_time >= 7:

        insights.append({
            "type": "attention",
            "title": "High screen time",
            "description":
                f"Your average screen time is {screen_time:.1f} hours per day. "
                "A small reduction may help create more space for rest and offline activities."
        })

    elif screen_time >= 5:

        insights.append({
            "type": "neutral",
            "title": "Moderate screen time",
            "description":
                f"You're spending around {screen_time:.1f} hours per day on screens. "
                "Keeping regular breaks can help maintain a healthier digital routine."
        })

    else:

        insights.append({
            "type": "positive",
            "title": "Controlled screen time",
            "description":
                f"Your average screen time is {screen_time:.1f} hours per day, "
                "which suggests a relatively controlled digital routine."
        })


    # ---------------------------------------------------------
    # SLEEP
    # ---------------------------------------------------------

    sleep = float(
        data.get("sleep_hours_per_night", 0)
    )

    if sleep < 6:

        insights.append({
            "type": "attention",
            "title": "Sleep may need attention",
            "description":
                f"You're reporting about {sleep:.1f} hours of sleep per night. "
                "Improving sleep consistency could support your overall wellbeing."
        })

    elif sleep < 7:

        insights.append({
            "type": "neutral",
            "title": "Sleep could improve",
            "description":
                f"You're getting around {sleep:.1f} hours of sleep per night. "
                "A slightly more consistent sleep routine may be beneficial."
        })

    else:

        insights.append({
            "type": "positive",
            "title": "Healthy sleep pattern",
            "description":
                f"You're reporting around {sleep:.1f} hours of sleep per night. "
                "Maintaining this routine can support recovery and daily functioning."
        })


    # ---------------------------------------------------------
    # PHYSICAL ACTIVITY
    # ---------------------------------------------------------

    activity = float(
        data.get("physical_activity_hours", 0)
    )

    if activity < 0.5:

        insights.append({
            "type": "attention",
            "title": "Low physical activity",
            "description":
                "Your reported physical activity is quite limited. "
                "Adding short periods of movement during the day may help."
        })

    elif activity < 1:

        insights.append({
            "type": "neutral",
            "title": "Room for more movement",
            "description":
                "You have some physical activity in your routine. "
                "Adding a little more movement could further support your wellbeing."
        })

    else:

        insights.append({
            "type": "positive",
            "title": "Good activity routine",
            "description":
                f"You're reporting around {activity:.1f} hours of physical activity per day."
        })


    # ---------------------------------------------------------
    # STUDY HOURS
    # ---------------------------------------------------------

    study = float(
        data.get("study_hours", 0)
    )

    if study < 2:

        insights.append({
            "type": "neutral",
            "title": "Study routine",
            "description":
                f"Your reported study time is around {study:.1f} hours per day. "
                "A consistent study schedule may help maintain academic balance."
        })

    elif study <= 6:

        insights.append({
            "type": "positive",
            "title": "Steady study routine",
            "description":
                f"You're spending around {study:.1f} hours per day studying, "
                "suggesting a consistent academic routine."
        })

    else:

        insights.append({
            "type": "attention",
            "title": "Heavy study schedule",
            "description":
                f"You're studying around {study:.1f} hours per day. "
                "Remember to include sufficient breaks and recovery time."
        })


    # ---------------------------------------------------------
    # PHONE UNLOCKS
    # ---------------------------------------------------------

    unlocks = int(
        data.get("daily_unlocks", 0)
    )

    if unlocks >= 120:

        insights.append({
            "type": "attention",
            "title": "Frequent phone checking",
            "description":
                f"Your phone is being unlocked around {unlocks} times per day. "
                "Reducing unnecessary checking may improve focus."
        })

    elif unlocks >= 70:

        insights.append({
            "type": "neutral",
            "title": "Regular phone checking",
            "description":
                f"You're unlocking your phone around {unlocks} times per day. "
                "Being mindful of unnecessary checks may help concentration."
        })

    else:

        insights.append({
            "type": "positive",
            "title": "Lower phone checking",
            "description":
                f"Your phone unlock count is around {unlocks} per day."
        })


    # ---------------------------------------------------------
    # STRESS
    # ---------------------------------------------------------

    stress = str(
        data.get("stress_level", "")
    ).lower()


    if stress == "high":

        insights.append({
            "type": "attention",
            "title": "Stress deserves attention",
            "description":
                "You reported a high stress level. "
                "Consider creating regular periods for rest, movement, and activities that help you unwind."
        })

    elif stress == "medium":

        insights.append({
            "type": "neutral",
            "title": "Moderate stress",
            "description":
                "You reported a medium stress level. "
                "Maintaining healthy routines and regular breaks may help keep stress manageable."
        })

    elif stress == "low":

        insights.append({
            "type": "positive",
            "title": "Lower reported stress",
            "description":
                "You reported a low stress level. "
                "Maintaining your current healthy routines can help preserve this balance."
        })


    # ---------------------------------------------------------
    # OVERALL SCORE
    # ---------------------------------------------------------

    if score < 4:

        insights.append({
            "type": "attention",
            "title": "Overall wellness needs attention",
            "description":
                "Your current prediction score suggests that several areas of your routine may benefit from attention."
        })

    elif score < 7:

        insights.append({
            "type": "neutral",
            "title": "Overall pattern is fairly balanced",
            "description":
                "Your current prediction suggests a moderately balanced wellness pattern, with some areas that could still improve."
        })

    else:

        insights.append({
            "type": "positive",
            "title": "Positive overall pattern",
            "description":
                "Your current prediction suggests a positive overall wellness pattern."
        })


    return insights