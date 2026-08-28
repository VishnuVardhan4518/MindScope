document.addEventListener(
    "DOMContentLoaded",
    loadHistory
);


async function loadHistory() {

    const historyContainer =
        document.getElementById(
            "historyContainer"
        );


    if (!historyContainer) {
        return;
    }


    historyContainer.innerHTML = `
        <div class="history-loading">
            Loading your assessment history...
        </div>
    `;


    try {

        const response =
            await fetch(
                "/api/history"
            );


        if (!response.ok) {

            if (response.status === 401) {

                window.location.href =
                    "/login";

                return;
            }


            throw new Error(
                "Unable to load history."
            );
        }


        const assessments =
            await response.json();


        renderHistory(
            assessments
        );


    } catch (error) {

        console.error(error);

        historyContainer.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    !
                </div>

                <h3>
                    Unable to load history
                </h3>

                <p>
                    We couldn't retrieve your
                    assessment history. Please try again.
                </p>

                <button
                    type="button"
                    class="primary-button"
                    onclick="loadHistory()"
                >
                    Try again
                </button>

            </div>
        `;
    }
}


function renderHistory(
    assessments
) {

    const container =
        document.getElementById(
            "historyContainer"
        );


    if (!assessments.length) {

        container.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    o
                </div>

                <h3>
                    No assessments yet
                </h3>

                <p>
                    Complete your first assessment
                    to start building your wellness history.
                </p>

                <a
                    href="/assessment"
                    class="primary-button"
                >
                    Start assessment ->
                </a>

            </div>
        `;

        return;
    }


    container.innerHTML =
        assessments
            .map(assessment => {

                const date =
                    new Date(
                        assessment.created_at
                    );


                const formattedDate =
                    date.toLocaleDateString(
                        "en-IN",
                        {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        }
                    );


                const formattedTime =
                    date.toLocaleTimeString(
                        "en-IN",
                        {
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );


                return `
                    <div class="history-item">

                        <div class="history-main">

                            <div class="history-title">
                                Wellness Assessment
                            </div>

                            <div class="history-date">
                                ${formattedDate}
                                .
                                ${formattedTime}
                            </div>

                        </div>


                        <div class="history-score">

                            <span class="score-number">
                                ${Number(
                                    assessment.prediction_score
                                ).toFixed(1)}
                            </span>

                            <span class="score-label">
                                Score
                            </span>

                        </div>

                    </div>
                `;

            })
            .join("");
}
