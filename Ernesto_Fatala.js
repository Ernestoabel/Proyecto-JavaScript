//Clase con el objeto Producto con tres metodos, uno para sumar IVA al precio, otro para concatenar en un string y mostrar los atributos del objeto
//otro para desminuir el stock al momento de la venta
class Producto {
    constructor(codigo, nombre, proveedor, precio, stock) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.proveedor = proveedor;
        this.precio = precio;
        this.stock = stock;
    }
    sumarIva() {
        this.precio * 1.21;
    }
    mostrarProducto() {
        return `Codigo ${this.codigo} El producto ${this.nombre} con el del proveedor ${this.proveedor} tiene un valor final de ${this.precio} y hay en stock ${this.stock} productos`;
    }
    disminuirStock() {
        this.stock--;
    }
}

//Hardcodeo de productos en un array principal de productos
let arrayProductos = [
    new Producto(100, "Celular", "Proveedor 1", 100, 50),
    new Producto(101, "Televisor", "Proveedor 2", 150, 30),
    new Producto(102, "Consola", "Proveedor 1", 200, 20),
    new Producto(103, "Telefono", "Proveedor 3", 80, 10),
    new Producto(104, "Sillon", "Proveedor 2", 120, 15),
    new Producto(105, "Heladera", "Proveedor 3", 300, 5),
    new Producto(106, "Estufa", "Proveedor 1", 250, 8),
    new Producto(107, "Mesa", "Proveedor 2", 180, 25),
    new Producto(108, "Monitor", "Proveedor 3", 90, 40),
    new Producto(109, "Escritorio", "Proveedor 1", 220, 18),
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

//Funcion para buscar un producto en un array, retornarlo si este exciste segun el parametro a igualar
function buscarProductoPorCodigo(codigo, productos) {
    const producto = productos.find(producto => producto.codigo === codigo);
    if (producto) {
        alert("Producto encontrado");
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
function concatenarArrayEnUnString(numero, lista) {
    let encabezado = "factura numero " + numero + "\n";
    let listaProductos = "";
    lista.forEach(producto => {
        listaProductos += producto.mostrarProducto() + "\n";
    });
    return encabezado + listaProductos;
}

//Funcion del menu de Ventas
function menuVentas() {
    let banderaVentas = true;
    let numeroFactura = 0;
    while (banderaVentas) {
        const opcion = prompt("Elija una de las siguientes opciones\n1)Listar productos\n2)Cargar productos de la venta\n3)Quitar producto de la venta\n4)Confirmar la venta\n5)Volver al menu principal");
        let producto;
        switch (opcion) {
            case '1':
                mostrarListaDeProductos(arrayProductos);
                break;
            case '2':
                //En este caso se cargan productos en la factura, pidiendo si codigo, agrgarlos al arrayFactura y validando que existan
                let codigo = parseInt(prompt("Indique el codigo para cargar el producto en la factura"));
                producto = buscarProductoPorCodigo(codigo, arrayProductos);
                if (producto != null) {
                    producto.sumarIva();
                    producto.disminuirStock();
                    agregarElementoALaLista(producto, arrayFactura);
                }
                if (arrayFactura.length === 0) {
                    alert("La factura esta vacia");
                } else {
                    mostrarListaDeProductos(arrayFactura);
                }

                break;
            case '3':
                //En este caso se quitan productos de la factura antes de ser emitida con validacion
                if (arrayFactura.length === 0) {
                    alert("La factura esta vacia");
                } else {
                    mostrarListaDeProductos(arrayFactura);
                    let codigo = parseInt(prompt("Indique el codigo para quitar el producto en la factura"));
                    producto = buscarProductoPorCodigo(codigo, arrayFactura);
                    if (eliminarProductoDeLaLista(arrayFactura, producto) == true) {
                        alert("El producto se quito de la factura");
                        mostrarListaDeProductos(arrayFactura);
                    } else {
                        alert("Hubo un error");
                    }
                }

                break;
            case '4':
                //En este caso se confirma la factura, se genera un string con la misma completa
                //se utiliza un contador para darle numero a la factura y se guarda en el arraDeFacturas
                //luego se muestran las facturas emitidas y se limpia el arrayFactura, osea la factura emitida
                if (arrayFactura.length === 0) {
                    alert("La factura esta vacia");
                } else {
                    numeroFactura++;
                    let stringFactura = "";
                    stringFactura = concatenarArrayEnUnString(numeroFactura, arrayFactura);
                    agregarElementoALaLista(stringFactura, arrayDeFacturas);
                    alert(arrayDeFacturas);
                    arrayFactura.length = 0;
                }
                break;
            case '5':
                //opcion para volver al menu principal
                banderaVentas = false;
                menuPrincipal();
                break;
            default:
                alert("Opcion incorrecta");
                break;
        }
    }
}

function menuCompras() {
    let producto;
    let banderaCompras = true;
    while (banderaCompras) {
        const opcion = prompt("Elija una de las siguientes opciones\n1)Listar Proveedores\n2)Cargar productos para la compra\n3)Quitar producto de la compra\n4)Confirmar la compra\n5)Volver al menu principal");
        switch (opcion) {
            case '1':
                let pedirProveedor = prompt("Ingrese el nombre del proveedor para ver sus articulos");
                mostrarProductosPorProveedor(pedirProveedor, arrayProductos);
                break;
            case '2':
                producto = buscarProductoPorCodigo(codigo, arrayProductos);
                if (producto != null) {
                    producto.sumarIva();
                    producto.disminuirStock();
                    agregarElementoALaLista(producto, arrayCompras);
                }
                if (arrayCompras.length === 0) {
                    alert("La factura esta vacia");
                } else {
                    mostrarListaDeProductos(arrayCompras);
                }
                break;
            case '3':
                if (arrayCompras.length === 0) {
                    alert("La factura esta vacia");
                } else {
                    mostrarListaDeProductos(arrayCompras);
                    let codigo = parseInt(prompt("Indique el codigo para quitar el producto en la factura"));
                    producto = buscarProductoPorCodigo(codigo, arrayCompras);
                    if (eliminarProductoDeLaLista(arrayCompras, producto) == true) {
                        alert("El producto se quito de la factura");
                        mostrarListaDeProductos(arrayCompras);
                    } else {
                        alert("Hubo un error");
                    }
                }
                break;
            case '4':
                break;
            case '5':
                banderaCompras = false;
                menuPrincipal();
                break;
            default:
                alert("Opcion incorrecta");
                break;
        }
    }
}

//Funcion con el menu para modificar el array de productos
function menuModificacion() {
    const opcion = prompt("Elija una de las siguientes opciones\n1)Dar de alta un producto\n2)Dar de baja un producto\n3)Volver al menu");
    let codigo;
    let productoAQuitar;
    switch (opcion) {
        case '1':
            //se carga un nuevo producto, automatizando el codigo para que sea el siguiente numero al ultimo producto existente
            codigo = obtenerCodigoUltimoProducto(arrayProductos);
            codigo = codigo + 1;
            const nombre = prompt("Nombre del producto");
            const proveedor = prompt("Nombre del proveedor");
            const precio = parseInt(prompt("Precio del prodcuto"));
            const stock = parseInt(prompt("Stock del producto"));
            const producto = new Producto(codigo, nombre, proveedor, precio, stock);
            agregarElementoALaLista(producto, arrayProductos);
            break;
        case '2':
            //se quita un producto de la lista
            codigo = prompt("Codigo del producto");
            productoAQuitar = buscarProductoPorCodigo(codigo, arrayProductos);
            if (eliminarProductoDeLaLista(arrayProductos, productoAQuitar) == true) {
                alert("El producto se quito de la factura");
                mostrarListaDeProductos(arrayProductos);
            } else {
                alert("Hubo un error");
            }
            break;
        case '3':
            //se vuelve al menu principal
            menuPrincipal();
            break;
        default:
            alert("Opcion incorrecta");
            break;
    }
}

//Funcion con el menu principal
function menuPrincipal() {
    let bandera = true;
    while (bandera) {
        const opcion = prompt("Elija una de las siguientes opciones\n1)Menu de ventas\n2)Menu de compras\n3)Menu de modificacion\n4)Salir");
        switch (opcion) {
            case '1':
                menuVentas();
                break;
            case '2':
                menuCompras();
                break;
            case '3':
                menuModificacion();
                break;
            case '4':
                bandera = false;
                break;
            default:
                alert("Opcion incorrecta");
                break;
        }
    }
}

//Arranca el programa
menuPrincipal();