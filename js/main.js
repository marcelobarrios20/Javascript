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


