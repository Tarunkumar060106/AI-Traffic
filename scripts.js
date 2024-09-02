// Smooth Scroll for Navigation Links
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('header nav a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {

            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Update the Current Year in the Hero Section
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');

    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});
