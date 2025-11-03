// ...existing code...
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyD18oQ4ioUcSAPsTzmJZpb_f2eioqukMK4",
  authDomain: "sharebite-f3589.firebaseapp.com",
  databaseURL: "https://sharebite-f3589-default-rtdb.firebaseio.com",
  projectId: "sharebite-f3589",
  storageBucket: "sharebite-f3589.appspot.com",
  messagingSenderId: "17176092072",
  appId: "1:17176092072:web:9f38f2b4c9a8217287d19d",
  measurementId: "G-9ZWLB7KMR2",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
  const myDonationsContainer = document.getElementById("myDonationsContainer");
  if (!myDonationsContainer) return;

  const donorEmail = localStorage.getItem("donorEmail");
  if (!donorEmail) {
    myDonationsContainer.innerHTML = "<p>Please verify yourself first.</p>";
    return;
  }

  const donationsRef = ref(db, "donations");

  (async function loadDonations() {
    try {
      const snapshot = await get(donationsRef);
      if (!snapshot.exists()) {
        myDonationsContainer.innerHTML = "<p>No donations found.</p>";
        return;
      }

      const donations = snapshot.val();
      const entries = Object.entries(donations)
        .filter(([id, d]) => (d && d.email) === donorEmail)
        .map(([id, d]) => ({ id, ...d }));

      if (entries.length === 0) {
        myDonationsContainer.innerHTML = "<p>No donations found for your email.</p>";
        return;
      }

      // Sort by timestamp (newest first). Support ISO string or numeric timestamps.
      entries.sort((a, b) => {
        const ta = a.timestamp ? Date.parse(a.timestamp) : 0;
        const tb = b.timestamp ? Date.parse(b.timestamp) : 0;
        return tb - ta;
      });

      myDonationsContainer.innerHTML = "";
      entries.forEach((d) => {
        const card = document.createElement("div");
        card.classList.add("donation-card");

        const title = document.createElement("h3");
        title.textContent = `🍱 ${d.name || "Anonymous Donor"}`;
        card.appendChild(title);

        const addRow = (label, value) => {
          const p = document.createElement("p");
          const strong = document.createElement("strong");
          strong.textContent = `${label}: `;
          p.appendChild(strong);
          p.appendChild(document.createTextNode(value ?? "N/A"));
          card.appendChild(p);
          return p;
        };

        addRow("📍 Location", d.location || "Not provided");
        addRow("🏠 Address", d.address || "Not provided");
        addRow("🕒 Time", d.timePrepared || "Not provided");
        addRow("👥 Quantity", d.quantity || "N/A");
        addRow("🍛 Type", d.foodType || "N/A");

        const statusP = addRow("Status", d.available ? "🟢 Available" : "🔴 Unavailable");

        const buttons = document.createElement("div");
        buttons.classList.add("card-buttons");

        if (d.available) {
          const btn = document.createElement("button");
          btn.className = "btn-mark-unavailable";
          btn.textContent = "Mark as Unavailable";
          btn.addEventListener("click", async () => {
            btn.disabled = true;
            try {
              const donationRef = ref(db, `donations/${d.id}`);
              await update(donationRef, { available: false });
              statusP.lastChild.nodeValue = "🔴 Unavailable";
              btn.remove();
              alert("Donation marked as unavailable ✅");
            } catch (err) {
              console.error("Failed to update donation:", err);
              btn.disabled = false;
              alert("Failed to mark donation as unavailable. Try again.");
            }
          });
          buttons.appendChild(btn);
        }

        // Optional: link to view on map or contact
        if (d.mapUrl) {
          const aMap = document.createElement("a");
          aMap.href = d.mapUrl;
          aMap.target = "_blank";
          aMap.rel = "noopener";
          aMap.textContent = "🌐 View Map";
          buttons.appendChild(aMap);
        }

        myDonationsContainer.appendChild(card);
        card.appendChild(buttons);
      });
    } catch (err) {
      console.error("Error loading donations:", err);
      myDonationsContainer.innerHTML = "<p>Error loading donations. Check console for details.</p>";
    }
  })();
});
// ...existing code...