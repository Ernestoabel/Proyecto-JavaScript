//Clase con el objeto Producto con sus metodos
class Producto {
    constructor(id, codigo, nombre, proveedor, precio, stock, imagen) {
        this.id = id;
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
        return `Codigo ${this.codigo} El producto ${this.nombre} de ${this.proveedor} tiene un valor de ${this.precio} y un stock de ${this.stock}`;
    }
    mostrarProductoEnFactura() {
        return `El producto ${this.nombre} de ${this.proveedor} tiene un valor final de ${this.precio}`;
    }
    disminuirStock() {
        this.stock--;
    }
    sumarStock() {
        this.stock++;
    }
    copiar() {
        return new Producto(this.id, this.codigo, this.nombre, this.proveedor, this.precio, this.stock, this.imagen);
    }
    static crearDesdeJSON(jsonProducto) {
        const { id, codigo, nombre, proveedor, precio, stock, imagen } = jsonProducto;
        return new Producto(id, codigo, nombre, proveedor, precio, stock, imagen);
    }
    tieneCodigo(codigo) {
        return this.codigo === codigo;
    }
    static compararPorCodigo(a, b) {
        return a.codigo - b.codigo;
    }
}



//Clase factura con sus metodos
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


//Funcion para agregar elementos a una lista
function agregarElementoALaLista(producto, lista) {
    lista.push(producto);
}
//funcion para eliminar un elemento de la lista por e codigo
function eliminarProductoPorCodigo(array, codigo) {
    const index = array.findIndex(producto => producto.tieneCodigo(codigo));
    if (index !== -1) {
        array.splice(index, 1);
    }
}
//funcion para ordenar de menor a mayor por codigo el array
function ordenarProductosPorCodigo(array) {
    array.sort(Producto.compararPorCodigo);
}

//Funcion para obtener el codigo del ultimo producto en el array
function obtenerIdUltimoProducto(arrayDeProductos) {
    const ultimoProducto = arrayDeProductos[arrayDeProductos.length - 1];
    let ultimoCodigo;
    ultimoCodigo = parseInt(ultimoProducto.id);
    return ultimoCodigo;
}

//funcion para devolver el numero del ultimo elemento del array
function obtenerNumeroUltimaFactura(facturas) {
    const ultimaFactura = facturas[facturas.length - 1];
    let ultimoNumero;
    ultimoNumero = parseInt(ultimaFactura.numero);
    return ultimoNumero;
}

