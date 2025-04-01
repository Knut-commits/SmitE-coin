let profileContainer = document.createElement('div');
document.body.appendChild(profileContainer);

let savedImg = localStorage.getItem("selectedProfilePic");
if (savedImg) {
    let img = document.createElement('img');
    img.src = savedImg;
    img.style.width = '300px'; 
    img.style.height = '300px'; 
    img.style.borderRadius = '50%';  
    profileContainer.appendChild(img);
}

let savedUser = localStorage.getItem("username");
if (savedUser) {
    let user = document.createElement('div');
    user.textContent = savedUser;
    profileContainer.appendChild(user);
}

let savedEmail = localStorage.getItem("email");
if (savedEmail) {
    let email = document.createElement('div');
    email.textContent = savedEmail;
    profileContainer.appendChild(email);
}

let backButton = document.createElement('button');
backButton.textContent = "Back to main";
backButton.addEventListener('click', function() {
    window.location.href = "../logindex.html";
});
profileContainer.appendChild(backButton);
