const menu = document.getElementsByClassName("bottomHeader");
const overlay = document.getElementById('overlay');
const search = document.getElementsByClassName('search')
const searchInput = document.getElementById('searchInput')
function showMenu() {
    menu[0].style.left = 0;
    overlay.style.display = 'block';
};

function hideMenu() {
    menu[0].style.left = '-297px';
    overlay.style.display = 'none';
};

search[0].addEventListener('click', function () {   
    search[0].removeAttribute('id','mobileSearch');
});

document.addEventListener('click', function(event) {
    if (!search[0].contains(event.target)) {
        search[0].setAttribute('id', 'mobileSearch'); 
    }
  });