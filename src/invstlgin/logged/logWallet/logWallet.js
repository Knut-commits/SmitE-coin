// Create and append logo image
let img = document.createElement('img');
img.id = 'img';
img.src = 'SmitEcoin.png';
document.body.appendChild(img);

// Create and append crypto graph image
let cryptoGraph = document.createElement('img');
cryptoGraph.id = 'cryptoGraph';
cryptoGraph.src = 'cryptograph.png';
document.body.appendChild(cryptoGraph);

// Create buttons
const buttons = [
    { id: "OGbutton", text: "About us" },
    { id: "button1", text: "Your Wallet and The exchange" },
    { id: "button2", text: "Your Profile" },
    { id: "button3", text: "Back to main" },
    { id: "button4", text: "Buy SmitE Coin!" },
    { id: "button5", text: "Sell SmitE Coin!" }
];

buttons.forEach(({ id, text }) => {
    let button = document.createElement('button');
    button.id = id;
    button.textContent = text;
    document.body.appendChild(button);
});

// Navigation functionality
document.getElementById("OGbutton").addEventListener('click', function (event) {
    event.preventDefault();
    document.body.classList.add("fade-out");
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

// Display current coin balance
if (localStorage.getItem("numberOfCoins") === null) {
    localStorage.setItem("numberOfCoins", "0");
}

let savedCoin = localStorage.getItem("numberOfCoins");

let cCoin = document.createElement('div');
cCoin.id = "currentCoin";
cCoin.textContent = "You currently have: " + savedCoin;
document.body.appendChild(cCoin);

// BUY functionality
document.getElementById("button4").addEventListener('click', function (event) {
    event.preventDefault();
    createPopup("buy");
});

// SELL functionality
document.getElementById("button5").addEventListener('click', function (event) {
    event.preventDefault();
    createPopup("sell");
});

// Popup creator function for buy/sell
function createPopup(type) {
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
        location.reload();
    });
}
