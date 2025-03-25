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

let img = document.createElement('img');
img.id = "img";
img.src = 'pfp1.jpg';
document.body.appendChild(img);




button.addEventListener('click', function(event) {
    event.preventDefault(); 
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "../logaboutUs/logabtUs.html";
    }, 500);
});

button1.addEventListener('click', function(event) {
    event.preventDefault();
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "../logWallet/logWallet.html";
    }, 500);
});

button2.addEventListener('click', function() {
alert("You're already here!");
});

button3.addEventListener('click', function(event) {
    event.preventDefault(); 
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "../logindex.html";
    }, 500);
});

