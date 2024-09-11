/* alerta de bienvenida al sitio funcion saludar*/
function saludar() {
  alert("Bienvenido al cotizador de prestamos online");
  alert("Para usar nuestro servicio debe ser mayor de 18 años");
}
saludar();

/*ingreso variable nombre*/
let nombreUsuario = prompt("Ingrese su nombre");

/* ciclo validacion de nombre*/
while (nombreUsuario === null || nombreUsuario == "" || !isNaN(nombreUsuario)) {
  nombreUsuario = alert("Ingrese datos validos");
  nombreUsuario = prompt("Por favor ingrese su nombre");
}

/*ingreso y validacion variable edad*/

let edad = parseInt(prompt("Ingrese su edad"));
let edadMinima = 18;

while (edad === null || edad <= edadMinima) {
  if (edad === 17) {
    alert("Dentro de poco podras usar el sitio");
  }
  edad = alert("Ingrese datos correctos");
  edad = parseInt(prompt("Intente nuevamente ingresar la edad"));
}
alert("Bienvenido " + nombreUsuario);

/*funcion para multiplicar y dividir */
function multiplicarDoce() {
  let prestamoDoce = parseInt(
    prompt(
      "Ingrese el monto expresado en numeros que desea recibir, y el sistema le devolvera la suma final de las doce cuotas"
    )
  );
  const multiplicacion = ["5", "12"];

  console.table(multiplicacion);

  const porCinco = 5; //el numero que ingresa el usuario es multiplicado por 5
  const doceMeses = 12; //el resultado de la multiplicacion es dividido por 12 para arrojar el valor de cada cuota

  let devolucionDoce = prestamoDoce * porCinco;
  let cadaMes = devolucionDoce / doceMeses;
  
  alert(
    "La suma en pesos que devolvera en 12 meses sera  " +
      devolucionDoce +
      " ,cada cuota sera de " +
      cadaMes +
      " pesos"
  );
}
multiplicarDoce();

/*alert utilizando arrays*/
const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
console.table(dias);
let atencion =
  "Te esperamos en nuestra sucursal, atendemos los siguientes dias:  " ;
alert(atencion + " " + dias +" . Gracias.");
