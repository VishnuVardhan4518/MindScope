const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            logoutButton.disabled = true;

            logoutButton.textContent =
                "Logging out...";


            try {

                const response =
                    await fetch(
                        "/auth/logout",
                        {
                            method: "POST"
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Logout failed"
                    );

                }


                sessionStorage.clear();

                window.location.href =
                    "/";

            }

            catch (error) {

                console.error(error);

                logoutButton.disabled = false;

                logoutButton.textContent =
                    "Log out";

            }

        }
    );

}
