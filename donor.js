document.getElementById("verifyBtn").addEventListener("click", () => {
  const name = document.getElementById("donorName").value.trim();
  const email = document.getElementById("donorEmail").value.trim();
  const phone = document.getElementById("donorPhone").value.trim();

  if (!name || !email || !phone) {
    alert("Please fill all fields to verify.");
    return;
  }

  // Save donor info to localStorage
  localStorage.setItem("donorName", name);
  localStorage.setItem("donorEmail", email);
  localStorage.setItem("donorPhone", phone);

  document.getElementById("verifySection").style.display = "none";
  document.getElementById("actionSection").style.display = "block";
  document.getElementById("donorDisplayName").textContent = name;
});

document.getElementById("donateBtn").addEventListener("click", () => {
  document.getElementById("actionSection").style.display = "none";
  document.getElementById("donationForm").style.display = "block";
});

document.getElementById("viewDonationsBtn").addEventListener("click", () => {
  window.location.href = "myDonations.html";
});

document.getElementById("backBtn").addEventListener("click", () => {
  document.getElementById("donationForm").style.display = "none";
  document.getElementById("actionSection").style.display = "block";
});
