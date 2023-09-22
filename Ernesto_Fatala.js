//Clase con el objeto Producto con tres metodos, uno para sumar IVA al precio, otro para concatenar en un string y mostrar los atributos del objeto
//otro para desminuir el stock al momento de la venta
class Producto {
    constructor(codigo, nombre, proveedor, precio, stock, imagen) {

        this.codigo = codigo;
        this.nombre = nombre;
        this.proveedor = proveedor;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }
    sumarIva() {
        this.precio = Math.ceil(this.precio * 1.21);
    }
    mostrarProducto() {
        return `Codigo ${this.codigo} El producto ${this.nombre} con el del proveedor ${this.proveedor} tiene un valor final de ${this.precio} y hay en stock ${this.stock} productos`;
    }
    mostrarProductoEnFactura() {
        return `El producto ${this.nombre} con el del proveedor ${this.proveedor} tiene un valor final de ${this.precio}`;
    }
    disminuirStock() {
        this.stock--;
    }
    sumarStock() {
        this.stock++;
    }
    copiar() {
        return new Producto(this.codigo, this.nombre, this.proveedor, this.precio, this.stock, this.imagen);
    }
    static crearDesdeJSON(jsonProducto) {
        const { codigo, nombre, proveedor, precio, stock, imagen } = jsonProducto;
        return new Producto(codigo, nombre, proveedor, precio, stock, imagen);
    }
    tieneCodigo(codigo) {
        return this.codigo === codigo;
    }
    static compararPorCodigo(a, b) {
        return a.codigo - b.codigo;
    }
}

class Factura {
    constructor(numero, fecha, contenido) {
        this.numero = numero;
        this.fecha = fecha,
            this.contenido = contenido;
    }

    establecerFechaActual() {
        const fechaActual = new Date();
        const dia = fechaActual.getDate();
        const mes = fechaActual.getMonth() + 1;
        const año = fechaActual.getFullYear();
        const fechaFormateada = `${dia}/${mes}/${año}`;
        this.fecha = fechaFormateada;
    }

    mostrarFactura() {
        return `Numero: ${this.numero}    Fecha: ${this.fecha}\n ${this.contenido}`;
    }
}

/*
//Hardcodeo de productos en un array principal de productos
let arrayProductos = [
    new Producto(100, "Lenovo tablet", "Lenovo", 100, 50, "Imagenes/LenovoProductoUno.webp"),
    new Producto(101, "Lenovo all in one", "Lenovo", 150, 30, "Imagenes/LenovoProductoDos.webp"),
    new Producto(102, "Lenovo notebook", "Lenovo", 200, 20, "Imagenes/LenovoProductoTres.webp"),
    new Producto(103, "Samsung celular", "Samsung", 80, 10, "Imagenes/ProductoSamsungUno.webp"),
    new Producto(104, "Samsung tablet", "Samsung", 120, 15, "Imagenes/ProductoSamsungDos.png"),
    new Producto(105, "Samsung heladera", "Samsung", 300, 5, "Imagenes/ProductoSamsungTres.webp"),
    new Producto(106, "Sony reproductor", "Sony", 250, 8, "Imagenes/ProductoSonyUno.avif"),
    new Producto(107, "Sony joystick", "Sony", 180, 25, "Imagenes/ProductoSonyDos.jpg"),
    new Producto(108, "Sony camara", "Sony", 90, 40, "Imagenes/ProductoSonyTres.webp"),
];
*/
//Funcion para agregar elementos a una lista
function agregarElementoALaLista(producto, lista) {
    lista.push(producto);
}

function eliminarProductoPorCodigo(array, codigo) {
    const index = array.findIndex(producto => producto.tieneCodigo(codigo));
    if (index !== -1) {
        array.splice(index, 1);
    }
}

function ordenarProductosPorCodigo(array) {
    array.sort(Producto.compararPorCodigo);
}

//Funcion para obtener el codigo del ultimo producto en el array
function obtenerCodigoUltimoProducto(arrayDeProductos) {
    const ultimoProducto = arrayDeProductos[arrayDeProductos.length - 1];
    let ultimoCodigo;
    if (ultimoProducto) {
        ultimoCodigo = parseInt(ultimoProducto.codigo);
        return ultimoCodigo;
    } else {
        alert("Hubo un problema al buscar el ultimo codigo");
    }
}

function obtenerNumeroUltimaFactura(facturas) {
    const ultimaFactura = facturas[facturas.length - 1];
    let ultimoNumero;
    if (ultimaFactura) {
        ultimoNumero = parseInt(ultimaFactura.numero);
        return ultimoNumero;
    } else {
        alert("Hubo un problema al buscar el ultimo codigo");
    }
}

