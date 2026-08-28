// ============================================================
// MINDSCOPE - DYNAMIC RECOMMENDATIONS
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    loadRecommendations
);


// ============================================================
// LOAD RECOMMENDATIONS
// ============================================================

async function loadRecommendations() {

    const container =
        document.getElementById(
            "recommendationsContainer"
        );


    if (!container) {
        return;
    }


    showRecommendationLoading(
        container
    );


    try {

        const response =
            await fetch(
                "/api/recommendations",
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

            showNoAssessment(
                container
            );

            return;
        }


        if (!response.ok) {

            throw new Error(
                "Unable to load recommendations."
            );
        }


        const data =
            await response.json();


        renderRecommendations(
            container,
            data
        );

    }

    catch (error) {

        console.error(
            "Recommendations error:",
            error
        );

        showRecommendationError(
            container
        );

    }

}


// ============================================================
// RENDER
// ============================================================

function renderRecommendations(
    container,
    data
) {

    const recommendations =
        data.recommendations || [];


    if (!recommendations.length) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    No recommendations yet
                </h3>

                <p>
                    Complete an assessment to receive
                    personalized recommendations.
                </p>

            </div>

        `;

        return;
    }


    container.innerHTML = `

        <div class="recommendations-header">

            <div>

                <span class="section-eyebrow">
                    PERSONALIZED
                </span>

                <h2>
                    Small changes, meaningful progress.
                </h2>

                <p>
                    Suggestions based on your latest assessment.
                </p>

            </div>


            <div class="recommendation-score">

                <span>
                    Current score
                </span>

                <strong>
                    ${Number(
                        data.score
                    ).toFixed(2)}
                </strong>

            </div>

        </div>


        <div class="recommendations-list">

            ${recommendations
                .map(
                    recommendation =>
                        createRecommendationCard(
                            recommendation
                        )
                )
                .join("")}

        </div>

    `;
}


// ============================================================
// CREATE CARD
// ============================================================

function createRecommendationCard(
    recommendation
) {

    const priority =
        String(
            recommendation.priority || "Low"
        ).toLowerCase();


    return `

        <article
            class="
                recommendation-card
                priority-${escapeHTML(priority)}
            "
        >

            <div class="recommendation-number">
                &check;
            </div>


            <div class="recommendation-content">

                <div class="recommendation-meta">

                    <span>
                        ${escapeHTML(
                            recommendation.category
                        )}
                    </span>

                    <span
                        class="
                            priority-badge
                            ${escapeHTML(priority)}
                        "
                    >
                        ${escapeHTML(
                            recommendation.priority
                        )}
                    </span>

                </div>


                <h3>
                    ${escapeHTML(
                        recommendation.title
                    )}
                </h3>


                <p>
                    ${escapeHTML(
                        recommendation.description
                    )}
                </p>

            </div>

        </article>

    `;
}


// ============================================================
// LOADING
// ============================================================

function showRecommendationLoading(
    container
) {

    container.innerHTML = `

        <div class="recommendations-loading">

            <div class="loading-spinner"></div>

            <p>
                Preparing your recommendations...
            </p>

        </div>

    `;
}


// ============================================================
// NO ASSESSMENT
// ============================================================

function showNoAssessment(
    container
) {

    container.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                o
            </div>

            <h3>
                Complete your first assessment
            </h3>

            <p>
                Your personalized recommendations
                will appear here.
            </p>

            <a
                href="/assessment"
                class="primary-button"
            >
                Start assessment &rarr;
            </a>

        </div>

    `;
}


// ============================================================
// ERROR
// ============================================================

function showRecommendationError(
    container
) {

    container.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                !
            </div>

            <h3>
                Couldn't load recommendations
            </h3>

            <p>
                Please try again.
            </p>

            <button
                class="primary-button"
                onclick="loadRecommendations()"
            >
                Try again &rarr;
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
