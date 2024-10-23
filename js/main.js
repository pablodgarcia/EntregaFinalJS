
    //TITULO DEL SITIO
    const titulo = document.getElementById("title");
    titulo.innerText += " Bienvenidos a la huerta de Bubu"; 
    
    // FETCH
    let productos = [];
    
    fetch("./js/productos.json")
        .then(response => response.json())
        .then(data => {
            productos = data;
            cargarProductos(productos);
        });

    // VARIABLES
    const containerProductos = document.querySelector('#container-productos');
    const containerCarrito = document.querySelector('#container-carrito');
    const cantidadCarrito = document.querySelector('#cantidad-carrito');
    const botonVaciar = document.querySelector('#vaciar-carrito');
    const subTotal = document.querySelector('#subTotal');
    const botonComprar = document.querySelector('#comprar-carrito');
    const inputSearch = document.querySelector('#inputSearch');
    let productosEnCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

    actualizarCantidadCarrito();
    cargarProductosCarrito();
    

    // FUNCIONES

    function cargarProductos(productos) {
        containerProductos.innerHTML = "";

        productos.forEach(producto => {
            const div = document.createElement('div');
            div.classList.add('producto', 'col-6', 'col-md-3');

            div.innerHTML = `
                <i class="fa-solid fa-circle-plus agregar-carrito" id=${producto.id}></i>
                <img src="${producto.imagen}" class="producto-img" alt="${producto.nombre}">
                <h3 class="producto-nombre">${producto.nombre}</h3>
                <h4 class="producto-precio">$${producto.precio}</h4>
            `;

            containerProductos.append(div);
        });

        actualizarBotonesAgregar();
    }

    function actualizarBotonesAgregar() {
        const botonesAgregar = document.querySelectorAll('.agregar-carrito');
        botonesAgregar.forEach(boton => {
            boton.addEventListener('click', agregarAlCarrito);
        });
    }

    function agregarAlCarrito(e) {
        const idBoton = e.currentTarget.id;
        const productoAgregado = productos.find(producto => producto.id === idBoton);

        if (productosEnCarrito.some(producto => producto.id === idBoton)) {
            const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
            productosEnCarrito[index].cantidad++;
        } else {
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
        }

        localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
        actualizarCantidadCarrito();
        cargarProductosCarrito();
        mostrarToast("Producto Agregado");
    }

    function actualizarCantidadCarrito() {
        const nuevaCantidadCarrito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        cantidadCarrito.innerText = nuevaCantidadCarrito;
    }

    function cargarProductosCarrito() {
        containerCarrito.innerHTML = "";

        if (productosEnCarrito.length > 0) {
            productosEnCarrito.forEach(producto => {
                const div = document.createElement('div');
                div.classList.add('col-12', 'producto-carrito');

                div.innerHTML = `
                    <span class="producto-carrito-cantidad">${producto.cantidad}</span>
                    <img src="${producto.imagen}" class="producto-carrito-img" alt='${producto.nombre}'>
                    <h3 class="producto-carrito-nombre">${producto.nombre}</h3>
                    <h4 class="producto-precio">$${producto.precio}</h4>
                    <i class="fa-solid fa-circle-xmark fa-xl eliminar-carrito" id=${producto.id}></i>
                `;

                containerCarrito.append(div);
            });
            actualizarBotonesEliminar();
            actualizarTotal();
        } else {
            actualizarTotal();
        }
    }

    function actualizarBotonesEliminar() {
        const botonesEliminar = document.querySelectorAll('.eliminar-carrito');
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', eliminarDelCarrito);
        });
    }

    function eliminarDelCarrito(e) {
        const idBoton = e.currentTarget.id;
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito.splice(index, 1);

        localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
        actualizarCantidadCarrito();
        mostrarToast("Producto Eliminado");
    }

    function vaciarCarrito() {
        if (productosEnCarrito.length > 0) {
            Swal.fire({
                title: 'ATENCION',
                text: `Se eliminaran todos los productos del carrito`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, eliminar carrito',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    productosEnCarrito.length = 0;
                    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
                    cargarProductosCarrito();
                    actualizarCantidadCarrito();
                    Swal.fire('Eliminado!', 'Tu carrito fue eliminado.', 'success');
                }
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Tu carrito está vacío!',
            });
        }
    }

    function actualizarTotal() {
        const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        subTotal.innerText = `Subtotal: $${totalCalculado}`;
    }

    function comprarCarrito() {
        if (productosEnCarrito.length > 0) {
            Swal.fire({
                icon: 'success',
                title: '¡Gracias por tu compra!',
                html: 'Tu pedido ha sido realizado con exito',
                timer: 3000,
                timerProgressBar: true
            }).then(() => {
                productosEnCarrito.length = 0;
                localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
                cargarProductosCarrito();
                actualizarCantidadCarrito();
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡Tu carrito está vacío!',
            });
        }
    }
    function mostrarToast(mensaje) {
        Toastify({
            text: mensaje,
            duration: 1000,
            gravity: "bottom",
            position: "center",
            style: {
                background: "linear-gradient(to right, #F9C521, #f99b21)",
                borderRadius: "2rem",
                color: "#121212",
                fontWeight: "600"
            }
        }).showToast();
    } 
    // Buscador, evento keyup se dispara cuando el usuario suelta una tecla después de haberla presionado
    inputSearch.addEventListener('keyup', (e) => {
        const filtroBusqueda = productos.filter((producto) => {
            return producto.nombre.toUpperCase().includes(e.target.value.toUpperCase());
        });

        containerProductos.innerHTML = '';
        if (filtroBusqueda.length !== 0) {
            filtroBusqueda.forEach((producto) => {
                containerProductos.innerHTML += `
                <div class="producto col-6 col-md-3">
                    <i class="fa-solid fa-circle-plus agregar-carrito" id=${producto.id}></i>
                    <img src="${producto.imagen}" class="producto-img" alt="${producto.nombre}">
                    <h3 class="producto-nombre">${producto.nombre}</h3>
                    <h4 class="producto-precio">$${producto.precio}</h4>
                </div>`;
            });
            actualizarBotonesAgregar();
        } else {
            containerProductos.innerHTML += `
            <div class="col-12 error">
                <i class="fa-regular fa-face-sad-cry"></i>
                <p>Oops...<br>No se encontró ningún producto con ese nombre</p>
            </div>`;
        }
    });

    botonVaciar.addEventListener('click', vaciarCarrito);
    botonComprar.addEventListener('click', comprarCarrito);


    //PAGO CON TARJETA DE CREDITO