//Funcion para mostrar la lista de productos, recorriendo el array y ejecutando el metodo mostrarProducto
function mostrarListaDeProductos(productos) {
    let listaProductos = "";
    productos.forEach(producto => {
        listaProductos += producto.mostrarProducto() + "\n";
    });
    alert("Lista de Productos:\n" + listaProductos);
}

function mostrarListaDeProductosReturn(productos) {
    let listaProductos = "";
    productos.forEach(producto => {
        listaProductos += producto.mostrarProducto() + "<br>";
    });
    return listaProductos;
}

function mostrarFacturas(facturas) {
    let listaDeFacturas = "";
    facturas.forEach(producto => {
        listaDeFacturas += producto.mostrarFactura() + "\n";
    });
    alert("Lista de facturas:\n" + listaDeFacturas);
}

//Funcion para buscar un producto en un array, retornarlo si este exciste segun el parametro a igualar
function buscarProductoPorCodigo(codigo, productos) {
    const producto = productos.find(producto => producto.codigo === codigo);
    if (producto) {
        return producto.copiar();
    } else {
        mensaje.innerHTML = "Producto no encontrado";
    }
}

//Funcion para eliminar un producto de la lista
function eliminarProductoDeLaLista(lista, elemento) {
    const indice = lista.indexOf(elemento);
    if (indice !== -1) {
        lista.splice(indice, 1);
    }
}

//Funcion para mostrar los productos de un proveedor especifico pedido por parametro
function mostrarProductosPorProveedor(proveedor, productosArray) {
    const productosDelProveedor = productosArray.filter(producto => producto.proveedor === proveedor);
    if (productosDelProveedor.length > 0) {
        alert(`Productos del proveedor ${proveedor}:\n\n${productosDelProveedor.map(p => p.nombre).join('\n')}`);
    } else {
        alert(`No hay productos del proveedor ${proveedor}`);
    }
}

//arrays utilizados, array de factura es una factura con elementos producto y array de factura son las facturas enteras realizadas
//array de compras al proveedor;
let arrayFactura = [];
let arrayDeFacturas = [];
let arrayCompras = [];
let arrayProductos = [];

//Funcion para crear un string completo con la factura realizada para luego ser guardado en el arrayDeFacturas
function concatenarArrayEnUnString(lista, totalSuma) {
    let listaProductos = "";
    lista.forEach(producto => {
        listaProductos += producto.mostrarProductoEnFactura() + "\n";
    });
    totalSuma = "El valor total de la factura es : " + totalSuma + " pesos\n";
    return listaProductos + totalSuma;
}

//Funcion para sumar el total de una factura
function sumarPrecioProductosSeleccionados(productos) {
    let totalSuma = 0;
    for (const producto of productos) {
        totalSuma += producto.precio;
    }
    return totalSuma;
}

// Logica para la opcion de ventas
const btnVentas = document.getElementById("btnVentas");
const marcas = document.getElementById("marcas");
const productosLenovo = document.getElementById("productosLenovo");
const productosSamsung = document.getElementById("productosSamsung");
const productosSony = document.getElementById("productosSony");
const logos = document.querySelectorAll(".image");
const productoElegido = document.querySelectorAll(".producto");
let productoSeleccionado = "";
const ultimoProducto = localStorage.getItem("ultimoProducto");
const ultimoProductoImagen = localStorage.getItem("ultimoProductoImagen");
const datosFactura = document.getElementById("datosFactura");

btnVentas.addEventListener("click", () => {
    marcas.classList.contains("hidden")
        ? (marcas.classList.remove("hidden"),
            productosLenovo.classList.add("hidden"),
            productosSamsung.classList.add("hidden"),
            productosSony.classList.add("hidden"))
        : marcas.classList.add("hidden");
});


logos.forEach(logo => {
    logo.addEventListener("click", function () {
        marcas.classList.add("hidden");
        if (logo.alt === "Logo de Lenovo") {
            productosLenovo.classList.remove("hidden");
            productosSamsung.classList.add("hidden");
            productosSony.classList.add("hidden");
        } else if (logo.alt === "Logo de Samsung") {
            productosLenovo.classList.add("hidden");
            productosSamsung.classList.remove("hidden");
            productosSony.classList.add("hidden");
        } else if (logo.alt === "Logo de Sony") {
            productosLenovo.classList.add("hidden");
            productosSamsung.classList.add("hidden");
            productosSony.classList.remove("hidden");
        }
    });
});

