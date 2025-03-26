let img1 = document.createElement('button');
img1.id = "img1";
document.body.appendChild(img1);

let img2 = document.createElement('button');
img2.id = "img2";
document.body.appendChild(img2);

let img3 = document.createElement('button');
img3.id = "img3";
document.body.appendChild(img3);

let img4 = document.createElement('button');
img4.id = "img4";
document.body.appendChild(img4);

let img5 = document.createElement('button');
img5.id = "img5";
document.body.appendChild(img5);

let img6 = document.createElement('button');
img6.id = "img6";
document.body.appendChild(img6);

let confirm1 = document.createElement('button');
confirm1.id = "confirm";
confirm1.textContent = "Confirm";
document.body.appendChild(confirm1);

let img7 = document.createElement('button');
img7.id = 'img7';
document.body.appendChild(img7);

img7.addEventListener('click', function(){
    alert("Hi my name is smit");
});





let pfp = document.createElement('div');
pfp.id = "pfp-display"; 
document.body.appendChild(pfp);

img1.style.backgroundImage = "url('../images/pfp1.jpg')";
img2.style.backgroundImage = "url('../images/pfp2.jpg')";
img3.style.backgroundImage = "url('../images/pfp3.jpg')";
img4.style.backgroundImage = "url('../images/pfp4.jpg')";
img5.style.backgroundImage = "url('../images/pfp5.jpg')";
img6.style.backgroundImage = "url('../images/pfp6.jpg')";



function updateProfilePicture(imgElement) {
  pfp.style.backgroundImage = imgElement.style.backgroundImage;
  pfp.style.width = '300px';
  pfp.style.height = '300px'; 
  pfp.style.borderRadius = '50%'; 
  pfp.style.top = '250px'; 
  pfp.style.left = '170px';
  console.log("Profile picture updated:", imgElement.style.backgroundImage);

}
img1.addEventListener('click', () => updateProfilePicture(img1));
img2.addEventListener('click', () => updateProfilePicture(img2));
img3.addEventListener('click', () => updateProfilePicture(img3));
img4.addEventListener('click', () => updateProfilePicture(img4));
img5.addEventListener('click', () => updateProfilePicture(img5));
img6.addEventListener('click', () => updateProfilePicture(img6));




const pfpDisplay = document.getElementById("pfp-display");  

// Create event listeners for each image button
img1.addEventListener('click', () => updateProfilePicture(img1));
img2.addEventListener('click', () => updateProfilePicture(img2));
img3.addEventListener('click', () => updateProfilePicture(img3));
img4.addEventListener('click', () => updateProfilePicture(img4));
img5.addEventListener('click', () => updateProfilePicture(img5));
img6.addEventListener('click', () => updateProfilePicture(img6));

// Update the profile picture
function updateProfilePicture(imgElement) {
    // Set the background image of the pfp display to the selected image
    pfpDisplay.style.backgroundImage = imgElement.style.backgroundImage;
    
    // Optional: Change the size and appearance of the profile picture
    pfpDisplay.style.width = '300px';
    pfpDisplay.style.height = '300px';
    pfpDisplay.style.borderRadius = '50%';
    pfpDisplay.style.transition = 'all 0.3s ease';
}

// Handle confirm button click
confirm1.addEventListener('click', function (event) {
    event.preventDefault();

    // Get the current background image of the pfp-display element
    let currentProfilePic = window.getComputedStyle(pfpDisplay).backgroundImage;

    // If a profile picture has been selected, store it in localStorage
    if (currentProfilePic && currentProfilePic !== 'none') {
        let imgUrl = currentProfilePic.replace(/^url\(["']?(.*?)["']?\)$/, '$1');
        localStorage.setItem("selectedProfilePic", imgUrl);
        console.log('Profile picture updated:', imgUrl); // For debugging
    } else {
        console.log("No profile picture selected");
    }

    // Fade out the page before redirecting
    document.body.classList.add("fade-out");
    setTimeout(() => {
        window.location.href = "../../invstlgin/lgn.html";  // Redirect after 500ms
    }, 500);
});



