const loginForm =
    document.getElementById("loginForm");

const loginButton =
    document.getElementById("loginButton");

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


const passwordToggle =
    document.getElementById(
        "passwordToggle"
    );


passwordToggle.addEventListener(
    "click",
    () => {

        const password =
            document.getElementById(
                "password"
            );

        const isPassword =
            password.type === "password";

        password.type =
            isPassword
                ? "text"
                : "password";

        passwordToggle.textContent =
            isPassword
                ? "Hide"
                : "Show";
    }
);


loginForm.addEventListener(
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


        if (!email || !password) {

            showMessage(
                "Please enter your email and password."
            );

            return;
        }


        loginButton.disabled = true;

        loginButton.textContent =
            "Signing in...";


        try {

            const response =
                await fetch(
                    "/auth/login",
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
                    "Invalid email or password."
                );

            }

            showMessage(
                "Login successful. Redirecting...",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "/dashboard";

            }, 500);


        } catch (error) {

            showMessage(
                error.message ||
                "Unable to log in. Please try again."
            );


            loginButton.disabled = false;

            loginButton.textContent =
                "Log in →";
        }

    }
);