productoElegido.forEach(imagen => {
    imagen.addEventListener('click', () => {
        const producto = buscarProductoPorCodigo(parseInt(imagen.alt), arrayProductos);
        producto.disminuirStock();
        producto.sumarIva()
        agregarElementoALaLista(producto, arrayFactura);
        actualizarCarrito();
        productoSeleccionado = `El ultimo producto visto es ${producto.nombre}`;
        localStorage.setItem("ultimoProducto", productoSeleccionado);
        localStorage.setItem("ultimoProductoImagen", imagen.alt);
    });
});

//Logica para el mostrar el carrito de compras
function actualizarCarrito() {
    const carritoElement = document.getElementById("carrito");
    carritoElement.innerHTML = "";
    const sumaTotalCarrito = sumarPrecioProductosSeleccionados(arrayFactura);

    arrayFactura.forEach((producto, index) => {
        const li = document.createElement("li");
        li.textContent = producto.mostrarProductoEnFactura();

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.setAttribute("data-producto-id", producto.codigo);

        botonEliminar.addEventListener("click", function () {
            const productoId = this.getAttribute("data-producto-id");
            const productoAEliminar = arrayFactura.find(producto => producto.codigo === parseInt(productoId));
            if (productoAEliminar) {
                const indice = arrayFactura.indexOf(productoAEliminar);
                if (indice !== -1) {
                    arrayFactura.splice(indice, 1);
                    actualizarCarrito();
                }
            }
        });
        li.appendChild(botonEliminar);
        carritoElement.appendChild(li);

        index === arrayFactura.length - 1 ? (() => {
            const liTotal = document.createElement("li");
            liTotal.textContent = `La suma de la factura hasta ahora es ${sumaTotalCarrito}`;
            carritoElement.appendChild(liTotal);
        })() : null;
    });

    const botonVaciarCarrito = document.getElementById("botonVaciarCarrito");
    if (arrayFactura.length > 0) {
        datosFactura.classList.remove("hidden");
        botonVaciarCarrito.classList.remove("hidden");
        //contenedorFormulario.innerHTML = formularioHTML;
    } else {
        datosFactura.classList.add("hidden");
        botonVaciarCarrito.classList.add("hidden");
    }
}

const contenedorFormulario = document.getElementById("contenedorFormulario");

/*
const formularioHTML = `
    <form action="#" method="post" class="wf-form">
        <fieldset>
            <legend>Información de la factura</legend>

            <label for="inscripcion">Inscripcion:</label>
            <select id="inscripcion" class="switch-datos">
                <option value="">Seleciona una opción...</option>
                <option value="1">Consumidor final</option>
                <option value="2">Monotributo</option>
                <option value="3">Responsable inscripto</option>
                <option value="4">Excento</option>
            </select><br/>

            <div class="offstate-datos opcion-2 opcion-3 opcion-4">
                <label for="nombre">Razon social: </label>
                <input type="text" id="razon" /><br>
                <label for="apellido">Direccion: </label>
                <input type="text" id="direccion" /><br>
                <label for="apellido">Cuit: </label>
                <input type="text" id="cuit" /><br>
            </div>

            <label for="pago">Seleccion:</label>
            <select id="pago" class="switch-datos">
            <option value="">Modo de pago</option>
            <option value="a">Efectivo</option>
            <option value="b">Tarjeta</option>
            </select><br/>

            <div class="offstate-datos opcion-b">
                <label for="activar">Quiere dejarnos sus datos de la tarjeta</label><br>
                <label for="tarjeta">Tarjeta: </label>
                <input type="text" id="tarjeta" /><br>
                <label for="fecha-exp">Fecha Expiración: </label>
                <input type="text" id="fecha-exp" />
            </div>

            <input type="submit" value="Enviar los datos" />
        </fieldset>
    </form>
`;*/

document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("miFormulario");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const email = document.getElementById("email").value;
        const tarjeta = document.getElementById("tarjeta").value;
        const fechaExp = document.getElementById("fecha-exp").value;

        const datosUsuario = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            tarjeta: tarjeta,
            fechaExp: fechaExp,
        };

        console.log(datosUsuario);
    });
});


