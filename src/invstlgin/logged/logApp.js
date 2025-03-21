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
button3.textContent = "Hi Investor!";

document.body.appendChild(button3);


let img = document.createElement('img');
img.src = 'SmitEcoin.png';
img.alt = 'Our coin';
document.body.appendChild(img);


let buttonInvest = document.createElement('button');
buttonInvest.id = "buttonInvest";
buttonInvest.textContent = "Check your wallet";
document.body.appendChild(buttonInvest);


button.addEventListener('click', function(event) {
    event.preventDefault(); 
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "logaboutUs/logabtUs.html";
    }, 500);
});
button1.addEventListener('click', function(event) {
    event.preventDefault(); 
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "logWallet/logWallet.html";
    }, 500);
});
button2.addEventListener('click', function(event) {
    event.preventDefault(); 
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "invstlgin/lgn.html";
    }, 500);
});
button3.addEventListener('click', function(event) {
    event.preventDefault(); 
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "invstlgin/lgn.html";
    }, 500);
});
buttonInvest.addEventListener('click', function(event) {
    event.preventDefault(); 
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "logWallet/logWallet.html";
    }, 500);
});




