const UPI = "ffcarderupta@fam";

const categories = [
  { id: "unsubscribe", name: "Unsubscribe" },
  { id: "craftland", name: "Craftland Bots" },
  { id: "guild", name: "Guild Glory" },
  { id: "diamonds", name: "Free Fire Carding" }
];

const services = [
  // Unsubscribe (requires Gmail address)
  { cat: "unsubscribe", name: "Single Unsubscribe", desc: "Unsubscribe a single Gmail account", meta: "Delivery: 5 minutes", price: 600 },
  { cat: "unsubscribe", name: "Double Unsubscribe", desc: "Unsubscribe a double Gmail account", meta: "Delivery: 5 minutes", price: 1000 },

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

  // Telegram contact shown ONLY inside the Free Fire Carding section
  const tgNote = document.getElementById("tgContact");
  if (tgNote) {
    tgNote.innerHTML = activeCat === "diamonds"
      ? `Need help? <a href="https://t.me/carderffgupta" target="_blank" rel="noopener">Contact Admin on Telegram (@carderffgupta)</a>`
      : "";
  }
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

function isUnsubscribe(s) {
  return s && s.cat === "unsubscribe";
}

function openCheckout(index) {
  selected = services[index];

  document.getElementById("checkoutTitle").textContent = selected.name;

  document.getElementById("checkoutPrice").textContent = priceLabel(selected);

  const idInput = document.getElementById("uid");
  const labelText = document.getElementById("uidLabelText");
  const playerField = document.getElementById("playerField");
  const playerInput = document.getElementById("player");
  const playerLabelText = document.getElementById("playerLabelText");
  const playerHelp = document.getElementById("playerHelp");

  if (isUnsubscribe(selected)) {
    // Unsubscribe services collect a Gmail address instead of a Free Fire UID
    labelText.textContent = "Gmail address";
    idInput.value = "";
    idInput.setAttribute("inputmode", "email");
    idInput.setAttribute("type", "email");
    idInput.setAttribute("placeholder", "yourname@gmail.com");
    if (playerField) playerField.style.display = "none";
  } else {
    // All other services keep the Free Fire UID input
    labelText.textContent = "Free Fire UID";
    idInput.value = "";
    idInput.setAttribute("inputmode", "numeric");
    idInput.setAttribute("type", "text");
    idInput.setAttribute("placeholder", "Enter UID");
    if (playerField) playerField.style.display = "";
  }

  // Free Fire Carding checkout ONLY: swap the second field to a contact number.
  // Every other service keeps the "Player name (optional)" field unchanged.
  if (playerInput) playerInput.value = "";
  if (selected.cat === "diamonds") {
    playerLabelText.textContent = "Contact Number";
    playerInput.setAttribute("type", "tel");
    playerInput.setAttribute("inputmode", "tel");
    playerInput.setAttribute("placeholder", "Enter your WhatsApp/Telegram number");
    playerHelp.textContent = "Add your contact number so I can contact you about your order.";
  } else {
    playerLabelText.textContent = "Player name (optional)";
    playerInput.setAttribute("type", "text");
    playerInput.setAttribute("inputmode", "text");
    playerInput.setAttribute("placeholder", "Enter player name");
    playerHelp.textContent = "";
  }

  document.getElementById("checkout").classList.remove("hidden");
}

function closeCheckout() {
  document.getElementById("checkout").classList.add("hidden");
}

function showPayment() {
  const value = document.getElementById("uid").value.trim();

  if (isUnsubscribe(selected)) {
    // Validate that the input looks like a valid Gmail address
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

    if (!value) {
      alert("Gmail address enter karo.");
      return;
    }

    if (!gmailPattern.test(value)) {
      alert("Sahi Gmail address enter karo (e.g. yourname@gmail.com).");
      return;
    }
  } else {
    if (!value) {
      alert("Free Fire UID enter karo.");
      return;
    }
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
