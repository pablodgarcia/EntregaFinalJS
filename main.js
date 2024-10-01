
const principal = document.getElementById("principal")
console.log(principal)
console.dir(principal)

//agrega lista desde js
const agregarCualidades=()=>{
  const cualidades= ["Compromiso", "Seriedad", "Trayectoria"]
  listaNosotros.innerHTML= ""//evita repeticiones de la lista
  cualidades.forEach(cualidad=>{listaNosotros.innerHTML += `<li>${cualidad}</li>`})
}

agregarCualidades()

//AGREGA EVENTO CON addEventListener
listaNosotros.addEventListener("click", ()=>{

  alert("CUIDADO")

})


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
  let prestamoDoce = prompt(
    "Ingrese el monto expresado en números que desea recibir, y el sistema le devolverá la suma final de las doce cuotas"
  );

  // Validar que el input sea un nro
  prestamoDoce = parseFloat(prestamoDoce);
  if (isNaN(prestamoDoce) || prestamoDoce <= 0) {
    alert("Por favor, ingrese un monto válido.");
    return;
  }

  const porCinco = 5; // el nro que ingresa el usuario es multiplicado por 5
  const doceMeses = 12; // el resultado de la multiplicación es dividido por 12 para arrojar el valor de cada cuota

  let devolucionDoce = prestamoDoce * porCinco;
  let cadaMes = devolucionDoce / doceMeses;

  alert(
    "La suma en pesos que devolverá en 12 meses será " +
      devolucionDoce.toFixed(2) +
      " , cada cuota será de " +
      cadaMes.toFixed(2) +
      " pesos"
  );
}

multiplicarDoce();

/*alert utilizando arrays*/
const dias = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];
dias.sort(); //ordena alfabeticamente el array
console.log(dias.sort())
dias.reverse(); //ordena el array al reves del origial

dias.push("Domingos"); /*agregamos elemento*/
dias.shift(); /*quita el primer elemento, que seria el lunes*/
console.warn(dias.indexOf("Miercoles")); //Posicion, indice del elemento
console.warn(dias);

//uso de filter para separar nombres de hasta 4 letras
const clientes =["Mia", "Soleadad", "Facundo", "Lito","Federico"];
const nombresCortos= clientes.filter((nombre)=>nombre.length <=4);

console.warn(nombresCortos)

//agrego mediante class sucursales
class NuevaSucur {
  constructor(Nombre, Direccion, Horario, atencion) {
    this.Nombre = Nombre;
    this.Direccion = Direccion;
    this.Horario = Horario;
    this.atencion = atencion;
    this.saludoSucursal = function () {
      console.log(
        `Hola los esperamos en ${this.Direccion} de ${this.Horario} para ayudarlos. Atte ${this.atencion}.`
      );
    };
  }
}

function sumarLocal(Nombre, Direccion, Horario, atencion) {
  locales.push(new NuevaSucur(Nombre, Direccion, Horario, atencion));
}

const locales = [];
sumarLocal("Palermo", "Charcas 2020", "9hs a 20hs", "Pedro");

sumarLocal("Belgrano", "Pespes 3030", "9hs a 20hs", "Paco");

sumarLocal("Chacarita", "Rojas 5050", "9hs a 20hs", "Maria");

sumarLocal("Colegiales", "Reco 2222", "9hs a 20hs", "Sabrina");

sumarLocal("Flores", "Bolos 9090", "9hs a 20hs", "Roco");

console.table(locales);

console.log(locales);


let atencion =
  "Te esperamos en nuestra sucursal, atendemos los siguientes dias: \n * ";
atencion += dias.join("\n * ");
alert(atencion);








/*const palermo = {
  Direccion: "Charcas 2020",
  Horario: "9hs a 20hs",
  atencion: "Pedro",
  saludoSucursal: function () {
    console.log(
      `Hola los esperamos en ${this.Direccion}, de ${this.Horario}, para ayudarlos. Atte ${this.atencion}. `
    );
  },
};
palermo.saludoSucursal();
*/
/*const belgrano = {
  Direccion: "Pespes 3030",
  Horario: "9hs a 20hs",
  atencion: "Paco",
  saludoSucursal: function () {
    console.log(
      `Hola los esperamos en ${this.Direccion} de ${this.Horario} para ayudarlos. Atte ${this.atencion}. `
    );
  },
};
*/
/*const chacarita = {
  Direccion: "Rojas 5050",
  Horario: "9hs a 20hs",
  atencion: "Maria",
  saludoSucursal: function () {
    console.log(
      `Hola los esperamos en ${this.Direccion} de ${this.Horario} para ayudarlos. Atte ${this.atencion}. `
    );
  },
};
*/
/*const colegiales = {
  Direccion: "Reco 2222",
  Horario: "9hs a 20hs",
  atencion: "Sabrina",
  saludoSucursal: function () {
    console.log(
      `Hola los esperamos en ${this.Direccion} de ${this.Horario} para ayudarlos. Atte ${this.atencion}.`
    );
  },
};
*/
/*const flores = {
  Direccion: "Bolos 9090",
  Horario: "9hs a 20hs",
  atencion: "Roco",
  set cambiarAtencion(nuevoAtencion){   //uso de palabra clave set para cambiar el valor de atencion
    this.atencion= nuevoAtencion;
  },
};
*/
/*flores.cambiarAtencion="Ramiro"
console.warn(flores.atencion)

const sucursales = ["Belgrano", "Palermo", "Colegiales", "Flores", "Chacarita"];

sucursales.sort(); //ordena alfabeticamente el array
sucursales.reverse(); //ordena el array al reves del origial
console.log(sucursales);
*/
/*//funcion para chequear la existencia de un elemento en el array, en este caso una sucursal
const buscadorSucural = function (sucursal) {
  const ubicacion = sucursales.indexOf(sucursal);
  if (ubicacion === -1) {
    console.log(`No existe una sucursal en ${sucursal}`);
  } else {
    console.log(
      `Si existe una sucursal, lo esperamos pronto en la sucursal ${sucursal}`
    )
  }
}
buscadorSucural("Belgrano");

console.warn(sucursales.includes("Palermo")); //para saber si esta en el arrays, usando includes
*/
//agrego mediante class la sucursal recoleta
/*class NuevaSucur {
  constructor(Direccion, Horario, atencion) {
    
    this.Direccion = Direccion;
    this.Horario = Horario;
    this.atencion = atencion;
    this.saludoSucursal = function () {
      console.log(
        `Hola los esperamos en ${this.Direccion} de ${this.Horario} para ayudarlos. Atte ${this.atencion}.`)
    }
  }
};


*/

// Console.log de atencion y Direccion de 2 sucursales
/*console.log(`Palermo - Dirección: ${palermo.Direccion}, Atención: ${palermo.atencion}`);
console.log(`Belgrano - Dirección: ${belgrano.Direccion}, Atención: ${belgrano.atencion}`);

console.warn(sucursales.includes("Recoleta")); //para saber si esta en el arrays, usando includes*/
