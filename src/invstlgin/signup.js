document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing

    // Get input values
    let username = document.getElementById("signupUsername").value;
    let email = document.getElementById("signupEmail").value;
    let password = document.getElementById("signupPassword").value;
    let confirmPassword = document.getElementById("signupConfirmPassword").value;

    // Password validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Store user data (for now, local storage)
    
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    alert("Account created successfully!");

    // Redirect to login page
    window.location.href = "settingUp/lgnset.html";
});
