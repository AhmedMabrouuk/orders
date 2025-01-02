document.addEventListener("DOMContentLoaded", function () {
    // Prices of sandwiches
    const prices = [5, 7, 4, 6, 8, 7, 6, 5, 7];

    // Order totals
    let totals = Array(prices.length).fill(0);

    // Add Order Function
    function addOrder() {
        let quantities = [];
        let receiptText = "Receipt:\n";
        let totalPrice = 0;

        // Collect quantities
        for (let i = 1; i <= prices.length; i++) {
            quantities.push(parseInt(document.getElementById(`sandwich${i}`).value || 0));
        }

        // Update totals and receipt
        for (let i = 0; i < quantities.length; i++) {
            totals[i] += quantities[i];
            receiptText += `Sandwich ${i + 1}: ${quantities[i]} x $${prices[i]} = $${quantities[i] * prices[i]}\n`;
            totalPrice += quantities[i] * prices[i];
            document.getElementById(`totalSandwich${i + 1}`).innerText = totals[i];
        }

        receiptText += `\nTotal Price: $${totalPrice}`;
        document.getElementById("receipt").innerText = receiptText;

        // Clear form after submission
        document.getElementById("orderForm").reset();
    }

    // Reset Orders Function
    function resetOrders() {
        totals = Array(prices.length).fill(0);
        for (let i = 1; i <= prices.length; i++) {
            document.getElementById(`totalSandwich${i}`).innerText = 0;
        }
        document.getElementById("receipt").innerText = '';
    }

    // Attach event listeners to buttons
    document.getElementById("submitOrder").addEventListener("click", addOrder);
    document.getElementById("resetOrders").addEventListener("click", resetOrders);
});


// var emailInput = document.getElementById("email");
// var passwordInput = document.getElementById("password");

// let usersContainer = [] ;
// /* update the page table with the localstorage content after reopning the page every time (if needed) */
// if (localStorage.getItem("myUsers") != null)
// {
//     usersContainer = JSON.parse(localStorage.getItem("myUsers"));
//     //displayProduct();
// }

// function signup()
// {
//     if(emailInput.value &&  passwordInput.value)
//     {
//     }
//     else
//     {
//         alert("you must fill all fields");
//         return;
//     }
//     var user ={//object
//         email:emailInput.value,
//         password:passwordInput.value,
//     }

//     /* ensure that the user is not registered before adding to the storage   */
//     for (let i =0 ; i<usersContainer.length; i++)
//     {
//         if(user.email == usersContainer[i].email)
//         {
//             alert("user already exists");
//             return;
//         }
//     }
//     usersContainer.push(user);
//     localStorage.setItem("myUsers",JSON.stringify(usersContainer));
//     console.log(usersContainer);
  
//         clearForm();
// }
// function signin()
// {
//     if(emailInput.value &&  passwordInput.value)
//     {
//     }
//     else
//     {
//         alert("you must fill all fields");
//         return;
//     }

//     let user_found = false;
//     /* ensure that the user is not registered before adding to the storage   */
//     for (let i =0 ; i<usersContainer.length; i++)
//     {
//         if(emailInput.value == usersContainer[i].email && passwordInput.value == usersContainer[i].password)
//         {
            
//             alert("welcome back !");
//             /* open some features */
//             user_found = true ;
//             return;
//         }
//     }
//     if ( user_found == false ){
//         alert("user not found ! Please  sign up ");
//     }
  
//         clearForm();
// }

// function clearForm()
// {
//     emailInput.value = "";
//     passwordInput.value ="";
// }
