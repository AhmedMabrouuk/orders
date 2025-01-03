const sandwichNames = [
  "Cheese", "Turkey", "Chicken", "Veggie", "Beef", 
  "Tuna", "Ham", "Egg", "Salami"
];
const prices = [5, 6, 7, 4, 8, 6, 5, 3, 7];
let totals = JSON.parse(localStorage.getItem("totals")) || Array(sandwichNames.length).fill(0);
let individualOrders = JSON.parse(localStorage.getItem("individualOrders")) || [];

// Populate the sandwich table
const sandwichTable = document.getElementById("sandwichTable");
sandwichNames.forEach((name, index) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${name}</td>
    <td>${prices[index]}</td>
    <td><input type="number" id="quantity${index}" min="0" value="0"></td>
  `;
  sandwichTable.appendChild(row);
});

// Populate totals table
function updateTotalsTable() {
  const totalOrders = document.getElementById("totalOrders");
  totalOrders.innerHTML = "";
  totals.forEach((total, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${sandwichNames[index]}</td><td>${total}</td>`;
    totalOrders.appendChild(row);
  });
}

// Populate individual orders table
function updateIndividualOrdersTable() {
  const individualOrdersTable = document.getElementById("individualOrders");
  individualOrdersTable.innerHTML = "";
  individualOrders.forEach(order => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${order.name}</td><td>${order.details}</td>`;
    individualOrdersTable.appendChild(row);
  });
}

// Submit order
document.getElementById("submitOrder").addEventListener("click", () => {
  const userName = document.getElementById("userName").value.trim();
  if (!userName) {
    alert("Please enter your name.");
    return;
  }

  const quantities = sandwichNames.map((_, index) => 
    parseInt(document.getElementById(`quantity${index}`).value) || 0
  );

  // Update totals
  totals = totals.map((total, index) => total + quantities[index]);
  localStorage.setItem("totals", JSON.stringify(totals));

  // Update individual orders
  const details = quantities
    .map((qty, index) => (qty > 0 ? `${qty} x ${sandwichNames[index]}` : ""))
    .filter(order => order)
    .join(", ");
  individualOrders.push({ name: userName, details });
  localStorage.setItem("individualOrders", JSON.stringify(individualOrders));

  updateTotalsTable();
  updateIndividualOrdersTable();
});

// Reset orders
document.getElementById("resetOrders").addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all orders?")) {
    totals = Array(sandwichNames.length).fill(0);
    individualOrders = [];
    localStorage.removeItem("totals");
    localStorage.removeItem("individualOrders");
    updateTotalsTable();
    updateIndividualOrdersTable();
  }
});

// Initialize tables
updateTotalsTable();
updateIndividualOrdersTable();
