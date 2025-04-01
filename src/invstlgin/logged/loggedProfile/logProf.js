let profileContainer = document.createElement('div');
document.body.appendChild(profileContainer);

let token = localStorage.getItem("token");
if (token) {
    fetch("http://localhost:5000/profile", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            let img = document.createElement('img');
            img.src = data.profilePic;
            img.style.width = '300px'; 
            img.style.height = '300px'; 
            img.style.borderRadius = '50%';  
            profileContainer.appendChild(img);

            let user = document.createElement('div');
            user.textContent = data.username;
            profileContainer.appendChild(user);

            let email = document.createElement('div');
            email.textContent = data.email;
            profileContainer.appendChild(email);
        } else {
            alert("Failed to load profile.");
        }
    })
    .catch(error => console.error("Error:", error));
} else {
    alert("User not logged in.");
    window.location.href = "../lgn.html";
}

let backButton = document.createElement('button');
backButton.textContent = "Back to main";
backButton.addEventListener('click', function() {
    window.location.href = "../logindex.html";
});
profileContainer.appendChild(backButton);
