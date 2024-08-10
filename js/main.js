document.addEventListener("DOMContentLoaded", () => {
  let usuario = "marceloBB20@gmail.com";
  let contraseña = "1234";
  let acceso = false;

  let sweetAlertConfig = {};
  let toastifyConfig = {};

  // Función para cargar configuraciones desde el archivo JSON
  const loadConfig = async () => {
    try {
      const response = await fetch("config.json");
      const config = await response.json();
      sweetAlertConfig = config.sweetalert;
      toastifyConfig = config.toastify;
    } catch (error) {
      console.error("Error al cargar las configuraciones:", error);
    }
  };

  // Función para cargar productos desde el archivo JSON
  const loadProducts = async () => {
    try {
      const response = await fetch("db.json"); // Asegúrate de que el archivo JSON esté en la ruta correcta
      const products = await response.json();
      displayProducts(products);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  // Función para mostrar productos en la página
  const displayProducts = (products) => {
    const productsList = document.querySelector(".container-items");
    productsList.innerHTML = ""; // Limpiar contenido previo

    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("item");

      productElement.innerHTML = `
        <figure>
          <img src="imagenes/producto.png" alt="${product.nombre}" />
        </figure>
        <div class="info-product">
          <h2>${product.nombre}</h2>
          <p class="price">$${product.precio}</p>
          <button class="btn-add-cart">Añadir al carrito</button>
        </div>
      `;

      productsList.append(productElement);
    });
  };

  // Función para consumir una API (Simulación de API)
  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const posts = await response.json();
      console.log("Datos obtenidos de la API:", posts.slice(0, 5)); // Mostrando solo los primeros 5 posts
    } catch (error) {
      console.error("Error al consumir la API:", error);
    }
  };

  // Llamar a las funciones de carga al iniciar la página
  loadConfig();
  loadProducts();
  fetchDataFromAPI();

  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: sweetAlertConfig.errorTitle,
        text: "Por favor, ingrese un usuario y una contraseña.",
      });
      return;
    }

    if (username === usuario && password === contraseña) {
      Swal.fire({
        icon: "success",
        title: sweetAlertConfig.successTitle,
        text: sweetAlertConfig.successText,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: sweetAlertConfig.errorTitle,
        text: sweetAlertConfig.errorText,
      });
    }
  });

  const btnCart = document.querySelector(".container-cart-icon");
  const containerCartProducts = document.querySelector(
    ".container-cart-products"
  );
  const rowProduct = document.querySelector(".row-product");
  const valorTotal = document.querySelector(".total-pagar");
  const countProducts = document.querySelector("#contador-productos");
  const cartEmpty = document.querySelector(".cart-empty");
  const cartTotal = document.querySelector(".cart-total");

  let allProducts = [];

  const showHTML = () => {
    if (!allProducts.length) {
      cartEmpty.classList.remove("hidden");
      rowProduct.classList.add("hidden");
      cartTotal.classList.add("hidden");
    } else {
      cartEmpty.classList.add("hidden");
      rowProduct.classList.remove("hidden");
      cartTotal.classList.remove("hidden");
    }

    rowProduct.innerHTML = "";

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach((product) => {
      const containerProduct = document.createElement("div");
      containerProduct.classList.add("cart-product");

      containerProduct.innerHTML = `
        <div class="info-cart-product">
          <span class="cantidad-producto-carrito">${product.quantity}</span>
          <p class="titulo-producto-carrito">${product.title}</p>
          <span class="precio-producto-carrito">${product.price}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      `;

      rowProduct.append(containerProduct);

      total += parseInt(product.quantity * product.price.slice(1));
      totalOfProducts += product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("cartProducts", JSON.stringify(allProducts));
  };

  const loadFromLocalStorage = () => {
    const savedProducts = localStorage.getItem("cartProducts");
    if (savedProducts) {
      allProducts = JSON.parse(savedProducts);
      showHTML();
    }
  };

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-add-cart")) {
      const product = e.target.parentElement;

      const infoProduct = {
        quantity: 1,
        title: product.querySelector("h2").textContent,
        price: product.querySelector("p").textContent,
      };

      const exists = allProducts.some((p) => p.title === infoProduct.title);

      if (exists) {
        allProducts = allProducts.map((p) => {
          if (p.title === infoProduct.title) {
            p.quantity++;
            return p;
          } else {
            return p;
          }
        });
      } else {
        allProducts.push(infoProduct);
      }

      showHTML();
      saveToLocalStorage();
    }

    if (e.target.classList.contains("icon-close")) {
      const product = e.target.parentElement;
      const title = product.querySelector("p").textContent;

      allProducts = allProducts.filter((p) => p.title !== title);

      showHTML();
      saveToLocalStorage();
    }
  });

  btnCart.addEventListener("click", () => {
    containerCartProducts.classList.toggle("hidden-cart");
  });

  window.addEventListener("load", () => {
    loadFromLocalStorage();
  });
});
