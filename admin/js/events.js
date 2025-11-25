async function loadEvents() {
  const events = await apiGet("/events");
  const container = document.getElementById("events-list");

  container.innerHTML = "";

  events.forEach((event) => {
    const div = document.createElement("div");
    div.className = "item-box";

    div.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.date} – ${event.time}</p>
      <p>Sted: ${event.venue}</p>
      <p>Pris: ${event.price} kr</p>

      <button onclick="editEvent(${event.id})">Rediger</button>
      <button onclick="deleteEvent(${event.id})">Slett</button>
    `;

    container.appendChild(div);
  });
}

async function createEvent() {
  const title = prompt("Tittel på arrangement:");
  if (!title) return;

  await apiPost("/events", {
    title,
    description: "",
    date: "",
    time: "",
    venue: "",
    price: 0,
    image: "",
    ticketsAvailable: 0,
  });

  loadEvents();
}

async function editEvent(id) {
  const event = await apiGet(`/events/${id}`);

  const title = prompt("Tittel:", event.title);
  if (!title) return;

  await apiPut(`/events/${id}`, { ...event, title });
  loadEvents();
}

async function deleteEvent(id) {
  if (!confirm("Slette arrangement?")) return;
  await apiDelete(`/events/${id}`);
  loadEvents();
}

if (location.pathname.includes("index.html")) {
  setTimeout(loadEvents, 300);
}
