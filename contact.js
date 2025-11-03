// ------------------------------------------------------
// ShareBite Contact Page Script - FINAL
// ------------------------------------------------------
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// Firebase config (same as donor/receiver)
const firebaseConfig = {
  apiKey: "AIzaSyD18oQ4ioUcSAPsTzmJZpb_f2eioqukMK4",
  authDomain: "sharebite-f3589.firebaseapp.com",
  databaseURL: "https://sharebite-f3589-default-rtdb.firebaseio.com",
  projectId: "sharebite-f3589",
  storageBucket: "sharebite-f3589.appspot.com",
  messagingSenderId: "17176092072",
  appId: "1:17176092072:web:9f38f2b4c9a8217287d19d",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("contactContainer");

  // Get donation ID from URL
  const params = new URLSearchParams(window.location.search);
  const donationId = params.get("id");

  if (!donationId) {
    container.innerHTML = `<p>❌ No donor ID provided.</p>`;
    return;
  }

  try {
    const donationRef = ref(db, `donations/${donationId}`);
    const snapshot = await get(donationRef);

    if (!snapshot.exists()) {
      container.innerHTML = `<p>❌ Donation not found.</p>`;
      return;
    }

    const donation = snapshot.val();

    // Create the contact info display
    container.innerHTML = `
      <div class="contact-card">
        <h2>🍱 ${escapeHtml(donation.name || "Unknown Donor")}</h2>
        <p><strong>📧 Email:</strong> ${escapeHtml(donation.email || "Not provided")}</p>
        <p><strong>📞 Phone:</strong> ${escapeHtml(donation.phone || "Not provided")}</p>
        <p><strong>📍 Location:</strong> ${escapeHtml(donation.location || "Not provided")}</p>
        <p><strong>🏠 Address:</strong> ${escapeHtml(donation.address || "Not provided")}</p>
        <p><strong>🕒 Time Prepared:</strong> ${escapeHtml(donation.timePrepared || "Not provided")}</p>
        <p><strong>🍛 Food Type:</strong> ${escapeHtml(donation.foodType || "Not provided")}</p>
        <p><strong>👥 Quantity:</strong> ${escapeHtml(donation.quantity || "Not provided")} people</p>
        ${
          donation.mapUrl
            ? `<a class="btn-map" href="${escapeAttr(donation.mapUrl)}" target="_blank">🌍 View on Google Maps</a>`
            : ""
        }
        <div class="button-group">
          <a href="mailto:${encodeURIComponent(donation.email || '')}" class="btn-mail">✉️ Mail Donor</a>
          <a href="tel:${encodeURIComponent(donation.phone || '')}" class="btn-call">📞 Call Donor</a>
          <a href="receiver.html" class="btn-back">⬅ Back to Dashboard</a>
        </div>
      </div>
    `;
  } catch (err) {
    console.error("Error loading contact:", err);
    container.innerHTML = `<p>⚠️ Error loading donor details. Please try again.</p>`;
  }
});

function escapeHtml(str) {
  if (typeof str !== "string") return str;
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttr(str) {
  if (typeof str !== "string") return str;
  return str.replaceAll('"', "%22").replaceAll("'", "%27");
}