//Funcion para mostrar la lista de productos, recorriendo el array y ejecutando el metodo mostrarProducto
function mostrarListaDeProductos(productos) {
    let listaProductos = "";
    productos.forEach(producto => {
        listaProductos += producto.mostrarProducto() + "\n";
    });
    alert("Lista de Productos:\n" + listaProductos);
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

//arrays utilizados, array de factura es una factura con elementos producto y array de factura son las facturas enteras realizadas
//array de compras al proveedor;
let arrayFactura = [];
let arrayDeFacturas = [];
let arrayCompras = [];
let arrayProductos = [];








// Logica para el boton ventas
const btnVentas = document.getElementById("btnVentas");
const marcas = document.getElementById("marcas");
const productosLenovo = document.getElementById("productosLenovo");
const productosSamsung = document.getElementById("productosSamsung");
const productosSony = document.getElementById("productosSony");
const logos = document.querySelectorAll(".image");
const productoElegido = document.querySelectorAll(".producto");
let productoSeleccionado = "";
const datosFactura = document.getElementById("datosFactura");

//evento para mostrar los tres proveedores con los que trabajamos
btnVentas.addEventListener("click", () => {
    marcas.classList.contains("hidden")
        ? (marcas.classList.remove("hidden"),
            productosLenovo.classList.add("hidden"),
            productosSamsung.classList.add("hidden"),
            productosSony.classList.add("hidden"))
        : marcas.classList.add("hidden");
});

//evento para mostrar los productos segun su proveedor
logos.forEach(logo => {
    logo.addEventListener("click", function () {
        actualizarListaProductos(arrayProductos);
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

//funcion para generar html de cada producto segun su proveedor
function actualizarListaProductos(productos) {

    productosLenovo.innerHTML = '';
    productosSamsung.innerHTML = '';
    productosSony.innerHTML = '';

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('col-md-4', 'text-center');
        productoDiv.innerHTML = `
            <p>${producto.nombre}</p>
            <img src=${producto.imagen} alt="${producto.codigo}" class="image producto" width="200" height="150">
        `;

        if (producto.proveedor === "Lenovo") {
            productosLenovo.appendChild(productoDiv);
        } else if (producto.proveedor === "Samsung") {
            productosSamsung.appendChild(productoDiv);
        } else if (producto.proveedor === "Sony") {
            productosSony.appendChild(productoDiv);
        }
    });
}

//evento para luego de clickear en el producto agregarlo al carrito de compras
//el atributo alt con el que se guarda en el html vendria a ser el codigo
//con eso buscamos en el array y traemos al objeto de la lista para sumarlo al carrito
//por ulitmo guardamos en localStorage tanto el nombre como la imagen del ultimo producto agregado al carrito
document.addEventListener('click', (e) => {
    const productoElegido = document.querySelectorAll('.producto')
    productoElegido.forEach((element) => {
        if (element == e.target) {
            const producto = buscarProductoPorCodigo(parseInt(element.alt), arrayProductos);
            producto.disminuirStock();
            producto.sumarIva()
            agregarElementoALaLista(producto, arrayFactura);
            actualizarCarrito();
            productoSeleccionado = `El ultimo producto visto es ${producto.nombre}`;
            localStorage.setItem("ultimoProducto", productoSeleccionado);
            localStorage.setItem("ultimoProductoImagen", producto.imagen);
        }
    })
})

//Logica para generar el carrito de compras
//cuando el array factura suma elementos se genera una fila con un string y un boton eliminar
//ademas mientras el array tenga al menos un elemento se genera otra linea con la suma del del precio de los elementos

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
            console.log("prueba");
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

    if (arrayFactura.length > 0) {
        datosFactura.classList.remove("hidden");
        datosDeCliente(contenedorDatosDeCliente)
    } else {
        datosFactura.classList.add("hidden");
    }
}

function mostrarMensajePor5Segundos(string,id) {
    const mensaje = document.getElementById(id);
    mensaje.innerHTML = string;
    mensaje.style.display = "block";
    setTimeout(function () {
        mensaje.style.display = "none";
    }, 3000);
}

const contenedorFormulario = document.getElementById("datosFactura");
const contenedorDatosDeCliente = document.getElementById("datosCliente");
const contenedorDatosDePago = document.getElementById("datosPago");

function datosDeCliente(contenedor) {
    contenedor.classList.remove("hidden");
    contenedor.innerHTML = `
    <legend>Información de la factura</legend>
    <label for="inscripcion">Inscripcion:</label>
    <select id="inscripcion" >
        <option value="">Seleciona una opción...</option>
        <option value="1">Consumidor final</option>
        <option value="2">Monotributo</option>
        <option value="3">Responsable inscripto</option>
        <option value="4">Excento</option>
    </select><br/>

    <div id="mostrarFormularioDatos" class="hidden">
    <form id="formularioFactura" >
        <label for="nombre">Razon social: </label>
        <input type="text" id="razon" /><br>
        <label for="direccion">Direccion: </label>
        <input type="text" id="direccion" /><br>
        <label for="cuit">Cuit: </label>
        <input type="text" id="cuit" /><br><hr>
        <div id="mensajeFactura" ></div>
        <button type="button" id="cargarDatos">Cargar datos</button><hr>
    </form>
    </div>`

    const selectInscripcion = document.getElementById("inscripcion");
    const mostrarFormularioDatos = document.getElementById("mostrarFormularioDatos");
    const btnCargarDatos = document.getElementById("cargarDatos");

    selectInscripcion.addEventListener("change", () => {
        if (selectInscripcion.value === "1") {
            mostrarFormularioDatos.classList.add("hidden");
            datosDePago(contenedorDatosDePago)
        } else if (selectInscripcion.value === "2" || selectInscripcion.value === "3" || selectInscripcion.value === "4"){
            mostrarFormularioDatos.classList.remove("hidden");
            btnCargarDatos.addEventListener('click', () => {
                if(validarFormInscripcion()){
                    datosDePago(contenedorDatosDePago);
                }
            });
        }else{
            mostrarFormularioDatos.classList.add("hidden");
        }
    });
}

function validarFormInscripcion() {
    const razonSocial = document.getElementById("razon").value;
    const direccion = document.getElementById("direccion").value;
    const cuit = document.getElementById("cuit").value;
    if (!razonSocial || !direccion || !cuit) {
        mostrarMensajePor5Segundos('Todos los campos son requeridos.',"mensajeFactura");
        return false;
    }
    if (!validator.isNumeric(cuit) || !validator.isInt(cuit, { min: 10000000000, max: 40000000000 })) {
        mostrarMensajePor5Segundos('El cuit debe ser un número valido de 11 digitos.',"mensajeFactura");
        return false;
    }
    return true;
}

function datosDePago(contenedor) {
    contenedor.classList.remove("hidden");
    contenedor.innerHTML =
        `<label for="pago">Seleccion:</label>
    <select id="pago">
    <option value="">Modo de pago</option>
    <option value="a">Efectivo</option>
    <option value="b">Tarjeta</option>
    </select><br/>

    <div id="mostrarFormularioPago" class="hidden">
    <form id="formularioTarjeta">
        <label for="activar">Quiere dejarnos sus datos de la tarjeta</label><br>
        <label for="tarjeta">Tarjeta: </label>
        <input type="text" id="tarjeta" /><br>
        <label for="fecha-exp">Fecha Expiración: </label>
        <input type="text" id="fechaexp" />
        <div id="mensajePago" ></div>
        <button type="button" id="cargarDatosPago">Cargar datos</button><hr>
    </form>
    </div>`

    const selectPago = document.getElementById("pago");
    const mostrarFormularioPago = document.getElementById("mostrarFormularioPago");
    const btnCargarDatosPago = document.getElementById("cargarDatosPago");

    selectPago.addEventListener("change", () => {
        if (selectPago.value === "b") {
            mostrarFormularioPago.classList.remove("hidden");
            btnCargarDatosPago.addEventListener('click', () => {
                if(validarFormPago()){
                    botonVaciarCarrito.classList.remove("hidden");
                }
            });
        } else if (selectPago.value === "a"){
            mostrarFormularioPago.classList.add("hidden");
            botonVaciarCarrito.classList.remove("hidden");
        }else{
            mostrarFormularioPago.classList.add("hidden");
            botonVaciarCarrito.classList.add("hidden");
        }
    });

}

function validarFormPago() {
    const numeroTargeta = document.getElementById("tarjeta").value;
    const fechaExp = document.getElementById("fechaexp").value;
    if (!numeroTargeta || !fechaExp) {
        mostrarMensajePor5Segundos('Todos los campos son requeridos.',"mensajePago");
        return false;
    }
    if (!validator.isNumeric(numeroTargeta)) {
        mostrarMensajePor5Segundos('La tarjeta debe ser un número valido',"mensajePago");
        return false;
    }
    if (!validator.isDate(fechaExp)) {
        mostrarMensajePor5Segundos('La fecha debe tener dormato año/mes/dia.',"mensajePago");
        return false;
    }
    return true;
}

function resetSelect() {
    const selectElement = document.getElementById('pago');
    selectElement.selectedIndex = 0; 
    const contenedorDatosDePago = document.getElementById("datosPago");
    contenedorDatosDePago.classList.add("hidden");
  }
 
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
    resetSelect()
    botonVaciarCarrito.classList.add("hidden");
    actualizarCarrito();
});
 




