const signupForm =
    document.getElementById("signupForm");

const signupButton =
    document.getElementById("signupButton");

const authMessage =
    document.getElementById("authMessage");


function showMessage(
    message,
    type = "error"
) {

    authMessage.textContent = message;

    authMessage.className =
        `auth-message show ${type}`;
}


function setupPasswordToggle(
    buttonId,
    inputId
) {

    const button =
        document.getElementById(
            buttonId
        );

    const input =
        document.getElementById(
            inputId
        );


    button.addEventListener(
        "click",
        () => {

            const isPassword =
                input.type === "password";

            input.type =
                isPassword
                    ? "text"
                    : "password";

            button.textContent =
                isPassword
                    ? "Hide"
                    : "Show";
        }
    );
}


setupPasswordToggle(
    "passwordToggle",
    "password"
);


setupPasswordToggle(
    "confirmPasswordToggle",
    "confirmPassword"
);


signupForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();


        const email =
            document
                .getElementById("email")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        const confirmPassword =
            document
                .getElementById(
                    "confirmPassword"
                )
                .value;


        if (
            password !==
            confirmPassword
        ) {

            showMessage(
                "Passwords do not match."
            );

            return;
        }


        if (password.length < 8) {

            showMessage(
                "Password must contain at least 8 characters."
            );

            return;
        }


        signupButton.disabled = true;

        signupButton.textContent =
            "Creating account...";


        try {

            const response =
                await fetch(
                    "/auth/signup",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                throw new Error(
                    data.detail ||
                    "Unable to create account."
                );

            }


            showMessage(
                "Account created successfully. Redirecting to login...",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "/login";

            }, 800);


        } catch (error) {

            showMessage(
                error.message ||
                "Unable to create account."
            );


            signupButton.disabled = false;

            signupButton.textContent =
                "Create account →";
        }

    }
);