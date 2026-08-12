const UPI = "ffcarderupta@fam";

const services = [
  {name:"100 Likes", desc:"Profile likes • 1 day", price:10},
  {name:"220 Likes", desc:"Profile likes • 1 day", price:20},
  {name:"220 Likes Daily", desc:"Daily likes • 30 days", price:300},
  {name:"220 Likes Daily", desc:"Daily likes • 45 days", price:410},
  {name:"220 Likes Daily", desc:"Daily likes • 60 days", price:550},
  {name:"Custom Order", desc:"Need a different package? Contact admin.", price:0}
];

let selected = null;

const grid = document.getElementById("serviceGrid");

if (grid) {
  grid.innerHTML = services.map((s, i) => `
    <article class="card">
      <p class="eyebrow">SERVICE ${String(i + 1).padStart(2, "0")}</p>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <div class="row">
        <span class="price">${s.price ? "₹" + s.price : "Custom"}</span>
        <button class="smallbtn" onclick="openCheckout(${i})">
          Buy now
        </button>
      </div>
    </article>
  `).join("");
}

function openCheckout(i) {
  selected = services[i];

  document.getElementById("checkoutTitle").textContent = selected.name;
  document.getElementById("checkoutPrice").textContent =
    selected.price ? "₹" + selected.price : "Custom";

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
  navigator.clipboard?.writeText(UPI);
  alert("UPI ID copied: " + UPI);
}

function submitOrder() {
  const utr = document.getElementById("utr").value.trim();

  if (!utr) {
    alert("Payment ke baad UTR enter karo.");
    return;
  }

  document.getElementById("status").textContent =
    "Submitted. Your payment is pending manual verification.";
}
