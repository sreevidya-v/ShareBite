// ...existing code...
// ------------------------------------------------------
// ShareBite Donor Page Script (cleaned & fixed)
// ------------------------------------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

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
let analytics;
try { analytics = getAnalytics(app); } catch {}
const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {
  const verifyBtn = document.getElementById("verifyBtn");
  const donateBtn = document.getElementById("donateBtn");
  const viewDonationsBtn = document.getElementById("viewDonationsBtn");
  const backBtn = document.getElementById("backBtn");
  const verifySection = document.getElementById("verifySection");
  const actionSection = document.getElementById("actionSection") || document.querySelector(".donor-actions");
  const donationForm = document.getElementById("donationForm");
  const donorDisplayName = document.getElementById("donorDisplayName");
  const getLocationBtn = document.getElementById("getLocationBtn");

  if (donationForm) donationForm.style.display = "none";

  if (verifyBtn) {
    verifyBtn.addEventListener("click", () => {
      const name = (document.getElementById("donorName")?.value || "").trim();
      const email = (document.getElementById("donorEmail")?.value || "").trim();
      const phone = (document.getElementById("donorPhone")?.value || "").trim();

      if (!name || !email || !phone) {
        alert("⚠️ Please enter name, email, and phone number!");
        return;
      }
      if (!/^[0-9]{10}$/.test(phone)) {
        alert("⚠️ Enter a valid 10-digit phone number.");
        return;
      }

      localStorage.setItem("donorName", name);
      localStorage.setItem("donorEmail", email);
      localStorage.setItem("donorPhone", phone);

      if (verifySection) verifySection.style.display = "none";
      if (actionSection) actionSection.style.display = "block";
      if (donorDisplayName) donorDisplayName.textContent = name;
      alert(`✅ Verified! Welcome, ${name}.`);
    });
  }

  if (donateBtn) {
    donateBtn.addEventListener("click", () => {
      if (actionSection) actionSection.style.display = "none";
      if (donationForm) donationForm.style.display = "block";
    });
  }

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      if (donationForm) donationForm.style.display = "none";
      if (actionSection) actionSection.style.display = "block";
    });
  }

  if (viewDonationsBtn) {
    viewDonationsBtn.addEventListener("click", () => {
      window.location.href = "myDonations.html";
    });
  }

  if (donationForm) {
    donationForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const donationData = {
        name: localStorage.getItem("donorName") || (document.getElementById("donorName")?.value || "").trim(),
        email: localStorage.getItem("donorEmail") || (document.getElementById("donorEmail")?.value || "").trim(),
        phone: localStorage.getItem("donorPhone") || (document.getElementById("donorPhone")?.value || "").trim(),
        location: (document.getElementById("location")?.value || "").trim(),
        address: (document.getElementById("address")?.value || "").trim(),
        timePrepared: (document.getElementById("timePrepared")?.value || "").trim(),
        quantity: (document.getElementById("quantity")?.value || "").trim(),
        foodType: (document.getElementById("foodType")?.value || "").trim(),
        mapUrl: (document.getElementById("mapUrl")?.value || "").trim(),
        available: true,
        timestamp: new Date().toISOString(),
      };

      try {
        const donationsRef = ref(db, "donations");
        const newDonation = push(donationsRef);
        set(newDonation, donationData)
          .then(() => {
            alert("✅ Donation added successfully!");
            if (donationForm) donationForm.reset();
            window.location.href = "thankyou.html";
          })
          .catch((err) => {
            console.error("Failed to save donation:", err);
            alert("❌ Failed to save donation.");
          });
      } catch (err) {
        console.error("Firebase write error:", err);
        alert("❌ Failed to save donation.");
      }
    });
  }

  if (getLocationBtn) {
    getLocationBtn.addEventListener("click", () => {
      if (!navigator.geolocation) {
        alert("❌ Geolocation not supported by your browser.");
        return;
      }
      getLocationBtn.textContent = "📍 Getting location...";
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const link = `https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
          const mapUrlEl = document.getElementById("mapUrl");
          if (mapUrlEl) mapUrlEl.value = link;
          getLocationBtn.textContent = "✅ Location Added";
        },
        (err) => {
          console.error("Geolocation error:", err);
          alert("⚠️ Please allow location access.");
          getLocationBtn.textContent = "📍 Use My Location";
        }
      );
    });
  }
});
// ...existing code...