//Logica para realizar la factura y terminar la compra
//Guardar las facturas con JSON, recuperar el numero de la ultima factura
//incrementarlo para la proxima
const vaciarCarritoBtn = document.getElementById("vaciarCarritoBtn");
vaciarCarritoBtn.addEventListener("click", () => {
    let stringFactura = "";
    let numeroDeFactura;
    stringFactura = concatenarArrayEnUnString(arrayFactura, sumarPrecioProductosSeleccionados(arrayFactura));
    const facturasEnLs = localStorage.getItem("facturas");
    if (facturasEnLs !== null) {
        facturasArrayJson = JSON.parse(facturasEnLs);
        numeroDeFactura = obtenerNumeroUltimaFactura(facturasArrayJson);
        numeroDeFactura++;
        arrayDeFacturas = facturasArrayJson;
    } else {
        numeroDeFactura = 1;
    }
    arrayFactura = [];
    const factura = new Factura(numeroDeFactura, "", stringFactura);
    factura.establecerFechaActual();
    agregarElementoALaLista(factura, arrayDeFacturas);
    localStorage.setItem("facturas", JSON.stringify(arrayDeFacturas));
    let mostrar = factura.mostrarFactura();
    alert(mostrar);
    actualizarCarrito();
});

//Logica para mostrar el localStore de la ultima publicacion vista
ultimoProductoImagen && ultimoProducto ? (() => {
    const ultimoProductoElement = document.getElementById("ultimoProducto");
    ultimoProductoElement.textContent = ultimoProducto;
    const imagenesProductos = document.querySelectorAll(".producto");
    let imagenUltimoProductoSrc = "";

    imagenesProductos.forEach(imagen => (imagen.alt === ultimoProductoImagen) && (imagenUltimoProductoSrc = imagen.src));

    const miDiv = document.getElementById("miDiv");
    const imagen = document.createElement("img");
    imagen.src = imagenUltimoProductoSrc;
    imagen.classList.add("imagenUltimoProducto");
    miDiv.appendChild(imagen);
})() : null;

let listaVisible = false

//Logica para mostrar la lista de productos
function mostrarProductos() {
    const listaProductos = document.getElementById("listaProductos");
    ordenarProductosPorCodigo(arrayProductos);

    listaVisible ? (
        listaProductos.classList.add("hidden"),
        listaVisible = false
    ) : (
        listaProductos.innerHTML = "",
        arrayProductos.forEach(producto => {
            const productoDiv = document.createElement("divListaProductos");
            productoDiv.classList.add("col-md-4", "text-center");

            const li = document.createElement("li");
            li.textContent = producto.mostrarProducto();

            const imagenProducto = document.createElement("img");

            imagenProducto.src = producto.imagen;
            imagenProducto.alt = producto.codigo;
            imagenProducto.classList.add("imagenEnLista", "productoEnLista");

            productoDiv.appendChild(li);
            productoDiv.appendChild(imagenProducto);

            listaProductos.appendChild(productoDiv);
        }),
        listaProductos.classList.remove("hidden"),
        listaVisible = true
    );
}

const mostrarProductosBtn = document.getElementById("mostrarProductosBtn");
mostrarProductosBtn.addEventListener("click", mostrarProductos);
const botonModificar = document.createElement("button");
botonModificar.textContent = "Modificar";
const botonAgregar = document.createElement("button");
botonAgregar.textContent = "Agregar";
const botonEliminar = document.createElement("button");
botonEliminar.textContent = "Eliminar";
const contenedorBotones = document.getElementById("contenedorBotones");
const botonTomarDatos = document.createElement("button");
botonTomarDatos.textContent = "Tomar datos";

//Logica para modificar la lista de productos
const btnModificarLista = document.getElementById("btnModificarLista");
const contenedorForm = document.getElementById("contenedorFormulario");

btnModificarLista.addEventListener("click", () => {
    contenedorBotones.innerHTML = '';
    contenedorBotones.appendChild(botonModificar);
    contenedorBotones.appendChild(botonAgregar);
    contenedorBotones.appendChild(botonEliminar);
    contenedorBotones.appendChild(botonTomarDatos);
    mostrarFormularioABM(contenedorForm);
    if (contenedorBotones.classList.contains("hidden")) {
        contenedorBotones.classList.remove("hidden")
        contenedorForm.classList.remove("hidden")
    } else {
        contenedorBotones.classList.add("hidden")
        contenedorForm.classList.add("hidden")
    }

});

function mostrarFormularioABM(contenedor) {
    contenedor.innerHTML =
        `
    <form id="form" action="#" method="post">
    <div class="allrequired">
        <input name="codigo" id="codigo" type="text" class="mb-1" placeholder="Codigo" />
        <input name="descripcion" id="descripcion"  type="text" class="mb-1 mt-4" placeholder="Descripcion" />
        <input name="proveedor" id="proveedor" type="text" class="mb-1" placeholder="Proveedor" />
        <input name="precio" id="precio" type="text" class="mb-1" placeholder="Precio" />
        <input name="stock" id="stock" type="text" class="mb-1" placeholder="Stock" />
        <input name="imagen" id="imagen" type="text" class="mb-1" placeholder="Ruta de imagen" />
    </div>
    </form>
    `
}

