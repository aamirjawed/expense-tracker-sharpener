document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token"); // you must save this on login

  if (!token) return;

  fetch("http://localhost:3000/api/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.isPremium) {
        localStorage.setItem("isPremium", "true");
        document.getElementById("premium-banner").style.display = "block";
      } else {
        localStorage.removeItem("isPremium");
        document.getElementById("premium-banner").style.display = "none";
      }
    })
    .catch((err) => {
      console.error("Error checking premium status:", err);
    });
});
