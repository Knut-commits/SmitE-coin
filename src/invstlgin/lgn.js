document.addEventListener("DOMContentLoaded", function() {
    // Ensure the signup button exists
    let signupButton = document.getElementById("signupButton");
    if (!signupButton) {
        signupButton = document.createElement("button");
        signupButton.id = "signupButton";
        signupButton.textContent = "Sign Up";
        signupButton.style.cssText = `
            padding: 12px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            position: absolute;
            margin-top: 270px;
            width: 325px;
            height: 40px;
        `;
        document.body.appendChild(signupButton);
    }

    // Add event listener to signup button
    signupButton.addEventListener("click", function() {
        window.location.href = "signup.html";
    });

    // Login Form Submission
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault(); 
        let enteredUsername = document.getElementById("loginUsername").value;
        let enteredPassword = document.getElementById("loginPassword").value;

        fetch("http://localhost:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: enteredUsername, password: enteredPassword })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Login successful!");
                window.location.href = "logged/logindex.html";
            } else {
                alert("Invalid username or password.");
            }
        })
        .catch(error => console.error("Error:", error));
    });
});
