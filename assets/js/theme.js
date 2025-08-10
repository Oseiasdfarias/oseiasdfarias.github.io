/* ----- THEME TOGGLE SCRIPT ----- */
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'uil-sun'; // Icon to display when dark theme is active

// Function to get current theme from body class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';

// Function to get current icon from button class
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun';

// Check for previously saved user preference in localStorage
const savedTheme = localStorage.getItem('selected-theme');
const savedIcon = localStorage.getItem('selected-icon');

// If a theme was previously saved, apply it
if (savedTheme) {
  document.body.classList[savedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
  themeButton.classList[savedIcon === 'uil-sun' ? 'add' : 'remove'](iconTheme);
}

// Add click event listener to the theme button
themeButton.addEventListener('click', () => {
    // Toggle the dark theme class on the body
    document.body.classList.toggle(darkTheme);
    // Toggle the icon class on the button
    themeButton.classList.toggle(iconTheme);

    // Save the user's choice to localStorage
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});
