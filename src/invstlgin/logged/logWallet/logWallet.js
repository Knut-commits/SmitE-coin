<<<<<<< HEAD
// Create and add images
=======
// Create and append logo image
>>>>>>> c2634c317a9c79e62b761d86abf1d77c0fe96e82
let img = document.createElement('img');
img.id = 'img';
img.src = 'SmitEcoin.png';
document.body.appendChild(img);
<<<<<<< HEAD
console.log(img.src);

=======

// Create and append crypto graph image
>>>>>>> c2634c317a9c79e62b761d86abf1d77c0fe96e82
let cryptoGraph = document.createElement('img');
cryptoGraph.id = 'cryptoGraph';
cryptoGraph.src = 'cryptograph.png';
document.body.appendChild(cryptoGraph);

<<<<<<< HEAD
// Create and add buttons
let button = document.createElement('button');
button.textContent = 'About us';
button.id = "OGbutton";
document.body.appendChild(button);
=======
// Create buttons
const buttons = [
    { id: "OGbutton", text: "About us" },
    { id: "button1", text: "Your Wallet and The exchange" },
    { id: "button2", text: "Your Profile" },
    { id: "button3", text: "Back to main" },
    { id: "button4", text: "Buy SmitE Coin!" },
    { id: "button5", text: "Sell SmitE Coin!" }
];
>>>>>>> c2634c317a9c79e62b761d86abf1d77c0fe96e82

buttons.forEach(({ id, text }) => {
    let button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    document.body.appendChild(button);
});

<<<<<<< HEAD
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
=======
// Navigation functionality
document.getElementById("OGbutton").addEventListener('click', function (event) {
    event.preventDefault();
    document.body.classList.add("fade-out");
>>>>>>> c2634c317a9c79e62b761d86abf1d77c0fe96e82
    setTimeout(() => {
        window.location.href = "../logaboutUs/logabtUs.html";
    }, 500);
});

document.getElementById("button1").addEventListener('click', function () {
    alert("You're already here!");
});

document.getElementById("button2").addEventListener('click', function (event) {
    event.preventDefault();
    document.body.classList.add("fade-out");
    setTimeout(() => {
        window.location.href = "../loggedProfile/logProf.html";
    }, 500);
});

document.getElementById("button3").addEventListener('click', function (event) {
    event.preventDefault();
    document.body.classList.add("fade-out");
    setTimeout(() => {
        window.location.href = "../logindex.html";
    }, 500);
});

<<<<<<< HEAD
// Initialize numberOfCoins if it doesn't exist
if (localStorage.getItem("numberOfCoins") === null) {
    localStorage.setItem("numberOfCoins", "0"); // Stored as string
=======
// Display current coin balance
if (localStorage.getItem("numberOfCoins") === null) {
    localStorage.setItem("numberOfCoins", "0");
>>>>>>> c2634c317a9c79e62b761d86abf1d77c0fe96e82
}
let savedCoin = localStorage.getItem("numberOfCoins");
console.log("Current Coin: ", savedCoin);

<<<<<<< HEAD
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
=======
let savedCoin = localStorage.getItem("numberOfCoins");

let cCoin = document.createElement('div');
cCoin.id = "currentCoin";
cCoin.textContent = "You currently have: " + savedCoin;
document.body.appendChild(cCoin);

// BUY functionality
document.getElementById("button4").addEventListener('click', function (event) {
>>>>>>> c2634c317a9c79e62b761d86abf1d77c0fe96e82
    event.preventDefault();
    createPopup("buy");
});

<<<<<<< HEAD
    // Create overlay and popup for buying coins
=======
// SELL functionality
document.getElementById("button5").addEventListener('click', function (event) {
    event.preventDefault();
    createPopup("sell");
});

// Popup creator function for buy/sell
function createPopup(type) {
>>>>>>> c2634c317a9c79e62b761d86abf1d77c0fe96e82
    let overlay = document.createElement("div");
    overlay.classList.add("popup-overlay");

    let popup = document.createElement("div");
    popup.classList.add("popup-message");
    popup.innerHTML = `
        <p>Enter an amount:</p>
        <input type="number" id="${type}AmountInput" placeholder="Enter amount" />
        <button id="confirm${type}Amount">Confirm</button>
        <button id="closePopup">Close</button>
    `;
    overlay.appendChild(popup);
    document.body.appendChild(overlay);

<<<<<<< HEAD
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
=======
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) overlay.remove();
    });

    document.getElementById("closePopup").addEventListener("click", function () {
        overlay.remove();
    });

    document.getElementById(`confirm${type}Amount`).addEventListener("click", function () {
        let input = document.getElementById(`${type}AmountInput`).value;
        let enteredAmount = Number(input);
        let current = Number(localStorage.getItem("numberOfCoins"));

        if (!enteredAmount || enteredAmount <= 0) {
            alert("Please enter a valid amount.");
            overlay.remove();
            return;
        }

        if (enteredAmount > 100000) {
            alert("You cannot " + type + " that many coins in 1 sitting! MAX: 100,000");
            overlay.remove();
            return;
        }

        if (type === "buy") {
            let newTotal = current + enteredAmount;
            localStorage.setItem("numberOfCoins", newTotal);
            alert("You have successfully bought " + enteredAmount + " SmitE coin!");
        } else if (type === "sell") {
            if (enteredAmount > current) {
                alert("You don't have that many coins!");
                overlay.remove();
                return;
            }
            let newTotal = current - enteredAmount;
            localStorage.setItem("numberOfCoins", newTotal);
            alert("You have successfully sold " + enteredAmount + " SmitE coin!");
        }

        overlay.remove();
>>>>>>> c2634c317a9c79e62b761d86abf1d77c0fe96e82
        location.reload();
    });
}
