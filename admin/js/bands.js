async function loadBands() {
  const bands = await apiGet("/bands");
  const container = document.getElementById("bands-list");

  container.innerHTML = "";

  bands.forEach((band) => {
    const div = document.createElement("div");
    div.className = "item-box";

    div.innerHTML = `
      <h3>${band.name}</h3>
      <p>${band.genre || ""}</p>

      <button onclick="editBand(${band.id})">Rediger</button>
      <button onclick="deleteBand(${band.id})">Slett</button>
    `;

    container.appendChild(div);
  });
}

async function createBand() {
  const name = prompt("Bandnavn:");
  if (!name) return;

  await apiPost("/bands", {
    name,
    genre: "",
    description: "",
    image: "",
  });

  loadBands();
}

async function editBand(id) {
  const band = await apiGet(`/bands/${id}`);

  const name = prompt("Bandnavn:", band.name);
  if (!name) return;

  await apiPut(`/bands/${id}`, { ...band, name });
  loadBands();
}

async function deleteBand(id) {
  if (!confirm("Slette band?")) return;
  await apiDelete(`/bands/${id}`);
  loadBands();
}

if (location.pathname.includes("index.html")) {
  setTimeout(loadBands, 300);
}
