let usuario ="marcelo";
let contraseña ="1234";
let acceso = false;

function login() {
    let username = prompt("username");
    let password = prompt("password");

    if (username.trim() === "" || password.trim() === "") {
        alert("Por favor, ingrese un usuario y una contraseña.");
        return;
    }

    if (username === "usuario" && password === "contraseña") {
        alert("¡Bienvenido, " + username + "! Has ingresado correctamente.");
    } else {
        alert("Usuario o contraseña incorrectos. Por favor, inténtelo nuevamente.");
    }
}

//Productos para perros

let precioRacion = 1800;
let precioRopa = 500;
let precioCorrea = 300;

let cantidadRacion = 20;
let cantidadRopa = 25;
let cantidadCorrea = 30;

// Variables para la forma de pago
let totalCompra = 0;
let formaDePago = "cuotas";
let meses = 12; // Por defecto, 12 meses si el pago es en cuotas

// Función para calcular el costo total de los productos seleccionados
function calcularCostoTotal() {
    let costoTotal = 0;

    // Calcular el costo total multiplicando precio por cantidad para cada producto
    costoTotal += precioRacion * cantidadRacion;
    costoTotal += precioRopa * cantidadRopa;
    costoTotal += precioCorrea * cantidadCorrea;

    return costoTotal;
}

// Función para calcular el monto de cada cuota
function calcularMontoCuota(montoTotal, cuotas) {
    return montoTotal / cuotas;
}

// Función para calcular el monto de cada cuota para un pago financiado con un determinado interés
function calcularMontoCuotaFinanciada(montoTotal, cuotas, interes) {
    let montoTotalConInteres = montoTotal * (1 + interes);
    return montoTotalConInteres / cuotas;
}

// Calcular el costo total de los productos seleccionados
totalCompra = calcularCostoTotal();

// Calcular el monto de cada cuota o el monto de cada cuota financiada dependiendo de la forma de pago
switch (formaDePago) {
    case "cuotas":
        let montoCuota = calcularMontoCuota(totalCompra, meses);
        console.log(`El monto de cada cuota para ${meses} meses es: $${montoCuota.toFixed(2)}`);
        break;
    case "financiado":
        let interes = 0.1; // 10% de interés
        let cuotaFinanciada = calcularMontoCuotaFinanciada(totalCompra, meses, interes);
        console.log(`El monto de cada cuota para ${meses} meses (con un 10% de interés) es: $${cuotaFinanciada.toFixed(2)}`);
        break;
    default:
        console.log("La forma de pago ingresada no es válida.");
}

// Mostrar el costo total por consola
console.log("El costo total de los productos seleccionados es: $" + totalCompra);


// Arrays y Objetos (segunda pre entrega)

// Definimos los objetos para representar los artículos
var Racion = {
    nombre: "Racion",
    cantidad: 0,
    precio: 0,
    color: ""
  };
  
  var Ropa = {
    nombre: "Ropa",
    cantidad: 0,
    precio: 0,
    color: ""
  };
  
  var Correa = {
    nombre: "Correa",
    cantidad: 0,
    precio: 0,
    color: ""
  };
  
  // Array de objetos
  var articulos = [Racion, Ropa, Correa];
  
  // Solicitamos al usuario que ingrese la información para cada artículo
  for (var i = 0; i < articulos.length; i++) {
    articulos[i].cantidad = parseInt(prompt("Ingrese la cantidad de " + articulos[i].nombre + ":"));
    articulos[i].precio = parseFloat(prompt("Ingrese el precio de " + articulos[i].nombre + ":"));
    articulos[i].color = prompt("Ingrese el color de " + articulos[i].nombre + ":");
  }
  
  // Procesamos la información y mostramos los resultados
  for (var j = 0; j < articulos.length; j++) {
    var costoTotalArticulo = articulos[j].cantidad * articulos[j].precio;
    console.log("Para " + articulos[j].nombre + ":\nCantidad: " + articulos[j].cantidad + "\nPrecio: " + articulos[j].precio + "\nColor: " + articulos[j].color + "\nCosto total: " + costoTotalArticulo);
  }
  
  // Calcular el costo total de la compra
  var costoTotalCompra = articulos.reduce(function(total, articulo) {
    return total + (articulo.cantidad * articulo.precio);
  }, 0);
  
  // Mostrar el costo total de la compra al usuario
  console.log("El costo total de la compra es: " + costoTotalCompra);
  alert("El costo total de la compra es: " + costoTotalCompra);


// Tercera pre entrega (Dom,Eventos, Storage)

const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
    '.container-cart-products'
);

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de arreglos de Productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

// Función para mostrar HTML
const showHTML = () => {
    if (!allProducts.length) {
        cartEmpty.classList.remove('hidden');
        rowProduct.classList.add('hidden');
        cartTotal.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        rowProduct.classList.remove('hidden');
        cartTotal.classList.remove('hidden');
    }

    // Limpiar HTML
    rowProduct.innerHTML = '';

    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-product');

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

        total =
            total + parseInt(product.quantity * product.price.slice(1));
        totalOfProducts = totalOfProducts + product.quantity;
    });

    valorTotal.innerText = `$${total}`;
    countProducts.innerText = totalOfProducts;
};

// Función para guardar en localStorage
const saveToLocalStorage = () => {
    localStorage.setItem('cartProducts', JSON.stringify(allProducts));
};

// Función para cargar desde localStorage
const loadFromLocalStorage = () => {
    const savedProducts = localStorage.getItem('cartProducts');
    if (savedProducts) {
        allProducts = JSON.parse(savedProducts);
        showHTML();
    }
};

productsList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: product.querySelector('p').textContent,
        };

        const exists = allProducts.some(
            product => product.title === infoProduct.title
        );

        if (exists) {
            const products = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        showHTML();
        saveToLocalStorage(); // Guardar en localStorage
    }
});

rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const title = product.querySelector('p').textContent;

        allProducts = allProducts.filter(
            product => product.title !== title
        );

        showHTML();
        saveToLocalStorage(); // Guardar en localStorage
    }
});

// Cargar productos desde localStorage al cargar la página
window.addEventListener('load', () => {
    loadFromLocalStorage();
});





