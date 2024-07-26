document.addEventListener("DOMContentLoaded", () => {
  let usuario = "marceloBB20@gmail.com";
  let contraseña = "1234";
  let acceso = false;

  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const loginMessage = document.createElement("p");
  loginMessage.className = "login-message";
  document.querySelector(".container").appendChild(loginMessage);

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
      loginMessage.textContent =
        "Por favor, ingrese un usuario y una contraseña.";
      loginMessage.style.color = "red";
      return;
    }

    if (username === usuario && password === contraseña) {
      loginMessage.textContent = `¡Bienvenido, ${username}! Has ingresado correctamente.`;
      loginMessage.style.color = "green";
    } else {
      loginMessage.textContent =
        "Usuario o contraseña incorrectos. Por favor, inténtelo nuevamente.";
      loginMessage.style.color = "red";
    }
  });

  // Productos
  const precios = { Racion: 1800, Ropa: 500, Correa: 300 };
  const cantidades = { Racion: 20, Ropa: 25, Correa: 30 };
  let totalCompra = 0;
  const formaDePago = "cuotas";
  const meses = 12;

  function calcularCostoTotal() {
    let costoTotal = 0;
    for (const producto in precios) {
      costoTotal += precios[producto] * cantidades[producto];
    }
    return costoTotal;
  }

  function calcularMontoCuota(montoTotal, cuotas) {
    return montoTotal / cuotas;
  }

  function calcularMontoCuotaFinanciada(montoTotal, cuotas, interes) {
    let montoTotalConInteres = montoTotal * (1 + interes);
    return montoTotalConInteres / cuotas;
  }

  totalCompra = calcularCostoTotal();

  switch (formaDePago) {
    case "cuotas":
      let montoCuota = calcularMontoCuota(totalCompra, meses);
      console.log(
        `El monto de cada cuota para ${meses} meses es: $${montoCuota.toFixed(
          2
        )}`
      );
      break;
    case "financiado":
      let interes = 0.1;
      let cuotaFinanciada = calcularMontoCuotaFinanciada(
        totalCompra,
        meses,
        interes
      );
      console.log(
        `El monto de cada cuota para ${meses} meses (con un 10% de interés) es: $${cuotaFinanciada.toFixed(
          2
        )}`
      );
      break;
    default:
      console.log("La forma de pago ingresada no es válida.");
  }

  console.log(
    "El costo total de los productos seleccionados es: $" + totalCompra
  );

  // Manejo de carrito
  const btnCart = document.querySelector(".container-cart-icon");
  const containerCartProducts = document.querySelector(
    ".container-cart-products"
  );
  const rowProduct = document.querySelector(".row-product");
  const productsList = document.querySelector(".container-items");
  const valorTotal = document.querySelector(".total-pagar");
  const countProducts = document.querySelector("#contador-productos");
  const cartEmpty = document.querySelector(".cart-empty");
  const cartTotal = document.querySelector(".cart-total");

  let allProducts = [];

  btnCart.addEventListener("click", () => {
    containerCartProducts.classList.toggle("hidden-cart");
  });

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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="icon-close"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
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

  productsList.addEventListener("click", (e) => {
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
  });

  rowProduct.addEventListener("click", (e) => {
    if (e.target.classList.contains("icon-close")) {
      const product = e.target.parentElement;
      const title = product.querySelector("p").textContent;

      allProducts = allProducts.filter((p) => p.title !== title);

      showHTML();
      saveToLocalStorage();
    }
  });

  window.addEventListener("load", () => {
    loadFromLocalStorage();
  });
});
