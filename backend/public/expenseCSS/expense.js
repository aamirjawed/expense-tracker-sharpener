const form = document.getElementById('form');
const expenseList = document.getElementById('list-expense');


document.addEventListener('DOMContentLoaded', fetchExpense);

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
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ amount, description, category })
    });
    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Something went wrong. Try again!");
      return;
    }

    alert("Expense added successfully");
    form.reset();
    fetchExpense();
  } catch (error) {
    console.error("Error while adding expense:", error);
    alert("Something went wrong");
  }
});

async function fetchExpense() {
  try {
    const response = await fetch('http://localhost:3000/fetch-expense');
    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Failed to load expenses");
      return;
    }

    
    expenseList.innerHTML = "";
    data.expenses.forEach(expense => {
      const li = document.createElement('li');
      li.textContent = `${expense.description} - ₹${expense.amount} [${expense.category}]`;
      expenseList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    alert("Something went wrong while loading expenses.");
  }
}
