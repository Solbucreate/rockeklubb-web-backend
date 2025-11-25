async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    window.location.href = "/admin/index.html";
  } else {
    document.getElementById("login-status").innerText =
      "Feil brukernavn eller passord";
  }
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "/admin/login.html";
}

// Sjekk token når adminpanel lastes
if (location.pathname.includes("index.html")) {
  if (!localStorage.getItem("token")) {
    window.location.href = "/admin/login.html";
  }
}

function showSection(id) {
  document.querySelectorAll(".section").forEach((sec) => {
    sec.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}
