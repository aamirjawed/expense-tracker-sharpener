const form = document.getElementById('form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
        alert("All fields are required");
        return; // ✅ Prevent further request if fields are empty
    }

    try {
        const response = await fetch('http://localhost:3000/user/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Login failed. Try again!");
            return;
        }

        // ✅ Redirect to expense page after successful login
        window.location.href = "/addExpense.html"; // Update path if needed
    } catch (err) {
        alert("Something went wrong"); // ✅ Corrected error message
    }
});
