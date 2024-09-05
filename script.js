document.addEventListener('DOMContentLoaded', () => {
    displayWelcomeMessage();
    updateFooterDate();
    addSmoothScrolling();
    enableScrollableAssignments();
});

// Function to display a welcome message in the console
function displayWelcomeMessage() {
    console.log('Welcome to My COP4813 Website! Explore my assignments and projects.');
}

// Function to update the footer with the current year
function updateFooterDate() {
    const footer = document.querySelector('footer p');
    const currentYear = new Date().getFullYear();
    footer.textContent = `© ${currentYear} Juan Pellot - COP4813 Web Development`;
}

// Function to add smooth scrolling effect to menu links
function addSmoothScrolling() {
    const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

    menuLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.get
