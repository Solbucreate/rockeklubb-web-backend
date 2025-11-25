async function loadOrders() {
  const orders = await apiGet("/orders/1"); // Endres senere for listevisning
  const container = document.getElementById("orders-list");

  container.innerHTML = `
    <p>Ordresystem skjer via Vipps + Stripe callbacks.</p>
    <p>Komplett ordreoversikt legges inn etter betalingstest.</p>
  `;
}

if (location.pathname.includes("index.html")) {
  setTimeout(loadOrders, 300);
}
