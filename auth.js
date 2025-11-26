// auth.js

// Hard-coded user list – edit as you like
const USERS = [
    { username: "Sohail", password: "Palm123" },
    { username: "PM",     password: "PMaccess" },
    { username: "Client", password: "Client2025" }
];

// Key for localStorage
const AUTH_KEY = "pjav_logged_in_user";

// Called on login form submit
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const errorBox = document.getElementById("error");

    const match = USERS.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
    );

    if (!match) {
        errorBox.textContent = "Invalid username or password.";
        return;
    }

    // Store logged in user in localStorage
    localStorage.setItem(AUTH_KEY, match.username);

    // Redirect to dashboard
    window.location.href = "dashboard.html";
}

// Utility: check logged-in state on protected pages
function requireAuth() {
    const user = localStorage.getItem(AUTH_KEY);
    if (!user) {
        window.location.href = "login.html";
    } else {
        const userLabel = document.getElementById("user-label");
        if (userLabel) userLabel.textContent = "Hello " + user;
    }
}

// Logout
function logout() {
    localStorage.removeItem(AUTH_KEY);
    window.location.href = "login.html";
}
