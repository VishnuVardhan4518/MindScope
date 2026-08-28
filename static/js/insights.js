// ============================================================
// MINDSCOPE — DYNAMIC INSIGHTS
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    loadInsights
);


// ============================================================
// LOAD INSIGHTS
// ============================================================

async function loadInsights() {

    const container =
        document.getElementById(
            "insightsContainer"
        );

    if (!container) {
        return;
    }


    showLoading(container);


    try {

        const response =
            await fetch(
                "/api/insights",
                {
                    method: "GET",
                    credentials: "same-origin"
                }
            );


        if (response.status === 401) {

            window.location.href =
                "/login";

            return;
        }


        if (response.status === 404) {

            showNoAssessment(container);

            return;
        }


        if (!response.ok) {

            throw new Error(
                "Unable to load insights."
            );
        }


        const data =
            await response.json();


        renderInsights(
            container,
            data
        );

    }

    catch (error) {

        console.error(
            "Insights error:",
            error
        );

        showError(container);

    }

}


// ============================================================
// RENDER INSIGHTS
// ============================================================

function renderInsights(
    container,
    data
) {

    const insights =
        data.insights || [];


    if (!insights.length) {

        showNoInsights(
            container
        );

        return;
    }


    container.innerHTML = `

        <div class="insights-header">

            <div>

                <span class="section-eyebrow">
                    PERSONALIZED
                </span>

                <h2>
                    Your current insights
                </h2>

                <p>
                    Based on your latest assessment.
                </p>

            </div>


            <div class="insights-score">

                <span>
                    Wellness score
                </span>

                <strong>
                    ${Number(
                        data.score
                    ).toFixed(2)}
                </strong>

            </div>

        </div>


        <div class="insights-grid">

            ${insights
                .map(
                    insight =>
                        createInsightCard(
                            insight
                        )
                )
                .join("")}

        </div>

    `;
}


// ============================================================
// CREATE INSIGHT CARD
// ============================================================

function createInsightCard(
    insight
) {

    const type =
        insight.type || "neutral";


    const icon =
        getInsightIcon(
            type
        );


    return `

        <article
            class="insight-card ${type}"
        >

            <div class="insight-icon">
                ${icon}
            </div>


            <div class="insight-content">

                <span class="insight-type">
                    ${formatInsightType(type)}
                </span>

                <h3>
                    ${escapeHTML(
                        insight.title
                    )}
                </h3>

                <p>
                    ${escapeHTML(
                        insight.description
                    )}
                </p>

            </div>

        </article>

    `;
}


// ============================================================
// ICON
// ============================================================

function getInsightIcon(type) {

    if (type === "positive") {
        return "✓";
    }

    if (type === "attention") {
        return "!";
    }

    return "→";
}


// ============================================================
// TYPE LABEL
// ============================================================

function formatInsightType(type) {

    if (type === "positive") {
        return "Positive";
    }

    if (type === "attention") {
        return "Needs attention";
    }

    return "Observation";
}


// ============================================================
// LOADING
// ============================================================

function showLoading(container) {

    container.innerHTML = `

        <div class="insights-loading">

            <div class="loading-spinner"></div>

            <p>
                Analyzing your latest assessment...
            </p>

        </div>

    `;
}


// ============================================================
// NO ASSESSMENT
// ============================================================

function showNoAssessment(container) {

    container.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                ◌
            </div>

            <h3>
                No assessment yet
            </h3>

            <p>
                Complete an assessment to receive
                personalized insights.
            </p>

            <a
                href="/assessment"
                class="primary-button"
            >
                Start assessment →
            </a>

        </div>

    `;
}


// ============================================================
// NO INSIGHTS
// ============================================================

function showNoInsights(container) {

    container.innerHTML = `

        <div class="empty-state">

            <h3>
                No insights available
            </h3>

            <p>
                Complete another assessment
                to generate new insights.
            </p>

        </div>

    `;
}


// ============================================================
// ERROR
// ============================================================

function showError(container) {

    container.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                !
            </div>

            <h3>
                Couldn't load insights
            </h3>

            <p>
                Please try again.
            </p>

            <button
                class="primary-button"
                onclick="loadInsights()"
            >
                Try again →
            </button>

        </div>

    `;
}


// ============================================================
// HTML SAFETY
// ============================================================

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}