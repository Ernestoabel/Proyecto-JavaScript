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
}

//Hardcodeo de productos en un array principal de productos
let arrayProductos = [
    new Producto(100, "Lenovo tablet", "Lenovo", 100, 50,"Imagenes/LenovoProductoUno.webp"),
    new Producto(101, "Lenovo all in one", "Lenovo", 150, 30,"Imagenes/LenovoProductoDos.webp"),
    new Producto(102, "Lenovo notebook", "Lenovo", 200, 20,"Imagenes/LenovoProductoTres.webp"),
    new Producto(103, "Samsung celular", "Samsung", 80, 10,"Imagenes/ProductoSamsungUno.webp"),
    new Producto(104, "Samsung tablet", "Samsung", 120, 15,"Imagenes/ProductoSamsungDos.png"),
    new Producto(105, "Samsung heladera", "Samsung", 300, 5,"Imagenes/ProductoSamsungTres.webp"),
    new Producto(106, "Sony reproductor", "Sony", 250, 8,"Imagenes/ProductoSonyUno.avif"),
    new Producto(107, "Sony joystick", "Sony", 180, 25,"Imagenes/ProductoSonyDos.jpg"),
    new Producto(108, "Sony camara", "Sony", 90, 40,"Imagenes/ProductoSonyTres.webp"),
];

//Funcion para agregar elementos a una lista
function agregarElementoALaLista(producto, lista) {
    lista.push(producto);
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

//Funcion para buscar un producto en un array, retornarlo si este exciste segun el parametro a igualar
function buscarProductoPorCodigo(codigo, productos) {
    const producto = productos.find(producto => producto.codigo === codigo);
    if (producto) {
        return producto;
    } else {
        alert("Producto no encontrado");
    }
}

//Funcion para eliminar un producto de la lista
function eliminarProductoDeLaLista(lista, elemento) {
    const indice = lista.indexOf(elemento);
    if (indice !== -1) {
        lista.splice(indice, 1);
        return true;
    } else {
        return false;
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

//Funcion para crear un string completo con la factura realizada para luego ser guardado en el arrayDeFacturas
function concatenarArrayEnUnString(numero, lista, totalSuma) {
    let encabezado = "Factura numero " + numero + "\n";
    let listaProductos = "";
    lista.forEach(producto => {
        listaProductos += producto.mostrarProducto() + "\n";
    });
    totalSuma = "El valor total de la factura es : " + totalSuma + " pesos\n";
    return encabezado + listaProductos + totalSuma;
}

//Funcion para sumar el total de una factura
function sumarPrecioProductosSeleccionados(productos) {
    let totalSuma = 0;
    for (const producto of productos) {
        totalSuma += producto.precio;
    }
    return totalSuma;
}


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
        agregarElementoALaLista(producto, arrayFactura);
        actualizarCarrito();
        productoSeleccionado = `El ultimo producto visto es ${producto.nombre}`;
        localStorage.setItem("ultimoProducto", productoSeleccionado);
        localStorage.setItem("ultimoProductoImagen", imagen.alt);
    });
});

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
}

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

function mostrarProductos() {
    const listaProductos = document.getElementById("listaProductos");

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






