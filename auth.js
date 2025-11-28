// auth.js

// ✅ Replace / add users here OR build from a form later
const USERS = [
  { username: "Sohail", password: "Palm123" },
  { username: "PM",     password: "PMaccess" },
  { username: "Client", password: "Client2025" }
];

const AUTH_KEY  = "pjav_logged_in_user";

// ✅ "CheckLogin" equivalent (from Code.gs)
function checkLoginBrowser(username, password) {
  const match = USERS.find(
    u => u.username.toLowerCase() === username.toLowerCase() &&
         u.password === password
  );
  return !!match;
}

// ✅ "getCurrentUser" equivalent
function getCurrentUserBrowser() {
  return localStorage.getItem(AUTH_KEY) || "User";
}

// ✅ Handle login from the HTML form
function handleLogin(event) {
  if (event) event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const msg      = document.getElementById("msg");   // new message div

  if (!username || !password) {
    msg.textContent = "Please enter username and password.";
    msg.className   = "msg err";
    return;
  }

  msg.textContent = "Checking...";
  msg.className   = "msg ok";

  const ok = checkLoginBrowser(username, password);

  if (ok) {
    localStorage.setItem(AUTH_KEY, username);
    window.location.href = "dashboard.html";
  } else {
    msg.textContent = "✖ Invalid username or password.";
    msg.className   = "msg err";
  }
}

// ✅ "logout" equivalent
function logout() {
  localStorage.removeItem(AUTH_KEY);
  window.location.href = "login.html";
}

// ✅ Protect dashboard / show "Hello <name>"
function requireAuth() {
  const user = localStorage.getItem(AUTH_KEY);
  if (!user) {
    window.location.href = "login.html";
  } else {
    const label = document.getElementById("user-label");
    if (label) label.textContent = "Hello " + user;
  }
}
