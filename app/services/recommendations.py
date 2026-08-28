def generate_recommendations(
    data: dict,
    score: float
):

    recommendations = []


    # ---------------------------------------------------------
    # SCREEN TIME
    # ---------------------------------------------------------

    screen_time = float(
        data.get(
            "avg_daily_usage_hours",
            0
        )
    )

    if screen_time >= 7:

        recommendations.append({
            "category": "Digital habits",
            "title": "Create screen-free periods",
            "description":
                "Try setting aside one or two short screen-free periods during the day.",
            "priority": "High"
        })

    elif screen_time >= 5:

        recommendations.append({
            "category": "Digital habits",
            "title": "Take regular screen breaks",
            "description":
                "Use short breaks between extended periods of screen use.",
            "priority": "Medium"
        })


    # ---------------------------------------------------------
    # SLEEP
    # ---------------------------------------------------------

    sleep = float(
        data.get(
            "sleep_hours_per_night",
            0
        )
    )

    if sleep < 6:

        recommendations.append({
            "category": "Sleep",
            "title": "Prioritize a consistent sleep routine",
            "description":
                "Try maintaining a regular bedtime and creating a calmer routine before sleep.",
            "priority": "High"
        })

    elif sleep < 7:

        recommendations.append({
            "category": "Sleep",
            "title": "Give yourself more sleep time",
            "description":
                "Consider gradually increasing your nightly sleep and keeping your schedule consistent.",
            "priority": "Medium"
        })

    else:

        recommendations.append({
            "category": "Sleep",
            "title": "Maintain your sleep routine",
            "description":
                "Your reported sleep pattern is a positive part of your current routine.",
            "priority": "Low"
        })


    # ---------------------------------------------------------
    # PHYSICAL ACTIVITY
    # ---------------------------------------------------------

    activity = float(
        data.get(
            "physical_activity_hours",
            0
        )
    )

    if activity < 0.5:

        recommendations.append({
            "category": "Movement",
            "title": "Add short movement breaks",
            "description":
                "Consider adding brief walks, stretching, or other comfortable movement throughout your day.",
            "priority": "High"
        })

    elif activity < 1:

        recommendations.append({
            "category": "Movement",
            "title": "Increase daily movement",
            "description":
                "Adding a little more physical activity to your routine could be beneficial.",
            "priority": "Medium"
        })


    # ---------------------------------------------------------
    # STUDY
    # ---------------------------------------------------------

    study = float(
        data.get(
            "study_hours",
            0
        )
    )

    if study > 6:

        recommendations.append({
            "category": "Academics",
            "title": "Protect your recovery time",
            "description":
                "Balance longer study sessions with breaks, rest, and activities away from academic work.",
            "priority": "Medium"
        })

    elif study < 2:

        recommendations.append({
            "category": "Academics",
            "title": "Build a consistent study routine",
            "description":
                "Short, focused study sessions may help create a more consistent academic rhythm.",
            "priority": "Low"
        })


    # ---------------------------------------------------------
    # PHONE UNLOCKS
    # ---------------------------------------------------------

    unlocks = int(
        data.get(
            "daily_unlocks",
            0
        )
    )

    if unlocks >= 120:

        recommendations.append({
            "category": "Focus",
            "title": "Reduce unnecessary phone checks",
            "description":
                "Try keeping your phone away during focused study or rest periods.",
            "priority": "High"
        })

    elif unlocks >= 70:

        recommendations.append({
            "category": "Focus",
            "title": "Be mindful of phone checking",
            "description":
                "Notice when you unlock your phone automatically and reduce unnecessary checks.",
            "priority": "Medium"
        })


    # ---------------------------------------------------------
    # STRESS
    # ---------------------------------------------------------

    stress = str(
        data.get(
            "stress_level",
            ""
        )
    ).lower()


    if stress == "high":

        recommendations.append({
            "category": "Stress",
            "title": "Create regular recovery time",
            "description":
                "Schedule small periods for rest, relaxation, movement, or activities you enjoy.",
            "priority": "High"
        })

    elif stress == "medium":

        recommendations.append({
            "category": "Stress",
            "title": "Keep stress manageable",
            "description":
                "Regular breaks and a consistent daily routine may help you manage moderate stress.",
            "priority": "Medium"
        })


    # ---------------------------------------------------------
    # OVERALL SCORE
    # ---------------------------------------------------------

    if score < 4:

        recommendations.append({
            "category": "Overall wellness",
            "title": "Focus on one change at a time",
            "description":
                "Choose one area of your routine to improve first rather than trying to change everything at once.",
            "priority": "High"
        })

    elif score < 7:

        recommendations.append({
            "category": "Overall wellness",
            "title": "Build on your current routine",
            "description":
                "Small, consistent improvements across sleep, movement, screen habits, and study balance can support your wellbeing.",
            "priority": "Medium"
        })

    else:

        recommendations.append({
            "category": "Overall wellness",
            "title": "Maintain what's working",
            "description":
                "Continue the routines that are supporting your current positive wellness pattern.",
            "priority": "Low"
        })


    return recommendations