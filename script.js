const productGrid = document.getElementById('product-grid');
const pagination = document.getElementById('pagination');
let currentPage = 1;

function fetchProducts() {
  
  // https://dummyjson.com/products?limit=10&skip=0 

  const url = `https://dummyjson.com/products?limit=10&skip=${(currentPage - 1) * 10}`;
  
  return fetch(url)
    .then(response => response.json())
    .then(data => data.products);
}

function displayProducts(products) {
  productGrid.innerHTML = '';
  console.log(products)
  products.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}">
      <h2>${product.title}</h2>
      <p>${product.category}</p>
      <p>${product.description}</p>
      <p>Original Price: ${product.price}</p>
      <p>Discounted Price: ${product.price-product.price/product.discountPercentage}</p>


      `;
    productGrid.appendChild(productElement);
  });
}

function displayPagination(totalPages) {
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    if (i === currentPage) {
      button.classList.add('active');
    }
    button.addEventListener('click', () => {
      currentPage = i;
      getProducts();
    });
    pagination.appendChild(button);
  }
}

function getProducts() {
  fetchProducts().then(products => {
    const totalProducts = products.length;
    const totalPages = 10;
    displayProducts(products);
    displayPagination(totalPages);
  });
}

getProducts();
