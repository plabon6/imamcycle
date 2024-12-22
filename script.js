fetch('Data/category.json')
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

        // Drop down Location
        const allSubCat = document.getElementsByClassName("subcategory");
        for (let i = 0; i < allSubCat.length; i++) {
          if (i < Math.floor(allSubCat.length / 2)) {
            allSubCat[i].classList.remove("rightSub");
            allSubCat[i].classList.add("leftSub");
          } else {
            allSubCat[i].classList.add("rightSub");
          }
        }
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

window.addEventListener("scroll", function () {
  const bottomHead = document.getElementsByClassName("bottomHeader")
  if (window.scrollY > 80) {
    bottomHead[0].setAttribute("id", "bottomHead");
  } else {
    bottomHead[0].removeAttribute("id", "bottomHead");
  }
});

fetch('Data/product.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    renderProducts(data.products);
  })
  .catch(error => {
    console.error('Error fetching JSON:', error);
  });

  function renderProducts(products) {
    const allProducts = document.getElementById("allProducts");
    for (let p = 0; p < products.length; p++) {
      const productCard = document.createElement("div");
      productCard.classList.add("productCard");
  
      // Check if the product quantity is 0
      const isOutOfStock = products[p].quantity === 0;
      // Check if the product discount is 0
      const pDiscount = products[p].discount === 0
      const pSave = (products[p].discount) - (products[p].price) <= 0
  
      productCard.innerHTML = `
        ${pSave ? "" : `<label for="PName" class="pLabel">Save: ${(products[p].discount) - (products[p].price)}</label>`}
        <div class="cardTop">
          <div class="imgCard">
            <img src="${products[p].image}" alt="${products[p].name}" srcset="">
          </div>
          <h3 class="PName">${products[p].name}</h3>
        </div>
        <div class="pInfo">
          <ul>
              <li>${products[p].shortDescription[0]}</li>
              <li>${products[p].shortDescription[1]}</li>
              <li>${products[p].shortDescription[2]}</li>
              <li>${products[p].shortDescription[3]}</li>
          </ul>
        </div>
        <div class="cardBottom">
          <hr>
          <p class="price">${products[p].price} <span class="oldPrice">${pDiscount ? "" : products[p].discount}</span></p>
          <button class="buy ${isOutOfStock ? "disabled" : ""}" ${isOutOfStock ? "disabled" : ""}>
            ${isOutOfStock ? "Out of Stock" : '<i class="fa-solid fa-cart-plus"></i> Buy Now'}
          </button>
        </div>
      `;
  
      allProducts.appendChild(productCard);
    }
  }
  