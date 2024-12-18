fetch('Data/product.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        renderCategories(data.categories);
      })
      .catch(error => {
        console.error('Error fetching JSON:', error);
      });


    // Function to render categories in the DOM
    function renderCategories(categories) {
      const container = document.getElementById("category");
      const mobContainer = document.getElementById('mobCategory');

      //Off Canvas Loop Category
    categories.forEach(mobCat => {
        const mobCatLi = document.createElement("li");
        mobCatLi.className = "mainCat";
        mobCatLi.innerHTML = `<div>${mobCat.name}<i class="fa-solid fa-angle-down downArrow"></i></div>`;

        const subcategoryList = document.createElement("ul");
        subcategoryList.className = "mobSubCat";

        mobCat.subcategories.forEach(subcategory => {
            const mobSubCatItem = document.createElement("li");
            mobSubCatItem.innerHTML = `<a href="#">${subcategory}</a>`;
            subcategoryList.appendChild(mobSubCatItem);
          });
          mobCatLi.appendChild(subcategoryList);
          mobContainer.appendChild(mobCatLi);


    });

      // Loop through each category
      categories.forEach(category => {
        const categoryLi = document.createElement("li");
        categoryLi.className = "mainCat";
        categoryLi.textContent = category.name;

    // Create the subcategories list
        const subcategoryList = document.createElement("ul");
        subcategoryList.className = "subcategory";

        category.subcategories.forEach(subcategory => {
          const subcategoryItem = document.createElement("li");
          subcategoryItem.textContent = subcategory;
          subcategoryList.appendChild(subcategoryItem);
        });

        categoryLi.appendChild(subcategoryList);
        container.appendChild(categoryLi);
      });

    const mobSubCat = document.getElementsByClassName('mobSubCat')
    const downArrow = document.getElementsByClassName('downArrow')

for (let i = 0; i < mobSubCat.length; i++) {
    downArrow[i].addEventListener('click', function () {
        if (mobSubCat[i].classList.contains('showSub')) {
            mobSubCat[i].classList.remove('showSub');  
            downArrow[i].style.transform = 'none';
        }
        else{
            mobSubCat[i].classList.add('showSub');
            downArrow[i].style.transform = 'rotate(-180deg)';
        }
    })
    
};
    }

const mobSubCat = document.getElementsByClassName('mobSubCat')
const downArrow = document.getElementsByClassName('downArrow')

for (let i = 0; i < mobSubCat.length; i++) {
    downArrow[i].addEventListener('click', function () {
        mobSubCat[i].classList.add('showSub');  
    })
    
};

const offCanvas = document.getElementById("offCanvas")
const overlay = document.getElementById('overlay');

window.showMenu = function () {
    offCanvas.style.left = 0;
    overlay.style.display = 'block';
};

window.hideMenu = function () {
    offCanvas.style.left = '-280px';
    overlay.style.display = 'none';
};

const placeholders = ["bicycle", "handlebar", "crankset", "chain", "tube", "tire" , "shimano" , "derailleur"];

const searchInput = document.getElementById("searchInput");

let currentTextIndex = 0;
let currentCharIndex = 0;

function typePlaceholder() {
  const currentText = placeholders[currentTextIndex];
  searchInput.setAttribute("placeholder", currentText.slice(0, currentCharIndex++));

  if (currentCharIndex > currentText.length) {
    setTimeout(deletePlaceholder, 1000); // Pause before deleting
  } else {
    setTimeout(typePlaceholder, 150); // Typing speed
  }
}

function deletePlaceholder() {
  const currentText = placeholders[currentTextIndex];
  searchInput.setAttribute("placeholder", currentText.slice(0, --currentCharIndex));

  if (currentCharIndex === 0) {
    currentTextIndex = (currentTextIndex + 1) % placeholders.length; // Move to next word
    setTimeout(typePlaceholder, 500); // Pause before typing new word
  } else {
    setTimeout(deletePlaceholder, 100); // Deleting speed
  }
}

// Start the typing animation
typePlaceholder();

import { initializeCarousel } from './carousel.js';

// Initialize the carousel
initializeCarousel({
  slidesSelector: '.slides',
  dotsContainerSelector: '.dots',
  slideDuration: 5000,
});
