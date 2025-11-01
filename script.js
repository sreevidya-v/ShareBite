<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD18oQ4ioUcSAPsTzmJZpb_f2eioqukMK4",
    authDomain: "sharebite-f3589.firebaseapp.com",
    databaseURL: "https://sharebite-f3589-default-rtdb.firebaseio.com",
    projectId: "sharebite-f3589",
    storageBucket: "sharebite-f3589.firebasestorage.app",
    messagingSenderId: "17176092072",
    appId: "1:17176092072:web:9f38f2b4c9a8217287d19d",
    measurementId: "G-9ZWLB7KMR2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>

document.getElementById("verifyBtn").addEventListener("click", () => {
  const name = document.getElementById("donorName").value.trim();
  const email = document.getElementById("donorEmail").value.trim();

  if (name && email) {
    alert(`✅ Verified successfully!\nWelcome, ${name}!`);
    document.getElementById("verifySection").style.display = "none";
    document.getElementById("donationForm").style.display = "block";
  } else {
    alert("⚠️ Please enter both name and email to continue.");
  }
});
document.getElementById("donationForm").addEventListener("submit", (e) => {
  e.preventDefault();
  // Later we’ll store data in Firebase here
  alert("✅ Donation submitted successfully!");
  window.location.href = "thankyou.html"; // Redirect after submission
});


// NGO Dashboard sample data
const sampleDonations = [
  {
    name: "Suresh Kumar",
    email: "suresh@example.com",
    location: "Koramangala, Bangalore",
    address: "12, 5th Cross, Koramangala",
    timePrepared: "18:30",
    quantity: "15",
    foodType: "Vegetarian",
    mapUrl: "https://goo.gl/maps/example1",
  },
  {
    name: "Priya Nair",
    email: "priya@example.com",
    location: "BTM Layout",
    address: "45, Lake Road, BTM",
    timePrepared: "19:00",
    quantity: "10",
    foodType: "Vegan",
    mapUrl: "https://goo.gl/maps/example2",
  },
];

// Populate donation cards on receiver page
const donationsContainer = document.getElementById("donationsContainer");
if (donationsContainer) {
  sampleDonations.forEach((donation) => {
    const card = document.createElement("div");
    card.classList.add("donation-card");

    card.innerHTML = `
      <h3>🍱 Donor: ${donation.name}</h3>
      <p><strong>📍 Location:</strong> ${donation.location}</p>
      <p><strong>🏠 Address:</strong> ${donation.address}</p>
      <p><strong>🕒 Time:</strong> ${donation.timePrepared}</p>
      <p><strong>👥 Quantity:</strong> ${donation.quantity} people</p>
      <p><strong>🍛 Type:</strong> ${donation.foodType}</p>
      <div class="card-buttons">
        <a href="${donation.mapUrl}" target="_blank">🌐 View Map</a>
        <a href="mailto:${donation.email}">✉️ Contact</a>
      </div>
    `;

    donationsContainer.appendChild(card);
  });
}
