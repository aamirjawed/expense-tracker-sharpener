const form = document.getElementById('form');
const expenseList = document.getElementById('list-expense');

// ✅ Helper to handle unauthorized/forbidden responses
function handleAuthError(response) {
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/login.html';
    return true;
  }
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');

  // ✅ Redirect immediately if no token
  if (!token) {
    window.location.href = '/login.html';
    return;
  }

  fetchExpense(token);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const amount = document.getElementById('amount').value.trim();
    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value;

    if (!amount || !description || !category) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/add-expense', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount, description, category })
      });

      const data = await response.json();

      if (!response.ok) {
        if (handleAuthError(response)) return;
        alert(data.message || "Something went wrong. Try again!");
        return;
      }

      alert("Expense added successfully");
      form.reset();
      fetchExpense(token);
    } catch (error) {
      console.error("Error while adding expense:", error);
      alert("Something went wrong");
    }
  });
});

async function fetchExpense(token) {
  try {
    const response = await fetch('http://localhost:3000/fetch-expense', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      if (handleAuthError(response)) return;
      alert(data.message || "Failed to load expenses");
      return;
    }

    expenseList.innerHTML = "";

    data.allExpenses.forEach(expense => {
      const li = document.createElement('li');
      li.textContent = `${expense.category} - ${expense.description} - ₹${expense.amount}`;
      expenseList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    alert("Something went wrong while loading expenses.");
  }
}
