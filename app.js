const UPI = "ffcarderupta@fam";

const categories = [
  { id: "likes", name: "Profile Like Bot" },
  { id: "craftland", name: "Craftland Bots" },
  { id: "guild", name: "Guild Glory" },
  { id: "diamonds", name: "Free Fire Carding" }
];

const services = [
  // Profile Like Bot
  { cat: "likes", name: "100 Likes", desc: "Profile likes", meta: "Delivery: 1 day", price: 10 },
  { cat: "likes", name: "220 Likes", desc: "Profile likes", meta: "Delivery: 1 day", price: 20 },
  { cat: "likes", name: "220 Likes Daily", desc: "Daily profile likes", meta: "Duration: 30 days", price: 300 },
  { cat: "likes", name: "220 Likes Daily", desc: "Daily profile likes", meta: "Duration: 45 days", price: 410 },
  { cat: "likes", name: "220 Likes Daily", desc: "Daily profile likes", meta: "Duration: 60 days", price: 550 },
  { cat: "likes", name: "Custom Order", desc: "Need a different package? Contact admin.", meta: "", price: 0 },

  // Craftland Bots
  { cat: "craftland", name: "Craftland Followers", desc: "₹25 per 50 followers", meta: "Limit 200/day • 6hr–24hr", price: 25 },
  { cat: "craftland", name: "Craftland Followers (Fast Plan)", desc: "₹100 per 100 followers", meta: "Limit 25k/day • 5min–2hr", price: 100 },
  { cat: "craftland", name: "Craftland Map Likes", desc: "₹50 per 250 likes", meta: "Limit 2k/day • 3hr–15hr", price: 50 },
  { cat: "craftland", name: "Craftland Map Stars", desc: "₹30 per 50 stars", meta: "Limit 150/day • 6hr–24hr", price: 30 },
  { cat: "craftland", name: "Craftland Level Up", desc: "Craftland account level up", meta: "", price: 20, priceText: "From ₹20" },

  // Profile Bots — Guild Glory
  { cat: "guild", name: "Guild Level 7", desc: "Guild Glory • Guild level 7", meta: "Delivery: 3 days", price: 500 },
  { cat: "guild", name: "Guild Region Top 15", desc: "Guild Glory • Region Top 15", meta: "Delivery: 58 hours", price: 1400 },

  // Free Fire Carding
  { cat: "diamonds", name: "4,000 Diamonds", desc: "Free Fire carding top-up", meta: "", price: 1000 },
  { cat: "diamonds", name: "10,000 Diamonds", desc: "Free Fire carding top-up", meta: "", price: 2000 }
];

let selected = null;
let activeCat = categories[0].id;

function priceLabel(s) {
  if (s.priceText) return s.priceText;
  return s.price ? "₹" + s.price.toLocaleString("en-IN") : "Custom";
}

function renderCards() {
  const grid = document.getElementById("serviceGrid");
  if (!grid) return;

  grid.innerHTML = services
    .map((s, i) => ({ s, i }))
    .filter(({ s }) => s.cat === activeCat)
    .map(({ s, i }) => `
      <article class="card">
        <h3>${s.name}</h3>
        <p>${s.desc}</p>
        ${s.meta ? `<p class="meta">${s.meta}</p>` : ""}

        <div class="row">
          <span class="price">${priceLabel(s)}</span>
          <button class="smallbtn" onclick="openCheckout(${i})">Buy now</button>
        </div>
      </article>
    `).join("");
}

function renderNav() {
  const nav = document.getElementById("catNav");
  if (!nav) return;

  nav.innerHTML = categories.map(c => `
    <button class="cat-btn ${c.id === activeCat ? "active" : ""}" data-cat="${c.id}" onclick="selectCategory('${c.id}')">
      ${c.name}
    </button>
  `).join("");
}

function selectCategory(id) {
  activeCat = id;
  renderNav();
  renderCards();
}

document.addEventListener("DOMContentLoaded", function () {
  const grid = document.getElementById("serviceGrid");

  if (!grid) {
    console.error("serviceGrid not found");
    return;
  }

  renderNav();
  renderCards();
});

function openCheckout(index) {
  selected = services[index];

  document.getElementById("checkoutTitle").textContent = selected.name;

  document.getElementById("checkoutPrice").textContent = priceLabel(selected);

  document.getElementById("checkout").classList.remove("hidden");
}

function closeCheckout() {
  document.getElementById("checkout").classList.add("hidden");
}

function showPayment() {
  const uid = document.getElementById("uid").value.trim();

  if (!uid) {
    alert("Free Fire UID enter karo.");
    return;
  }

  closeCheckout();
  document.getElementById("payment").classList.remove("hidden");
}

function closePayment() {
  document.getElementById("payment").classList.add("hidden");
}

function copyUPI() {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(UPI);
  }

  alert("UPI ID copied: " + UPI);
}

function submitOrder() {
  const utr = document.getElementById("utr").value.trim();

  if (!utr) {
    alert("Payment ke baad UTR / Transaction ID enter karo.");
    return;
  }

  document.getElementById("status").textContent =
    "Submitted. Your payment is pending manual verification.";
}

// Expose handlers to the global scope so inline onclick="" attributes work
// when this file is loaded as an ES module (required for the Vite production build).
window.selectCategory = selectCategory;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.showPayment = showPayment;
window.closePayment = closePayment;
window.copyUPI = copyUPI;
window.submitOrder = submitOrder;