let codigo;
let descripcion;
let proveedor;
let precio;
let stock;
let imagen;
const mensaje = document.getElementById("mensaje");

botonAgregar.addEventListener("click", () => {
    codigo = parseInt(document.getElementById("codigo").value);
    descripcion = document.getElementById("descripcion").value;
    proveedor = document.getElementById("proveedor").value;
    precio = parseInt(document.getElementById("precio").value);
    stock = parseInt(document.getElementById("stock").value);
    imagen = document.getElementById("imagen").value;
    const producto = new Producto(codigo, descripcion, proveedor, precio, stock, imagen);
    agregarElementoALaLista(producto, arrayProductos);
    enviarDatosALaAPI(producto);
    console.log(arrayProductos);
    mensaje.innerHTML = "Se cargo el producto";
    limpiarFormulario()
});

let producto;

botonTomarDatos.addEventListener("click", () => {
    codigo = parseInt(document.getElementById("codigo").value);
    producto = buscarProductoPorCodigo(codigo, arrayProductos);
    document.getElementById("descripcion").value = producto.nombre;
    document.getElementById("proveedor").value = producto.proveedor;
    document.getElementById("precio").value = producto.precio;
    document.getElementById("stock").value = producto.stock;
    document.getElementById("imagen").value = producto.imagen;
    descripcion = document.getElementById("descripcion").value;
    proveedor = document.getElementById("proveedor").value;
    precio = parseInt(document.getElementById("precio").value);
    stock = parseInt(document.getElementById("stock").value);
    imagen = document.getElementById("imagen").value;
    mensaje.innerHTML = "Se encontro el producto";
});

botonModificar.addEventListener("click", () => {
    codigo = parseInt(document.getElementById("codigo").value);
    descripcion = document.getElementById("descripcion").value;
    proveedor = document.getElementById("proveedor").value;
    precio = parseInt(document.getElementById("precio").value);
    stock = parseInt(document.getElementById("stock").value);
    imagen = document.getElementById("imagen").value;
    producto = new Producto(codigo, descripcion, proveedor, precio, stock, imagen);
    eliminarProductoPorCodigo(arrayProductos, codigo);
    agregarElementoALaLista(producto, arrayProductos);
    mensaje.innerHTML = "Se modifico el producto";
    limpiarFormulario()
});

botonEliminar.addEventListener("click", () => {
    codigo = parseInt(document.getElementById("codigo").value);
    eliminarProductoPorCodigo(arrayProductos, codigo);
    mensaje.innerHTML = "Se borro el producto";
    limpiarFormulario()
});

function limpiarFormulario() {
    document.getElementById("codigo").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("proveedor").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("imagen").value = "";
}

const url = 'https://650c46d147af3fd22f67653e.mockapi.io/Productos';

// Funcion para enviar los datos hardcodeados a una api, se hizo unicamente una ves
//const productosJson = JSON.stringify(arrayProductos);

/*
const enviarDatosALaAPI = async () => {
    try {
        for (const producto of arrayProductos) {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(producto)

            });

            if (!response.ok) {
                throw new Error('Error al enviar datos a la API');
            }

            const data = await response.json();
            console.log('Datos enviados a la API:', data);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }

};

enviarDatosALaAPI();
*/

const enviarDatosALaAPI = async (producto) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            throw new Error('Error al enviar datos a la API');
        }

        const data = await response.json();
        console.log('Datos enviados a la API:', data);

    } catch (error) {
        console.error('Error:', error.message);
    }

};

//funciones para obtener los datos de la api
const obtenerDatosDeAPI = async () => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Error al obtener datos de la API');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
};

const guardarDatosEnArray = async () => {
    try {
        const datosAPI = await obtenerDatosDeAPI();
        const arrayProductos = datosAPI.map(jsonProducto => Producto.crearDesdeJSON(jsonProducto));

        console.log('Productos obtenidos de la API y almacenados en un array:', arrayProductos);
        return arrayProductos;
    } catch (error) {
        console.error('Error al guardar datos en un array:', error.message);
    }
};

guardarDatosEnArray()
    .then(productos => {
        console.log('Productos obtenidos:', productos);
        arrayProductos = productos;
    })
    .catch(error => {
        console.error('Hubo un error al obtener los datos de la API:', error.message);
    });
