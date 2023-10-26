//creo el objeto para promociones
function Promocion(min,max,premio){
    this.min = min;
    this.max = max;
    this.premio = premio;
}

//creo el objeto Cliente
function Cliente(Nombre, Mail, Telefono){
this.Nombre = Nombre;
this.Mail = Mail;
this.Telefono = Telefono;   
}

//Creo lista de clientes
const  Clientes = [];

//creo unas promos
const promo1 = new Promocion(1000,10000, "Viaje a Mar del Plata");
const promo2 = new Promocion(10000,100000, "Viaje a Brasil");
const promo3 = new Promocion(100000,1000000, "Viaje al Caribe");
//armo una lista de promos
const listaDePromos = [promo1,promo2,promo3];


//funcion para calcular interes
function CalcularInteres(interes){
    return ((interes / 100) / 12);
}

//funcion para calcular el prestamos
function CalcularPrestamo(valorSolicitado, interes, meses) {
    return (valorSolicitado * (interes / (1 - Math.pow(1 + interes, -meses))));
}

// Funcion para encontrar el premio correspondiente al monto ingresado
function Sorteo(monto){

    let premio = 'Sin premio';
    
    for (const promo of listaDePromos) {
            if (monto >= promo.min && monto < promo.max) {
                premio = promo.premio;
                return premio;
            }
    }
}

//Creo evento a la espera de que le haga clic al boton Calcular
let botonCalular = document.getElementById("btnCalcular");
botonCalular.addEventListener("click",Prestamo);

function Prestamo(){
// Obtener los valores del formulario
const principal = parseInt(document.getElementById('principal').value);
const interest = parseInt(document.getElementById('interest').value);
const meses = parseInt(document.getElementById('months').value);

//llamado de funciones
const interes = CalcularInteres(interest);
const montoMensual = CalcularPrestamo(principal,interes,meses);
const premioSorteo = Sorteo(principal);

// Mostrar el resultado
document.getElementById('result').textContent = `Pago mensual: $${montoMensual.toFixed(2)}`;
document.getElementById('premio').textContent = `Con este prestamos participas en el sorteo de un ${premioSorteo}`;
}



//Creo evento a la espera de que le haga clic al boton Agregar
let botonAgregar = document.getElementById("btnAgregar");
botonAgregar.addEventListener("click",AgregarCliente);

function AgregarCliente() {
    // Obtener los valores del formulario
    const Nombre = document.getElementById('NombreCliente').value;
    const Mail = document.getElementById('mail').value;
    const Telefono = parseInt(document.getElementById('telefono').value);

    const clienteNuevo = new Cliente(Nombre, Mail, Telefono);

    Clientes.push(clienteNuevo);
    // Mostrar que se agrego cliente
    document.getElementById('clienteAgregado').textContent = `Se agrego el Cliente ${Nombre}`;

    console.log(Clientes);
}

function MostrarListado() {
    document.getElementById('clienteAgregado').textContent = "";
    Clientes.forEach(Cliente => {
        const nombreCliente = document.createElement("li");
        nombreCliente.textContent = Cliente.Nombre
        document.getElementById('ListadoDeClientes').appendChild(nombreCliente);
    });
}

let botonMostrar = document.getElementById("btnMostrar");
botonMostrar.addEventListener("click", MostrarListado);