const menu = document.getElementsByClassName("bottomHeader");
const overlay = document.getElementById('overlay');
const search = document.getElementsByClassName('search')
const searchInput = document.getElementById('searchInput')
function showMenu() {
    menu[0].style.left = 0;
    overlay.style.display = 'block';
};

function hideMenu() {
    menu[0].style.left = '-290px';
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

//submenu hover javascript

const submenu = document.getElementsByClassName('submenu');
const cat = document.getElementsByClassName('category')[0].children;

for (let i = 1; i < cat.length; i++) {
    cat[i].addEventListener('mouseover', function () {
        if (window.innerWidth > 1280) {
            submenu[i - 1].style.display = 'block';
        }
    })

    cat[i].addEventListener('click', function () {
        if (window.innerWidth <= 1280) {
            if (submenu[i - 1].style.display === 'block') {
                submenu[i - 1].style.display = 'none';
            }
            else {
                submenu[i - 1].style.display = 'block';
            }
        }
    })

    cat[i].addEventListener('mouseout', function () {
        if (window.innerWidth > 1280) {
            submenu[i - 1].style.display = 'none';
        }
    })
}