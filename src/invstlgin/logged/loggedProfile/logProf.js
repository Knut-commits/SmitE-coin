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


let savedImg = localStorage.getItem("selectedProfilePic");

console.log("Saved Image:", savedImg);  // Check the value

if (savedImg) {
    let img = document.createElement('img');
    img.id = "img";
    img.src = savedImg;
    img.style.width = '300px'; 
    img.style.height = '300px'; 
    img.style.borderRadius = '50%';  
    document.body.appendChild(img);
} else {
    console.log("No image selected or not stored in localStorage.");
}

let savedUser = localStorage.getItem("username");

console.log("Username:", savedUser);  // Check the value

if (savedUser) {
    let user = document.createElement('div');
    user.id = "user"; 
    user.textContent = savedUser;
    document.body.appendChild(user);
} else {
    console.log("No image selected or not stored in localStorage.");
}

let savedEmail = localStorage.getItem("email");

console.log("Email:", savedEmail);  // Check the value

if (savedEmail) {
    let email = document.createElement('div');
    email.id = "email"; 
    email.textContent = savedEmail;
    document.body.appendChild(email);
} else {
    console.log("No image selected or not stored in localStorage.");
}





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

