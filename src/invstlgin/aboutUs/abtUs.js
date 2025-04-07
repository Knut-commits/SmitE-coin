document.addEventListener('DOMContentLoaded', function() {

    let img = document.createElement('img');
    img.src = 'SmitEcoin.png';
    img.alt = 'Our coin';
    document.body.appendChild(img);

    img.id = "smit";


    let backButton = document.createElement('button');
    backButton.textContent = "Go back";
    backButton.id = "backbutton";
    document.body.appendChild(backButton);

    backButton.addEventListener('click', function(event) {
        event.preventDefault(); 
        document.body.classList.add("fade-out"); 
        setTimeout(() => {
            window.location.href = document.referrer;
        }, 500);
    });
});
