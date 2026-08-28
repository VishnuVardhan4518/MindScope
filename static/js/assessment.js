const form = document.getElementById("assessmentForm");

const formSteps = document.querySelectorAll(".form-step");
const stepIndicators = document.querySelectorAll(".step");

const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const errorMessage = document.getElementById("errorMessage");

const retryButton = document.getElementById("retryButton");

const submitButton =
    document.querySelector(
        "#assessmentForm button[type='submit']"
    );


let currentStep = 1;


/* =========================================================
   STEP NAVIGATION
   ========================================================= */

function showStep(stepNumber) {

    currentStep = stepNumber;

    formSteps.forEach(step => {

        const stepValue = Number(step.dataset.step);

        step.classList.toggle(
            "active",
            stepValue === stepNumber
        );

    });


    stepIndicators.forEach(step => {

        const stepValue = Number(step.dataset.step);

        step.classList.toggle(
            "active",
            stepValue <= stepNumber
        );

    });


    progressBar.style.width =
        `${(stepNumber / 3) * 100}%`;


    progressText.textContent =
        `Step ${stepNumber} of 3`;


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   VALIDATION
   ========================================================= */

function validateCurrentStep() {

    const currentFormStep =
        document.querySelector(
            `.form-step[data-step="${currentStep}"]`
        );

    const fields =
        currentFormStep.querySelectorAll(
            "input, select"
        );


    for (const field of fields) {

        if (!field.checkValidity()) {

            field.reportValidity();

            return false;
        }
    }

    return true;
}


/* =========================================================
   NEXT BUTTONS
   ========================================================= */

document.querySelectorAll(".next-button").forEach(button => {

    button.addEventListener("click", () => {

        if (!validateCurrentStep()) {
            return;
        }

        const nextStep =
            Number(button.dataset.next);

        showStep(nextStep);

    });

});


/* =========================================================
   BACK BUTTONS
   ========================================================= */

document.querySelectorAll(".back-button[data-back]").forEach(button => {

    button.addEventListener("click", () => {

        const previousStep =
            Number(button.dataset.back);

        showStep(previousStep);

    });

});


/* =========================================================
   FORM SUBMISSION
   ========================================================= */

form.addEventListener("submit", async (event) => {

    event.preventDefault();


    if (!validateCurrentStep()) {
        return;
    }


    const formData =
        new FormData(form);


    const data = {

        age:
            Number(formData.get("age")),

        gender:
            formData.get("gender"),

        country:
            formData.get("country"),

        academic_level:
            formData.get("academic_level"),

        most_used_platform:
            formData.get("most_used_platform"),

        purpose_of_use:
            formData.get("purpose_of_use"),

        avg_daily_usage_hours:
            Number(
                formData.get(
                    "avg_daily_usage_hours"
                )
            ),

        daily_unlocks:
            Number(
                formData.get("daily_unlocks")
            ),

        study_hours:
            Number(
                formData.get("study_hours")
            ),

        physical_activity_hours:
            Number(
                formData.get(
                    "physical_activity_hours"
                )
            ),

        sleep_hours_per_night:
            Number(
                formData.get(
                    "sleep_hours_per_night"
                )
            ),

        stress_level:
            formData.get("stress_level")
    };


    await submitAssessment(data);

});


/* =========================================================
   API REQUEST
   ========================================================= */

async function submitAssessment(data) {

    if (submitButton) {

        submitButton.disabled = true;

        submitButton.dataset.originalText =
            submitButton.textContent;

        submitButton.innerHTML =
            `
            <span class="button-spinner"></span>
            Analyzing...
            `;

    }

    form.style.display = "none";

    loadingState.classList.add("active");

    errorState.classList.remove("active");


    try {

        const response = await fetch(
            "/predict",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        if (!response.ok) {

            const errorData =
                await response.json()
                    .catch(() => null);

            throw new Error(
                errorData?.detail ||
                "Unable to process your assessment."
            );
        }


        /*
         * Move to dashboard.
         */

        window.location.href =
            "/dashboard";


    } catch (error) {

        console.error(error);

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
                submitButton.dataset.originalText ||
                "Get My Results";

        }

        loadingState.classList.remove("active");

        errorState.classList.add("active");

        errorMessage.textContent =
            "We couldn't generate your wellness result. Please check your responses and try again.";

    }

}


/* =========================================================
   RETRY
   ========================================================= */

retryButton.addEventListener("click", () => {

    errorState.classList.remove("active");

    form.style.display = "block";

    showStep(3);

});
