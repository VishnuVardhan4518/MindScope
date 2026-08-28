// ============================================================
// MINDSCOPE DASHBOARD
// Database-driven dashboard
// ============================================================


document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadLatestAssessment();

    }
);


// ============================================================
// LOAD LATEST ASSESSMENT
// ============================================================

async function loadLatestAssessment() {

    try {

        const response =
            await fetch(
                "/api/latest-assessment",
                {
                    method: "GET",
                    credentials: "same-origin"
                }
            );


        // ----------------------------------------------------
        // USER NOT LOGGED IN
        // ----------------------------------------------------

        if (response.status === 401) {

            window.location.href =
                "/login";

            return;
        }


        // ----------------------------------------------------
        // USER HAS NO ASSESSMENT
        // ----------------------------------------------------

        if (response.status === 404) {

            showNoAssessment();

            return;
        }


        // ----------------------------------------------------
        // OTHER SERVER ERROR
        // ----------------------------------------------------

        if (!response.ok) {

            throw new Error(
                "Unable to load latest assessment."
            );
        }


        // ----------------------------------------------------
        // GET JSON
        // ----------------------------------------------------

        const result =
            await response.json();


        console.log(
            "Latest assessment:",
            result
        );


        // ----------------------------------------------------
        // DISPLAY DASHBOARD
        // ----------------------------------------------------

        displayDashboard(
            result
        );

    }

    catch (error) {

        console.error(
            "Dashboard error:",
            error
        );

        showDashboardError();

    }

}


// ============================================================
// DISPLAY DASHBOARD
// ============================================================

function displayDashboard(result) {

    const score =
        Number(
            result.prediction_score
        );


    const data =
        result.assessment_data || {};


    // ========================================================
    // SCORE
    // ========================================================

    displayValue(
        "score-value",
        score.toFixed(2)
    );


    updateScoreStatus(
        score
    );


    updateScoreRing(
        score
    );


    updateAssessmentDate(
        result.created_at
    );


    // ========================================================
    // PROFILE
    // ========================================================

    displayValue(
        "age",
        data.age
    );


    displayValue(
        "gender",
        data.gender
    );


    displayValue(
        "country",
        data.country
    );


    // ========================================================
    // ACADEMIC & DIGITAL
    // ========================================================

    displayValue(
        "academic-level",
        data.academic_level
    );


    displayValue(
        "platform",
        data.most_used_platform
    );


    displayValue(
        "purpose",
        data.purpose_of_use
    );


    displayValue(
        "screen-time",
        formatNumber(
            data.avg_daily_usage_hours
        )
    );


    displayValue(
        "daily-unlocks",
        data.daily_unlocks
    );


    // ========================================================
    // LIFESTYLE
    // ========================================================

    displayValue(
        "sleep-hours",
        formatNumber(
            data.sleep_hours_per_night
        )
    );


    displayValue(
        "study-hours",
        formatNumber(
            data.study_hours
        )
    );


    displayValue(
        "physical-activity",
        formatNumber(
            data.physical_activity_hours
        )
    );


    displayValue(
        "stress-level",
        data.stress_level
    );

}


// ============================================================
// DISPLAY VALUE
// ============================================================

function displayValue(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (!element) {

        return;

    }


    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        element.textContent =
            "\u2014";

        return;

    }


    element.textContent =
        value;

}


// ============================================================
// FORMAT NUMBER
// ============================================================

function formatNumber(value) {

    if (
        value === undefined ||
        value === null ||
        value === ""
    ) {

        return "\u2014";

    }


    const number =
        Number(value);


    if (Number.isNaN(number)) {

        return value;

    }


    return number
        .toFixed(1);

}


// ============================================================
// SCORE STATUS
// ============================================================

function updateScoreStatus(score) {

    let status;
    let message;


    if (score < 4) {

        status =
            "Needs attention";

        message =
            "Some areas of your current routine may benefit from attention.";

    }

    else if (score < 7) {

        status =
            "Fairly balanced";

        message =
            "Your current wellness pattern is fairly balanced, with some areas that could still improve.";

    }

    else {

        status =
            "Doing well";

        message =
            "Your current wellness pattern looks positive. Keep building on the routines that work for you.";

    }


    displayValue(
        "score-status",
        status
    );


    displayValue(
        "score-message",
        message
    );

}


// ============================================================
// SCORE RING
// ============================================================

function updateScoreRing(score) {

    const ring =
        document.querySelector(
            ".score-ring"
        );


    if (!ring) {

        return;

    }


    const percentage =
        Math.max(
            0,
            Math.min(
                score * 10,
                100
            )
        );


    ring.style.setProperty(
        "--score-percent",
        `${percentage}%`
    );


    ring.setAttribute(
        "aria-label",
        `Wellness score ${score.toFixed(2)} out of 10`
    );

}


// ============================================================
// ASSESSMENT DATE
// ============================================================

function updateAssessmentDate(
    createdAt
) {

    if (!createdAt) {

        return;

    }


    const elements =
        document.querySelectorAll(
            ".assessment-date-display"
        );


    if (!elements.length) {

        return;

    }


    const date =
        new Date(
            createdAt
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return;

    }


    const formattedDate =
        date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );


    elements.forEach(
        (element) => {

            element.textContent =
                formattedDate;

        }
    );

}


// ============================================================
// NO ASSESSMENT
// ============================================================

function showNoAssessment() {

    const container =
        document.querySelector(
            ".dashboard-content"
        );


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                O
            </div>

            <h3>
                Your dashboard is ready
            </h3>

            <p>
                Complete your first assessment
                to see your wellness insights.
            </p>

            <a
                href="/assessment"
                class="primary-button"
            >
                Start assessment >
            </a>

        </div>

    `;

}


// ============================================================
// DASHBOARD ERROR
// ============================================================

function showDashboardError() {

    const container =
        document.querySelector(
            ".dashboard-content"
        );


    if (!container) {

        return;

    }


    container.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                !
            </div>

            <h3>
                Couldn't load your dashboard
            </h3>

            <p>
                We couldn't retrieve your
                latest assessment.
                Please try again.
            </p>

            <button
                type="button"
                class="primary-button"
                onclick="loadLatestAssessment()"
            >
                Try again >
            </button>

        </div>

    `;

}
