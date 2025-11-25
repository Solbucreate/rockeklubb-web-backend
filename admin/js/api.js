const API_URL = "/api";

function apiHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
}

async function apiGet(url) {
  const res = await fetch(API_URL + url, {
    headers: apiHeaders(),
  });
  return res.json();
}

async function apiPost(url, data) {
  const res = await fetch(API_URL + url, {
    method: "POST",
    headers: apiHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

async function apiPut(url, data) {
  const res = await fetch(API_URL + url, {
    method: "PUT",
    headers: apiHeaders(),
    body: JSON.stringify(data),
  });
  return res.json();
}

async function apiDelete(url) {
  const res = await fetch(API_URL + url, {
    method: "DELETE",
    headers: apiHeaders(),
  });
  return res.json();
}
