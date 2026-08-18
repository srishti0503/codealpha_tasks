// ===============================
// NAVBAR ELEMENTS
// ===============================

const navbar = document.querySelector(".navbar");

const menuIcon =
    document.querySelector(".menu-icon");

const navMenu =
    document.querySelector(".nav-links");


// ===============================
// NAVBAR SCROLL EFFECT
// ===============================

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// ===============================
// MOBILE MENU
// ===============================

if (menuIcon && navMenu) {

    menuIcon.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}


// ===============================
// CLOSE MOBILE MENU
// AFTER CLICKING A LINK
// ===============================

document
    .querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            if (navMenu) {

                navMenu.classList.remove("active");

            }

        });

    });


// ===============================
// SCROLL REVEAL ANIMATION
// ===============================

const revealElements =
    document.querySelectorAll(".reveal");


function revealOnScroll() {

    revealElements.forEach((element) => {

        const windowHeight =
            window.innerHeight;

        const elementTop =
            element.getBoundingClientRect().top;

        const revealPoint = 120;


        if (
            elementTop <
            windowHeight - revealPoint
        ) {

            element.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    revealOnScroll
);


// Run once when page loads

revealOnScroll();


// ===============================
// ACTIVE NAVBAR LINK
// ===============================

const sections =
    document.querySelectorAll("section");

const navItems =
    document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.clientHeight;


        if (
            window.scrollY >=
            sectionTop - sectionHeight / 3
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach((link) => {

        link.classList.remove("active");


        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


// ===============================
// BACK TO TOP BUTTON
// ===============================

const backToTop =
    document.querySelector(".back-to-top");


if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });

}

// ===============================
// TYPING ANIMATION
// ===============================

const typingText =
    document.querySelector(".typing-text");

const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Java Developer",
    "Web Developer",
    "AI/ML developer",
    "CSE Student"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;


function typeEffect() {

    if (!typingText) return;

    const currentRole =
        roles[roleIndex];


    if (!isDeleting) {

        typingText.textContent =
            currentRole.substring(
                0,
                charIndex + 1
            );

        charIndex++;

    } else {

        typingText.textContent =
            currentRole.substring(
                0,
                charIndex - 1
            );

        charIndex--;

    }


    let typingSpeed =
        isDeleting ? 50 : 100;


    if (
        !isDeleting &&
        charIndex === currentRole.length
    ) {

        typingSpeed = 1500;

        isDeleting = true;

    }


    else if (
        isDeleting &&
        charIndex === 0
    ) {

        isDeleting = false;

        roleIndex =
            (roleIndex + 1) % roles.length;

        typingSpeed = 500;

    }


    setTimeout(
        typeEffect,
        typingSpeed
    );

}


typeEffect();