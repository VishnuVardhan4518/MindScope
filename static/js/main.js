document.addEventListener("DOMContentLoaded", () => {

    const loader =
        document.getElementById("pageLoader");

    if (loader) {

        setTimeout(() => {

            loader.classList.add("hidden");

        }, 250);

    }


    const currentPath =
        window.location.pathname;


    document
        .querySelectorAll(".nav-item")
        .forEach(link => {

            const href =
                link.getAttribute("href");


            if (href === currentPath) {

                link.classList.add("active");

            } else {

                link.classList.remove("active");

            }

        });

});
