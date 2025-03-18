let button = document.createElement('button');
button.textContent = 'About us';
button.id = "OGbutton";

button.addEventListener('click', function() {
    alert('Button was clicked!');
});

let button1 = document.createElement('button');
button1.textContent = "Your Wallet and The exchange";
button1.id = "button1";
button1.addEventListener('click', function(){
    alert('Button 1 was clicked!');
});
document.body.appendChild(button1);

document.body.appendChild(button);

let button2 = document.createElement('button');
button2.textContent = "Your Profile";
button2.id = "button2";
button2.addEventListener('click',function(){
    alert('Button 2 was pressed!');
})
document.body.appendChild(button2);
let img = document.createElement('img');
img.src = 'SmitEcoin.png';
img.alt = 'Our coin';

document.body.appendChild(img);

let button3 = document.createElement('button');
button3.id = "button3";
button3.textContent = "Log in    Sign Up"
button3.addEventListener('click', function(){
    alert('button3 clicked!')
});
document.body.appendChild(button3);

let buttonInvest = document.createElement('button');
buttonInvest.id = "buttonInvest";
buttonInvest.textContent = "Invest NOW";

buttonInvest.addEventListener('click', function(){
    alert('Invest NOW opened');
});
document.body.appendChild(buttonInvest);