const modalPago = document.getElementById('modal-pago');
const botonPagar = document.getElementById('comprar-carrito');
const closeButton = document.querySelector('.close-button');

botonPagar.addEventListener('click', () => {
    if (productosEnCarrito.length > 0) {
        modalPago.style.display = 'block';
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡Tu carrito está vacío! Agrega productos para realizar una compra.',
            iconHtml:"😕",
        });
    }
});

closeButton.addEventListener('click', () => {
    modalPago.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modalPago) {
        modalPago.style.display = 'none';
    }
});

//DATOS A INGRESAR PARA PAGO CON TARJETA

document.getElementById('form-pago').addEventListener('submit', (e) => {
    e.preventDefault();

    const nombreTitular = document.getElementById('nombre-titular').value.trim();
    const numeroTarjeta = document.getElementById('numero-tarjeta').value.replace(/\s/g, '');
    const fechaExpiracion = document.getElementById('fecha-expiracion').value.trim();
    const codigoSeguridad = document.getElementById('codigo-seguridad').value.trim();

    const esNumeroTarjetaValido = /^\d{3}$/.test(numeroTarjeta);
    const esCodigoSeguridadValido = /^\d{3}$/.test(codigoSeguridad);
    const esFechaValida = /^\d{2}\d{2}$/.test(fechaExpiracion);

    if (!nombreTitular || !esNumeroTarjetaValido || !esCodigoSeguridadValido || !esFechaValida) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: '¡Por favor, verifica los datos de tu tarjeta!',
        });
        return;
    }

    Swal.fire({
        title: 'Pago realizado con éxito.',
        text: '¡Vuelva pronto!',
        iconHtml:"👌",
        
    }).then(() => {
        modalPago.style.display = 'none';
    });
});


