document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const sections =
        document.querySelectorAll(
            ".purpose-card, .tech-card, .workflow-step, .limitation"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    sections.forEach(section => {

        section.classList.add(
            "reveal"
        );

        observer.observe(section);

    });


    /* =====================================================
       HERO VISUAL
       ===================================================== */

    const visual =
        document.querySelector(
            ".hero-visual"
        );


    if (visual) {

        visual.addEventListener(
            "mousemove",
            event => {

                const rect =
                    visual.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const rotateX =
                    ((y / rect.height) - 0.5) * -6;


                const rotateY =
                    ((x / rect.width) - 0.5) * 6;


                visual.style.transform =
                    `perspective(600px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)`;

            }
        );


        visual.addEventListener(
            "mouseleave",
            () => {

                visual.style.transform =
                    "perspective(600px) rotateX(0) rotateY(0)";

            }
        );

    }

});