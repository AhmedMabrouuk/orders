// Import the functions from Firebase SDKs
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, set, onValue } from "firebase/database";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBL0rkLQhibArmSXXI4SGGHnsehugFlseo",
    authDomain: "orders-8dbea.firebaseapp.com",
    databaseURL: "https://orders-8dbea-default-rtdb.firebaseio.com",
    projectId: "orders-8dbea",
    storageBucket: "orders-8dbea.firebasestorage.app",
    messagingSenderId: "564619354178",
    appId: "1:564619354178:web:9d08279d6e0a71d1ac4ddb",
    measurementId: "G-D3M3C7NZTR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", function () {
    const prices = [5, 7, 4, 6, 8, 7, 6, 5, 7];
    let totals = Array(prices.length).fill(0);

    // Load orders from Firebase and update the UI
    function loadOrdersFromFirebase() {
        const ordersRef = ref(database, "orders/");
        onValue(ordersRef, (snapshot) => {
            const orders = snapshot.val();
            const tableBody = document.getElementById("allOrders");
            tableBody.innerHTML = ''; // Clear existing rows

            totals = Array(prices.length).fill(0); // Reset totals

            if (orders) {
                Object.values(orders).forEach(order => {
                    // Add order to the All Orders table
                    const row = document.createElement("tr");
                    row.innerHTML = `<td>${order.name}</td><td>${order.details}</td><td>$${order.totalPrice}</td>`;
                    tableBody.appendChild(row);

                    // Update totals
                    order.quantities.forEach((quantity, index) => {
                        totals[index] += quantity;
                    });
                });

                // Update the Final Order Summary table
                totals.forEach((total, index) => {
                    document.getElementById(`totalSandwich${index + 1}`).innerText = total;
                });
            }
        });
    }

    // Validate input
    function validateInput(userName, quantities) {
        if (!userName.trim()) {
            alert("Please enter your name.");
            return false;
        }
        if (!quantities.some(q => q > 0)) {
            alert("Please order at least one sandwich.");
            return false;
        }
        return true;
    }

    // Add an order to Firebase
    function addOrderToFirebase(userName, orderDetails, quantities, totalPrice) {
        const ordersRef = ref(database, "orders/");
        const newOrderRef = push(ordersRef);

        set(newOrderRef, {
            name: userName,
            details: orderDetails.join(", "),
            quantities: quantities,
            totalPrice: totalPrice
        });
    }

    // Add Order Function
    function addOrder() {
        const userName = document.getElementById("userName").value.trim();
        let quantities = [];
        let totalPrice = 0;
        let orderDetails = [];

        // Collect quantities
        for (let i = 1; i <= prices.length; i++) {
            const quantity = parseInt(document.getElementById(`sandwich${i}`).value || 0);
            quantities.push(quantity);
        }

        // Validate input
        if (!validateInput(userName, quantities)) return;

        // Calculate total price and order details
        for (let i = 0; i < quantities.length; i++) {
            if (quantities[i] > 0) {
                orderDetails.push(`Sandwich ${i + 1}: ${quantities[i]} x $${prices[i]}`);
            }
            totalPrice += quantities[i] * prices[i];
        }

        // Save the order to Firebase
        addOrderToFirebase(userName, orderDetails, quantities, totalPrice);

        // Reset the form
        document.getElementById("orderForm").reset();
        console.log("Order added successfully!");
    }

    // Reset Orders Function
    function resetOrders() {
        alert("This function needs manual deletion of orders in Firebase for now.");
    }

    // Attach event listeners
    document.getElementById("submitOrder").addEventListener("click", addOrder);
    document.getElementById("resetOrders").addEventListener("click", resetOrders);

    // Load orders from Firebase
    loadOrdersFromFirebase();
});


// document.addEventListener("DOMContentLoaded", function () {
//     const prices = [5, 7, 4, 6, 8, 7, 6, 5, 7];
//     let totals = JSON.parse(localStorage.getItem("totals")) || Array(prices.length).fill(0);
//     let allOrders = JSON.parse(localStorage.getItem("allOrders")) || [];

//     // Load stored orders and display them
//     function loadOrders() {
//         // Load totals into the summary
//         totals.forEach((total, index) => {
//             document.getElementById(`totalSandwich${index + 1}`).innerText = total;
//         });

//         // Load all previous orders into the table
//         const tableBody = document.getElementById("allOrders");
//         allOrders.forEach(order => {
//             const row = document.createElement("tr");
//             row.innerHTML = `<td>${order.name}</td><td>${order.details}</td><td>$${order.totalPrice}</td>`;
//             tableBody.appendChild(row);
//         });
//     }

//     // Save orders to localStorage
//     function saveOrders() {
//         localStorage.setItem("totals", JSON.stringify(totals));
//         localStorage.setItem("allOrders", JSON.stringify(allOrders));
//     }

//     // Validate input
//     function validateInput(userName, quantities) {
//         if (!userName.trim()) {
//             alert("Please enter your name.");
//             return false;
//         }
//         if (!quantities.some(q => q > 0)) {
//             alert("Please order at least one sandwich.");
//             return false;
//         }
//         return true;
//     }

//     // Add Order Function
//     function addOrder() {
//         const userName = document.getElementById("userName").value.trim();
//         let quantities = [];
//         let totalPrice = 0;
//         let orderDetails = [];

//         // Collect quantities
//         for (let i = 1; i <= prices.length; i++) {
//             const quantity = parseInt(document.getElementById(`sandwich${i}`).value || 0);
//             quantities.push(quantity);
//         }

//         // Validate input
//         if (!validateInput(userName, quantities)) return;

//         // Update totals and calculate the price
//         for (let i = 0; i < quantities.length; i++) {
//             totals[i] += quantities[i];
//             if (quantities[i] > 0) {
//                 orderDetails.push(`Sandwich ${i + 1}: ${quantities[i]} x $${prices[i]}`);
//             }
//             totalPrice += quantities[i] * prices[i];
//             document.getElementById(`totalSandwich${i + 1}`).innerText = totals[i];
//         }

//         // Add order to the allOrders table
//         const tableBody = document.getElementById("allOrders");
//         const row = document.createElement("tr");
//         row.innerHTML = `<td>${userName}</td><td>${orderDetails.join(", ")}</td><td>$${totalPrice}</td>`;
//         tableBody.appendChild(row);

//         // Save the order
//         allOrders.push({
//             name: userName,
//             details: orderDetails.join(", "),
//             totalPrice: totalPrice
//         });
//         saveOrders();

//         // Reset the form
//         document.getElementById("orderForm").reset();
//         console.log("Order added successfully!");
//     }

//     // Reset Orders Function
//     function resetOrders() {
//         totals = Array(prices.length).fill(0);
//         allOrders = [];
//         localStorage.removeItem("totals");
//         localStorage.removeItem("allOrders");

//         // Reset totals in the summary table
//         for (let i = 1; i <= prices.length; i++) {
//             document.getElementById(`totalSandwich${i}`).innerText = 0;
//         }
//         document.getElementById("allOrders").innerHTML = '';
//         console.log("Orders reset successfully!");
//     }

//     // Attach event listeners
//     document.getElementById("submitOrder").addEventListener("click", addOrder);
//     document.getElementById("resetOrders").addEventListener("click", resetOrders);

//     // Load orders from localStorage
//     loadOrders();
// });
