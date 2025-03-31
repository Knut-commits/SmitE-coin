let img = document.createElement('img');
img.id = 'img';
img.src = 'SmitEcoin.png';
document.body.appendChild(img);
console.log(img.src);


let cryptoGraph = document.createElement('img');
cryptoGraph.id = 'cryptoGraph';
cryptoGraph.src = 'cryptograph.png';
document.body.appendChild(cryptoGraph);

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

function togglePopup() {
    let popup = document.getElementById("popup");
    popup.style.display = (popup.style.display === "block") ? "none" : "block";
}

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
    localStorage.setItem("numberOfCoins", "0"); // Store as string
}

let savedCoin = localStorage.getItem("numberOfCoins"); // Always returns a string

console.log("Current Coin: ", savedCoin);  // Check the value

// Check if savedCoin is not null (it's always a string, even if "0")
if (savedCoin !== null) {  
    let cCoin = document.createElement('div');
    cCoin.id = "currentCoin"; 
    cCoin.textContent = "You currently have: " + savedCoin;
    document.body.appendChild(cCoin);
} else {
    console.log("didn't work");
}

button4.addEventListener('click', function(event) {
    event.preventDefault();

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

    overlay.addEventListener("click", function(event) {
        if (event.target === overlay) {
            overlay.remove(); 
        }
    });

    document.getElementById("closePopup").addEventListener("click", function() {
        overlay.remove();
    });



    document.getElementById("confirmBuyAmount").addEventListener("click", function() {
        let enteredAmount = document.getElementById("buyAmountInput").value;
        if (enteredAmount && enteredAmount > 0) {
            if(enteredAmount && enteredAmount <= 100000){
            let temp = localStorage.getItem("numberOfCoins");
            let tempEntered = Number(enteredAmount) + Number(temp);
            localStorage.setItem("numberOfCoins", tempEntered);
            alert("You have successfully bought " + enteredAmount + " SmitE coin!");
            location.reload();
        }
        else{
            alert("You cannot buy that many coins in 1 sitting! MAX:100,000");
        }
        } else {
            alert("Please enter a valid amount.");
            location.reload();
        }
        
        overlay.remove();
    });
});

button5.addEventListener('click', function(event) {
    event.preventDefault();

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

    overlay.addEventListener("click", function(event) {
        if (event.target === overlay) {
            overlay.remove(); 
        }
    });

    document.getElementById("closePopup").addEventListener("click", function() {
        overlay.remove();
    });

    document.getElementById("confirmSellAmount").addEventListener("click", function() {
        let enteredAmount = document.getElementById("sellAmountInput").value;
        if (enteredAmount && enteredAmount > 0) { 
            let temp1 = localStorage.getItem("numberOfCoins");
            temp2 = Number(temp1) - Number(enteredAmount);
            if(temp2 >=0){
                if(enteredAmount && enteredAmount >100000){
                    alert("You cannot sell that many coins in 1 sitting! MAX:100,000")
                location.reload();
                }
                    else{
                        alert("You have successfully sold " + enteredAmount + " SmitE coin!");
                localStorage.setItem("numberOfCoins",temp2);
                location.reload();
                }
                    
            }
            else{
                alert("You don't have that many coins!");
            }
            
        }

            
        else {
            alert("Please enter a valid amount.");
        }
        
        overlay.remove();
    });
});
