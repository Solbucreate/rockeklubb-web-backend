async function loadImages() {
  const container = document.getElementById("images-panel");

  container.innerHTML = `
    <p>Denne delen håndterer opplasting av bilder.</p>
    <p>Backend for filopplasting legges inn senere med multer.</p>
  `;
}

if (location.pathname.includes("index.html")) {
  setTimeout(loadImages, 300);
}
