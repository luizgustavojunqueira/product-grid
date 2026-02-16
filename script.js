document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("productsGrid");
  const search = document.getElementById("search");
  const addSample = document.getElementById("add-sample");

  grid.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-btn");
    if (!btn) return;
    const card = btn.closest(".product-card");
    if (!card) return;
    card.classList.toggle("added");
    btn.textContent = card.classList.contains("added")
      ? "Added"
      : "Add to Cart";
  });

  search.addEventListener("input", (e) => {
    const q = e.target.value.trim().toLowerCase();
    const cards = grid.querySelectorAll(".product-card");
    cards.forEach((card) => {
      const title = (
        card.dataset.title ||
        card.querySelector(".product-title")?.textContent ||
        ""
      ).toLowerCase();
      const match = title.includes(q);
      card.style.display = match ? "" : "none";
    });
  });

  let sampleSeed = 1000;
  addSample.addEventListener("click", () => {
    sampleSeed += 1;
    const title = `Sample Product ${sampleSeed}`;
    const imgSrc = `https://picsum.photos/seed/sample${sampleSeed}/800/600`;
    const price = `$${(Math.random() * 200 + 10).toFixed(2)}`;
    const desc = "Short description for the dynamically generated product.";

    const card = document.createElement("article");
    card.className = "product-card";
    card.setAttribute("data-title", title);
    card.innerHTML = `
      <img src="${imgSrc}" alt="${title}" />
      <h3 class="product-title">${title}</h3>
      <p class="product-desc">${desc}</p>
      <div class="product-footer">
        <span class="price">${price}</span>
        <button class="add-btn">Add to Cart</button>
      </div>
    `;
    grid.appendChild(card);
    const q = search.value.trim().toLowerCase();
    if (q && !title.toLowerCase().includes(q)) card.style.display = "none";
  });
});
