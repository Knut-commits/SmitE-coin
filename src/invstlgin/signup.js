document.addEventListener("DOMContentLoaded", function () {
    if (!signupForm) {
        console.error("Signup form not found!");
        return;
    }

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let username = document.getElementById("signupUsername").value;
        let email = document.getElementById("signupEmail").value;
        let password = document.getElementById("signupPassword").value;
        let confirmPassword = document.getElementById("signupConfirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        let confirmPasswordField = document.getElementById("signupConfirmPassword");

        if (!confirmPasswordField) {
            console.error("Confirm Password field not found!");
            return;
        }

        confirmPasswordField.insertAdjacentElement("afterend", con1);
        console.log("Button added!");

        con1.addEventListener("click", function () {
            alert("button is clicked!");

            fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            })
                .then((response) => response.json())
                .then((data) => {
                    alert(data.message);

                    if (data.message === "User registered successfully") {
                        localStorage.setItem("currentUser", username); // Store username
                        window.location.href = "settingUp/lgnset.html";
                    }
                })
                
                .catch((error) => console.error("Error:", error));
                window.location.href = "settingUp/lgnset.html"; // delete this for final testing (only used for testing rn)
        });
    });
});
