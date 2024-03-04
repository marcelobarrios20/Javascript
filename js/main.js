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


