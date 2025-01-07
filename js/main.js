//     // Import Firebase SDK
//     import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
//     import { getDatabase, ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";


// document.addEventListener("DOMContentLoaded", function () {

//     // Firebase configuration
//     const firebaseConfig = {
//         apiKey: "AIzaSyBL0rkLQhibArmSXXI4SGGHnsehugFlseo",
//         authDomain: "orders-8dbea.firebaseapp.com",
//         databaseURL: "https://orders-8dbea-default-rtdb.firebaseio.com",
//         projectId: "orders-8dbea",
//         storageBucket: "orders-8dbea.firebasestorage.app",
//         messagingSenderId: "564619354178",
//         appId: "1:564619354178:web:9d08279d6e0a71d1ac4ddb",
//         measurementId: "G-D3M3C7NZTR"
//     };

//     // Initialize Firebase
//     const app = initializeApp(firebaseConfig);
//     const database = getDatabase(app);

//     const prices = [5, 7, 4, 6, 8, 7, 6, 5, 7];
//     const totalsRef = ref(database, "totals");
//     const ordersRef = ref(database, "orders");

//     // Load orders from Firebase and display them
//     function loadOrders() {
//         // Load totals
//         onValue(totalsRef, (snapshot) => {
//             const totals = snapshot.val() || Array(prices.length).fill(0);
//             totals.forEach((total, index) => {
//                 document.getElementById(`totalSandwich${index + 1}`).innerText = total;
//             });
//         });

//         // Load orders
//         onValue(ordersRef, (snapshot) => {
//             const data = snapshot.val() || [];
//             const tableBody = document.getElementById("allOrders");
//             tableBody.innerHTML = ""; // Clear previous rows

//             for (const key in data) {
//                 const order = data[key];
//                 const row = document.createElement("tr");
//                 row.innerHTML = `<td>${order.name}</td><td>${order.details}</td><td>$${order.totalPrice}</td>`;
//                 tableBody.appendChild(row);
//             }
//         });
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

//         // Calculate totals and order details
//         for (let i = 0; i < quantities.length; i++) {
//             if (quantities[i] > 0) {
//                 orderDetails.push(`Sandwich ${i + 1}: ${quantities[i]} x $${prices[i]}`);
//                 totalPrice += quantities[i] * prices[i];
//             }
//         }

//         const order = {
//             name: userName,
//             details: orderDetails.join(", "),
//             totalPrice,
//         };

//         // Update totals in Firebase
//         updateTotals(quantities);

//         // Save order to Firebase
//         const newOrderRef = push(ordersRef);
//         set(newOrderRef, order).then(() => {
//             console.log("Order added to Firebase!");
//         });

//         // Reset the form
//         document.getElementById("orderForm").reset();
//     }

//     // Update Totals in Firebase
//     function updateTotals(quantities) {
//         onValue(totalsRef, (snapshot) => {
//             const currentTotals = snapshot.val() || Array(prices.length).fill(0);
//             const newTotals = currentTotals.map((total, index) => total + quantities[index]);
//             set(totalsRef, newTotals).then(() => {
//                 console.log("Totals updated in Firebase!");
//             });
//         }, { onlyOnce: true });
//     }

//     // Reset Orders Function
//     function resetOrders() {
//         // Clear totals and orders in Firebase
//         set(totalsRef, Array(prices.length).fill(0));
//         set(ordersRef, null);

//         // Clear UI
//         for (let i = 1; i <= prices.length; i++) {
//             document.getElementById(`totalSandwich${i}`).innerText = 0;
//         }
//         document.getElementById("allOrders").innerHTML = "";
//         console.log("Orders reset successfully!");
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

//     // Attach event listeners
//     document.getElementById("submitOrder").addEventListener("click", addOrder);
//     document.getElementById("resetOrders").addEventListener("click", resetOrders);

//     // Load orders from Firebase
//     loadOrders();
// });



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


// Firebase initialization (replace the config object with your Firebase credentials)


const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", function () {
    const prices = [5, 7, 4, 6, 8, 7, 6, 5, 7];
    let totals = [];
    let allOrders = [];

    // Load stored orders and display them
    async function loadOrders() {
        try {
            // Fetch totals from Firestore
            const totalsDoc = await getDoc(doc(db, "orders", "totals"));
            if (totalsDoc.exists()) {
                totals = totalsDoc.data().values;
            } else {
                totals = Array(prices.length).fill(0);
            }

            // Update totals in the UI
            totals.forEach((total, index) => {
                document.getElementById(`totalSandwich${index + 1}`).innerText = total;
            });

            // Fetch allOrders from Firestore
            const ordersSnapshot = await getDocs(collection(db, "allOrders"));
            ordersSnapshot.forEach(doc => {
                const order = doc.data();
                allOrders.push(order);

                const row = document.createElement("tr");
                row.innerHTML = `<td>${order.name}</td><td>${order.details}</td><td>$${order.totalPrice}</td>`;
                document.getElementById("allOrders").appendChild(row);
            });
        } catch (error) {
            console.error("Error loading orders:", error);
        }
    }

    // Save totals to Firestore
    async function saveTotals() {
        try {
            await setDoc(doc(db, "orders", "totals"), { values: totals });
        } catch (error) {
            console.error("Error saving totals:", error);
        }
    }

    // Save an order to Firestore
    async function saveOrder(order) {
        try {
            await addDoc(collection(db, "allOrders"), order);
        } catch (error) {
            console.error("Error saving order:", error);
        }
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

    // Add Order Function
    async function addOrder() {
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

        // Update totals and calculate the price
        for (let i = 0; i < quantities.length; i++) {
            totals[i] += quantities[i];
            if (quantities[i] > 0) {
                orderDetails.push(`Sandwich ${i + 1}: ${quantities[i]} x $${prices[i]}`);
            }
            totalPrice += quantities[i] * prices[i];
            document.getElementById(`totalSandwich${i + 1}`).innerText = totals[i];
        }

        // Add order to the allOrders table
        const row = document.createElement("tr");
        row.innerHTML = `<td>${userName}</td><td>${orderDetails.join(", ")}</td><td>$${totalPrice}</td>`;
        document.getElementById("allOrders").appendChild(row);

        // Save the order
        const order = { name: userName, details: orderDetails.join(", "), totalPrice: totalPrice };
        allOrders.push(order);

        await saveTotals();
        await saveOrder(order);

        // Reset the form
        document.getElementById("orderForm").reset();
        console.log("Order added successfully!");
    }

    // Reset Orders Function
    async function resetOrders() {
        totals = Array(prices.length).fill(0);
        allOrders = [];

        // Delete Firestore documents
        try {
            await setDoc(doc(db, "orders", "totals"), { values: totals });

            const ordersSnapshot = await getDocs(collection(db, "allOrders"));
            ordersSnapshot.forEach(async (docSnapshot) => {
                await deleteDoc(doc(db, "allOrders", docSnapshot.id));
            });

            // Reset UI
            for (let i = 1; i <= prices.length; i++) {
                document.getElementById(`totalSandwich${i}`).innerText = 0;
            }
            document.getElementById("allOrders").innerHTML = '';
            console.log("Orders reset successfully!");
        } catch (error) {
            console.error("Error resetting orders:", error);
        }
    }

    // Attach event listeners
    document.getElementById("submitOrder").addEventListener("click", addOrder);
    document.getElementById("resetOrders").addEventListener("click", resetOrders);

    // Load orders from Firestore
    loadOrders();
});
