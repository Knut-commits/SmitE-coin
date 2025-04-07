// Create and add images
let img = document.createElement('img');
img.id = 'img';
img.src = 'SmitEcoin.png';
document.body.appendChild(img);
console.log(img.src);

let cryptoGraph = document.createElement('img');
cryptoGraph.id = 'cryptoGraph';
cryptoGraph.src = 'cryptograph.png';
document.body.appendChild(cryptoGraph);

// Create and add buttons
let button = document.createElement('button');
button.textContent = 'About us';
button.id = "OGbutton";
document.body.appendChild(button);

let button1 = document.createElement('button');
button1.textContent = "Your Wallet and The exchange";
button1.id = "button1";
document.body.appendChild(button1);

let button2 = document.createElement('button');
button2.textContent = "Your Profile";
button2.id = "button2";
document.body.appendChild(button2);

let button3 = document.createElement('button');
button3.id = "button3";
button3.textContent = "Back to main";
document.body.appendChild(button3);

let button4 = document.createElement('button');
button4.id = "button4";
button4.textContent = "Buy SmitE Coin!";
document.body.appendChild(button4);

let button5 = document.createElement('button');
button5.id = "button5";
button5.textContent = "Sell SmitE Coin!";
document.body.appendChild(button5);

// Toggle popup function (not used below, but available)
function togglePopup() {
    let popup = document.getElementById("popup");
    popup.style.display = (popup.style.display === "block") ? "none" : "block";
}

// Navigation button event listeners
button.addEventListener('click', function(event) {
    event.preventDefault(); 
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "../logaboutUs/logabtUs.html";
    }, 500);
});

button1.addEventListener('click', function(event) {
    alert("You're already here!");
});

button2.addEventListener('click', function(event) {
    event.preventDefault(); 
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "../loggedProfile/logProf.html";
    }, 500);
});

button3.addEventListener('click', function(event) {
    event.preventDefault(); 
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "../logindex.html";
    }, 500);
});

// Initialize numberOfCoins if it doesn't exist
if (localStorage.getItem("numberOfCoins") === null) {
    localStorage.setItem("numberOfCoins", "0"); // Stored as string
}
let savedCoin = localStorage.getItem("numberOfCoins");
console.log("Current Coin: ", savedCoin);

// Display current coin count
if (savedCoin !== null) {  
    let cCoin = document.createElement('div');
    cCoin.id = "currentCoin"; 
    cCoin.textContent = "You currently have: " + savedCoin;
    document.body.appendChild(cCoin);
} else {
    console.log("didn't work");
}

// Buy SmitE Coin button event listener
button4.addEventListener('click', function(event) {
    event.preventDefault();

    // Create overlay and popup for buying coins
    let overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");

    let popup = document.createElement("div");
    popup.classList.add("popup-message");
    popup.innerHTML = `
        <p>Enter an amount:</p>
        <input type="number" id="buyAmountInput" placeholder="Enter amount" />
        <button id="confirmBuyAmount">Confirm</button>
        <button id="closePopup">Close</button>
    `;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Close popup if clicking outside or on the Close button
    overlay.addEventListener("click", function(event) {
        if (event.target === overlay) {
            overlay.remove();
        }
    });
    document.getElementById("closePopup").addEventListener("click", function() {
        overlay.remove();
    });

    document.getElementById("confirmBuyAmount").addEventListener("click", function() {
        let enteredAmount = Number(document.getElementById("buyAmountInput").value);
        if (!enteredAmount || enteredAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        if (enteredAmount > 100000) {
            alert("You cannot buy that many coins in 1 sitting! MAX:100,000");
            return;
        }
        let currentCoins = Number(localStorage.getItem("numberOfCoins"));
        let newTotal = currentCoins + enteredAmount;
        localStorage.setItem("numberOfCoins", newTotal);
        alert("You have successfully bought " + enteredAmount + " SmitE coin" + (enteredAmount > 1 ? "s" : "") + "!");
        location.reload();
    });
});

// Sell SmitE Coin button event listener
button5.addEventListener('click', function(event) {
    event.preventDefault();

    // Create overlay and popup for selling coins
    let overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");

    let popup = document.createElement("div");
    popup.classList.add("popup-message");
    popup.innerHTML = `
        <p>Enter an amount:</p>
        <input type="number" id="sellAmountInput" placeholder="Enter amount" />
        <button id="confirmSellAmount">Confirm</button>
        <button id="closePopup">Close</button>
    `;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Close popup if clicking outside or on the Close button
    overlay.addEventListener("click", function(event) {
        if (event.target === overlay) {
            overlay.remove();
        }
    });
    document.getElementById("closePopup").addEventListener("click", function() {
        overlay.remove();
    });

    document.getElementById("confirmSellAmount").addEventListener("click", function() {
        let enteredAmount = Number(document.getElementById("sellAmountInput").value);
        if (!enteredAmount || enteredAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        if (enteredAmount > 100000) {
            alert("You cannot sell that many coins in 1 sitting! MAX:100,000");
            return;
        }
        let currentCoins = Number(localStorage.getItem("numberOfCoins"));
        if (enteredAmount > currentCoins) {
            alert("You don't have that many coins!");
            return;
        }
        let newTotal = currentCoins - enteredAmount;
        localStorage.setItem("numberOfCoins", newTotal);
        alert("You have successfully sold " + enteredAmount + " SmitE coin" + (enteredAmount > 1 ? "s" : "") + "!");
        location.reload();
    });
});