//Logica para mostrar el localStore de la ultima publicacion vista

const ultimoProducto = localStorage.getItem("ultimoProducto");
const ultimoProductoImagen = localStorage.getItem("ultimoProductoImagen");

ultimoProductoImagen && ultimoProducto ? (() => {
    const ultimoProductoElement = document.getElementById("ultimoProducto");
    ultimoProductoElement.textContent = ultimoProducto;
    let srcImagenUltimoProducto = "";
    const miDiv = document.getElementById("miDiv");
    const imagen = document.createElement("img");
    imagen.src = ultimoProductoImagen;
    imagen.classList.add("imagenUltimoProducto");
    miDiv.appendChild(imagen);
})() : null;










//Logica para mostrar la lista de productos
let listaVisible = false
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







// A partir de aca es la logica para la opcion modificar lista del menu
//Se crean los botones para modificar la lista
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
botonModificar.classList.add('botonEstilo');
botonAgregar.classList.add('botonEstilo');
botonEliminar.classList.add('botonEstilo');
botonTomarDatos.classList.add('botonEstilo');

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
    <form id="form" >
        <input name="codigo" id="codigo" type="text" class="mb-1" placeholder="Codigo" />
        <input name="descripcion" id="descripcion"  type="text" class="mb-1 mt-4" placeholder="Descripcion" />
        <select id="proveedor" class="mb-1">
            <option value="">Proveedor</option>
            <option value="Lenovo">Lenovo</option>
            <option value="Samsung">Samsung</option>
            <option value="Sony">Sony</option>
        </select>
        <input name="precio" id="precio" type="text" class="mb-1" placeholder="Precio" />
        <input name="stock" id="stock" type="text" class="mb-1" placeholder="Stock" />
        <input name="imagen" id="imagen" type="text" class="mb-1" placeholder="Ruta de imagen" />
    </form>
    `
}

let codigo;
let descripcion;
let proveedor;
let precio;
let stock;
let imagen;
let id;

function mostrarMensajePor10Segundos(string) {
    const mensaje = document.getElementById("mensaje");
    mensaje.innerHTML = string;
    mensaje.style.display = "block";
    setTimeout(function () {
        mensaje.style.display = "none";
    }, 3000);
}

function validarFormulario(codigo, descripcion, proveedor, precio, stock, imagen) {

    if (!codigo || !descripcion || !proveedor || !precio || !stock || !imagen) {
        mostrarMensajePor10Segundos('Todos los campos son requeridos.');
        return false;
    }

    if (!validator.isNumeric(codigo) || !validator.isInt(codigo, { min: 100, max: 999 })) {
        mostrarMensajePor10Segundos('El código debe ser un número entre 100 y 999.');
        return false;
    }

    if (!validator.isNumeric(precio) || !validator.isNumeric(stock)) {
        mostrarMensajePor10Segundos('Precio y stock deben ser números.');
        return false;
    }

    return true;
}

botonAgregar.addEventListener("click", () => {
    codigo = document.getElementById("codigo").value;
    descripcion = document.getElementById("descripcion").value;
    proveedor = document.getElementById("proveedor").value;
    precio = document.getElementById("precio").value;
    stock = document.getElementById("stock").value;
    imagen = document.getElementById("imagen").value;
    if (validarFormulario(codigo, descripcion, proveedor, precio, stock, imagen)) {
        codigo = parseInt(codigo);
        precio = parseInt(precio);
        stock = parseInt(stock);
        let producto = arrayProductos.find(producto => producto.codigo === codigo);
        if (producto) {
            mostrarMensajePor10Segundos('El código ya esta en uso');
        } else {
            id = obtenerIdUltimoProducto(arrayProductos);
            id++;
            const producto = new Producto(id, codigo, descripcion, proveedor, precio, stock, imagen);
            agregarElementoALaLista(producto, arrayProductos);
            enviarDatosALaAPI(producto);
            mostrarMensajePor10Segundos("Se cargo el producto")
            limpiarFormulario()
        }

    }
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
    mostrarMensajePor10Segundos("Se encontro el producto");
});

botonModificar.addEventListener("click", () => {
    codigo = document.getElementById("codigo").value;
    descripcion = document.getElementById("descripcion").value;
    proveedor = document.getElementById("proveedor").value;
    precio = document.getElementById("precio").value;
    stock = document.getElementById("stock").value;
    imagen = document.getElementById("imagen").value;
    if (validarFormulario(codigo, descripcion, proveedor, precio, stock, imagen)) {
        codigo = parseInt(codigo);
        const objetoAModificar = arrayProductos.find(objeto => objeto.codigo === codigo);
        id = objetoAModificar.id;
        precio = parseInt(precio);
        stock = parseInt(stock);
        producto = new Producto(id, codigo, descripcion, proveedor, precio, stock, imagen);
        modificarObjetoEnApi(id, producto);
        Object.assign(objetoAModificar, producto);
        mostrarMensajePor10Segundos("Se modifico el producto");
        limpiarFormulario()
    }
});

botonEliminar.addEventListener("click", () => {
    codigo = parseInt(document.getElementById("codigo").value);
    const objetoAModificar = arrayProductos.find(objeto => objeto.codigo === codigo);
    console.log(objetoAModificar);
    id = objetoAModificar.id;
    eliminarProductoPorCodigo(arrayProductos, codigo);
    mostrarMensajePor10Segundos("Se borro el producto");
    borrarDatosApi(id);
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






//Logica con funciones para la comunicacion con la API

const url = 'https://650c46d147af3fd22f67653e.mockapi.io/Productos';

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
        return data

    } catch (error) {
        console.error('Error:', error.message);
    }

};

const borrarDatosApi = async (producto) => {
    try {
        const response = await fetch(`${url}/${producto}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al borrar datos a la API');
        }

        const data = await response.json();
        console.log('Datos enviados a la API:', data);

    } catch (error) {
        console.error('Error:', error.message);
    }

};

const modificarObjetoEnApi = async (id, objeto) => {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objeto)
        });

        if (!response.ok) {
            throw new Error('Error al modificar datos en la API');
        }

        const data = await response.json();
        console.log('Datos modificados en la API:', data);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

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


//Logica para el boton salir, cierra la pagina
const salir = document.getElementById("botonSalir");
botonSalir.addEventListener("click", () => {
    window.close();
});
