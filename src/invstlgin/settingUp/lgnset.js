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
document.body.appendChild(confirm1);

let img7 = document.createElement('button');
img7.id = 'img7';
document.body.appendChild(img7);

img7.addEventListener('click', function(){
    alert("Hi my name is smit");
});

confirm1.addEventListener('click',function(event){
    event.preventDefault();
    document.body.classList.add("fade-out"); 
    setTimeout(() => {
        window.location.href = "../../invstlgin/logged/logindex.html";
    }, 500);
})

let pfp = document.createElement('div');
pfp.id = "pfp-display"; 
document.body.appendChild(pfp);

img1.style.backgroundImage = "url('pfp1.jpg')";
img2.style.backgroundImage = "url('pfp2.jpg')";
img3.style.backgroundImage = "url('pfp3.jpg')";
img4.style.backgroundImage = "url('pfp4.jpg')";
img5.style.backgroundImage = "url('pfp5.jpg')";
img6.style.backgroundImage = "url('pfp6.jpg')";


function updateProfilePicture(imgElement) {
  pfp.style.backgroundImage = imgElement.style.backgroundImage;
  pfp.style.width = '300px';
  pfp.style.height = '300px'; 
  pfp.style.borderRadius = '50%'; 
  pfp.style.top = '250px'; 
  pfp.style.left = '170px';

}
img1.addEventListener('click', () => updateProfilePicture(img1));
img2.addEventListener('click', () => updateProfilePicture(img2));
img3.addEventListener('click', () => updateProfilePicture(img3));
img4.addEventListener('click', () => updateProfilePicture(img4));
img5.addEventListener('click', () => updateProfilePicture(img5));
img6.addEventListener('click', () => updateProfilePicture(img6));


