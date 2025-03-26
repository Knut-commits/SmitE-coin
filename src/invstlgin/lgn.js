document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    // get info
    let enteredUsername = document.getElementById("loginUsername").value;
    let enteredPassword = document.getElementById("loginPassword").value;

    // Get the stored username and password from localStorage
    let storedUsername = localStorage.getItem("username");
    let storedPassword = localStorage.getItem("password");

    // Check if the entered credentials match the stored ones
    if (enteredUsername === storedUsername && enteredPassword === storedPassword) {
        alert("Login successful! Redirecting...");
        window.location.href = "logged/logindex.html"; // Change this to your desired page
    } else {
        alert("Invalid username or password. Please try again.");
    }
});


let signup = document.createElement('button');
signup.id = 'signup';
document.body.appendChild(signup);

signup.textContent = "Sign Up";

signup.addEventListener('click', function(event) {
    event.preventDefault(); 
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "signup.html";
    }, 500);
});
