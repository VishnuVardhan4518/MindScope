document.addEventListener("DOMContentLoaded", () => {

    const topicSection =
        document.getElementById("topicSection");

    const topicLabel =
        document.getElementById("topicLabel");

    const topicTitle =
        document.getElementById("topicTitle");

    const topicIntro =
        document.getElementById("topicIntro");

    const topicPoints =
        document.getElementById("topicPoints");

    const closeTopic =
        document.getElementById("closeTopic");


    /* =====================================================
       RESOURCE CONTENT
       ===================================================== */

    const topics = {

        sleep: {

            label: "SLEEP",

            title:
                "Build a better sleep routine",

            intro:
                "A consistent sleep routine can make it easier to create a predictable rhythm around studying, recovery, and everyday activities.",

            points: [

                {
                    title: "Keep a consistent schedule",

                    text:
                        "Try to keep your sleep and wake times reasonably consistent across the week."
                },

                {
                    title: "Create a wind-down period",

                    text:
                        "Give yourself some quieter time before bed rather than moving directly from demanding tasks into sleep."
                },

                {
                    title: "Make your room sleep-friendly",

                    text:
                        "A comfortable, quiet, and appropriately dark environment can make your bedtime routine easier to maintain."
                }

            ]

        },


        stress: {

            label: "STRESS",

            title:
                "Manage everyday pressure",

            intro:
                "Stress can become easier to manage when you recognize pressure early and create regular opportunities for recovery.",

            points: [

                {
                    title: "Break large tasks down",

                    text:
                        "Turn a large academic or personal task into smaller actions that can be completed one at a time."
                },

                {
                    title: "Create recovery time",

                    text:
                        "Protect short periods during the day for rest, movement, hobbies, or conversations."
                },

                {
                    title: "Talk to someone",

                    text:
                        "Sharing what you are dealing with can be useful when pressure begins to feel difficult to manage alone."
                }

            ]

        },


        study: {

            label: "ACADEMICS",

            title:
                "Create a balanced study routine",

            intro:
                "Effective studying is not only about the number of hours spent at a desk. A sustainable routine also includes breaks and time away from academic work.",

            points: [

                {
                    title: "Use focused blocks",

                    text:
                        "Work on one task for a defined period before taking a meaningful short break."
                },

                {
                    title: "Set realistic goals",

                    text:
                        "Choose a small number of priorities for each study session instead of trying to complete everything at once."
                },

                {
                    title: "Protect personal time",

                    text:
                        "Leave space in your day for sleep, movement, relationships, hobbies, and recovery."
                }

            ]

        },


        digital: {

            label: "DIGITAL WELLBEING",

            title:
                "Make technology more intentional",

            intro:
                "Digital platforms can be useful for communication, education, entertainment, and networking. The goal is to use them intentionally rather than automatically.",

            points: [

                {
                    title: "Create phone-free blocks",

                    text:
                        "Try putting your phone away during focused study, meals, or other activities that deserve your full attention."
                },

                {
                    title: "Review notifications",

                    text:
                        "Reduce unnecessary notifications that repeatedly interrupt your attention throughout the day."
                },

                {
                    title: "Notice why you check",

                    text:
                        "Before opening an app, pause and ask whether you have a specific reason for checking it."
                }

            ]

        },


        activity: {

            label: "MOVEMENT",

            title:
                "Add more movement to your day",

            intro:
                "Physical activity does not have to mean an intense workout. Small amounts of enjoyable movement can fit into many student schedules.",

            points: [

                {
                    title: "Start small",

                    text:
                        "A short walk or stretching session can be a realistic starting point when your schedule is busy."
                },

                {
                    title: "Choose something enjoyable",

                    text:
                        "Walking, cycling, sports, dancing, or another activity you enjoy may be easier to maintain consistently."
                },

                {
                    title: "Use natural breaks",

                    text:
                        "Consider adding movement between study sessions instead of remaining seated for long uninterrupted periods."
                }

            ]

        },


        support: {

            label: "SUPPORT",

            title:
                "Know when to reach out",

            intro:
                "Wellness resources can be useful for everyday challenges, but they are not a replacement for professional care when someone is experiencing significant distress.",

            points: [

                {
                    title: "Talk to someone you trust",

                    text:
                        "A trusted friend, family member, teacher, mentor, or student-support professional can be a useful starting point."
                },

                {
                    title: "Consider professional support",

                    text:
                        "If difficulties are persistent or significantly affecting daily life, consider contacting a qualified mental health professional."
                },

                {
                    title: "Seek urgent help when necessary",

                    text:
                        "If you are in immediate danger or experiencing a mental health emergency, contact your local emergency service or an appropriate crisis service."
                }

            ]

        }

    };


    /* =====================================================
       OPEN TOPIC
       ===================================================== */

    function openTopic(topicName) {

        const topic =
            topics[topicName];


        if (!topic) {
            return;
        }


        topicLabel.textContent =
            topic.label;


        topicTitle.textContent =
            topic.title;


        topicIntro.textContent =
            topic.intro;


        topicPoints.innerHTML = "";


        topic.points.forEach((point, index) => {

            const card =
                document.createElement("article");


            card.className =
                "topic-point";


            card.innerHTML = `

                <span class="topic-point-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <h3>
                    ${point.title}
                </h3>

                <p>
                    ${point.text}
                </p>

            `;


            topicPoints.appendChild(card);

        });


        topicSection.classList.add("visible");


        topicSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /* =====================================================
       TOPIC BUTTONS
       ===================================================== */

    document
        .querySelectorAll(".resource-link")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    openTopic(
                        button.dataset.topic
                    );

                }
            );

        });


    /* =====================================================
       CLOSE
       ===================================================== */

    closeTopic.addEventListener(
        "click",
        () => {

            topicSection.classList.remove(
                "visible"
            );

        }
    );


    /* =====================================================
       PERSONALIZED TOPIC
       ===================================================== */

    const suggestedTopic =
        document.getElementById(
            "suggestedTopic"
        );

    const suggestedReason =
        document.getElementById(
            "suggestedReason"
        );

    const openSuggested =
        document.getElementById(
            "openSuggested"
        );


    let suggestedCategory =
        "sleep";


    try {

        const stored =
            sessionStorage.getItem(
                "mentalHealthResult"
            );


        if (stored) {

            const result =
                JSON.parse(stored);


            const data =
                result.inputs;


            const sleep =
                Number(
                    data.sleep_hours_per_night
                );


            const screen =
                Number(
                    data.avg_daily_usage_hours
                );


            const activity =
                Number(
                    data.physical_activity_hours
                );


            const stress =
                data.stress_level;


            if (
                stress === "High" ||
                stress === "Very High"
            ) {

                suggestedCategory =
                    "stress";

                suggestedReason.textContent =
                    "Your assessment reported a higher current stress level, so stress-management resources may be a useful place to start.";

            } else if (sleep < 6) {

                suggestedCategory =
                    "sleep";

                suggestedReason.textContent =
                    "You reported less than 6 hours of sleep per night, making sleep-related resources a useful area to explore.";

            } else if (screen >= 7) {

                suggestedCategory =
                    "digital";

                suggestedReason.textContent =
                    "You reported relatively high daily social-media use, so digital wellbeing resources may be useful to explore.";

            } else if (activity < 0.5) {

                suggestedCategory =
                    "activity";

                suggestedReason.textContent =
                    "You reported less than 30 minutes of physical activity per day, so movement resources may be a useful starting point.";

            } else {

                suggestedCategory =
                    "study";

                suggestedReason.textContent =
                    "Your routine contains several student-life factors, so academic balance resources may be a useful area to explore.";

            }

        } else {

            suggestedReason.textContent =
                "Complete an assessment to receive a personalized starting point.";

        }

    } catch (error) {

        console.error(
            "Unable to read assessment data:",
            error
        );

    }


    suggestedTopic.textContent =
        topics[suggestedCategory].title;


    openSuggested.addEventListener(
        "click",
        () => {

            openTopic(
                suggestedCategory
            );

        }
    );

});