// ------------------------------------------------------
// ShareBite NGO Receiver Script - fixed
// ------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

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

document.addEventListener("DOMContentLoaded", () => {
  const donationsContainer = document.getElementById("donationsContainer");
  if (!donationsContainer) return;

  const donationsRef = ref(db, "donations");
  onValue(donationsRef, (snapshot) => {
    donationsContainer.innerHTML = ""; // clear old content

    if (!snapshot.exists()) {
      donationsContainer.innerHTML = "<p>No donations available right now 😔</p>";
      return;
    }

    const donations = snapshot.val();
    const keys = Object.keys(donations).reverse(); // latest first

    keys.forEach((key) => {
      const donation = donations[key] || {};
      if (donation.available === false) return; // only show available

      const name = donation.name || "Anonymous Donor";
      const email = donation.email || "";
      const phone = donation.phone || "Not provided";
      const location = donation.location || "Not provided";
      const address = donation.address || "Not provided";
      const timePrepared = donation.timePrepared || "N/A";
      const quantity = donation.quantity || "N/A";
      const foodType = donation.foodType || "N/A";
      const mapLink = donation.mapUrl && donation.mapUrl.trim() !== "" ? donation.mapUrl : null;

      const card = document.createElement("div");
      card.className = "donation-card";

      const h3 = document.createElement("h3");
      h3.textContent = `🍱 ${name}`;
      card.appendChild(h3);

      const addRow = (label, value) => {
        const p = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = `${label}: `;
        p.appendChild(strong);
        p.appendChild(document.createTextNode(value));
        card.appendChild(p);
      };

      addRow("📧 Email", email || "Not provided");
      addRow("📞 Phone", phone);
      addRow("📍 Location", location);
      addRow("🏠 Address", address);
      addRow("🕒 Prepared At", timePrepared);
      addRow("👥 Quantity", `${quantity} people`);
      addRow("🍛 Type", foodType);

      const buttons = document.createElement("div");
      buttons.className = "card-buttons";

      if (mapLink) {
        const aMap = document.createElement("a");
        aMap.href = mapLink;
        aMap.target = "_blank";
        aMap.rel = "noopener";
        aMap.textContent = "🌐 View Map";
        buttons.appendChild(aMap);
      } else {
        const span = document.createElement("span");
        span.className = "disabled-btn";
        span.textContent = "🌐 No Location";
        buttons.appendChild(span);
      }

      if (email) {
        const aMail = document.createElement("a");
        aMail.href = `mailto:${encodeURIComponent(email)}`;
        aMail.className = "mail-btn";
        aMail.textContent = "✉️ Mail Donor";
        buttons.appendChild(aMail);
      } else {
        const spanMail = document.createElement("span");
        spanMail.className = "disabled-btn";
        spanMail.textContent = "✉️ No Email";
        buttons.appendChild(spanMail);
      }

      const aContact = document.createElement("a");
      aContact.href = `contact.html?donor=${encodeURIComponent(key)}`;
      aContact.className = "contact-btn";
      aContact.textContent = "📄 View Contact Details";
      buttons.appendChild(aContact);

      card.appendChild(buttons);
      donationsContainer.appendChild(card);
    });
  });
});

// helpers intentionally omitted — using DOM APIs + textContent prevents HTML injection.