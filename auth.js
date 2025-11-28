// auth.js

// ---------------------------------------------------
// ✅ USER LIST (add more users here if needed)
// ---------------------------------------------------
const USERS = [
  { username: "Sohail", password: "Palm123" },
  { username: "PM",     password: "PMaccess" },
  { username: "Client", password: "Client2025" }
];

const AUTH_KEY = "pjav_logged_in_user";

// ---------------------------------------------------
// ✅ Check login credentials (browser replacement for Code.gs)
// ---------------------------------------------------
function checkLoginBrowser(username, password) {
  const user = USERS.find(
    u => u.username.toLowerCase() === username.toLowerCase() &&
         u.password === password
  );
  return !!user;
}

// ---------------------------------------------------
// ✅ Return logged-in username
// ---------------------------------------------------
function getCurrentUserBrowser() {
  return localStorage.getItem(AUTH_KEY) || "User";
}

// ---------------------------------------------------
// ✅ Handle login (called from login.html)
// ---------------------------------------------------
function handleLogin(event) {
  if (event) event.preventDefault();

  const u = document.getElementById("username").value.trim();
  const p = document.getElementById("password").value;
  const msg = document.getElementById("msg");

  if (!u || !p) {
    msg.textContent = "Please enter username and password.";
    msg.className = "msg err";
    return;
  }

  msg.textContent = "Checking...";
  msg.className = "msg ok";

  if (checkLoginBrowser(u, p)) {
    localStorage.setItem(AUTH_KEY, u);
    window.location.href = "dashboard.html";
  } else {
    msg.textContent = "✖ Invalid username or password.";
    msg.className = "msg err";
  }
}

// ---------------------------------------------------
// ✅ Logout: clear session + redirect
// ---------------------------------------------------
function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "login.html";
}

// ---------------------------------------------------
// ✅ Protect dashboard from direct access
// ---------------------------------------------------
function requireAuth() {
  if (!localStorage.getItem(AUTH_KEY)) {
    window.location.href = "login.html";
  }
}
