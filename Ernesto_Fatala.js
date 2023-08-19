class Producto {
    constructor(codigo, nombre, proveedor, precio, stock) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.proveedor = proveedor;
        this.precio = precio;
        this.stock = stock;
    }
    sumarIva() {
        return this.precio = (this.precio * 1.21);
    }
    mostrarProducto() {
        return `Codigo ${this.codigo} El producto ${this.nombre} con el del proveedor ${this.proveedor} tiene un valor final de ${this.precio} y hay en stock ${this.stock} productos`;
    }
}

let arrayProductos = [
    /*new Producto(100, "Celular", "Proveedor 1", 100, 50),
    new Producto(101, "Televisor", "Proveedor 2", 150, 30),
    new Producto(102, "Consola", "Proveedor 1", 200, 20),
    new Producto(103, "Telefono", "Proveedor 3", 80, 10),
    new Producto(104, "Sillon", "Proveedor 2", 120, 15),
    new Producto(105, "Heladera", "Proveedor 3", 300, 5),
    new Producto(106, "Estufa", "Proveedor 1", 250, 8),
    new Producto(107, "Mesa", "Proveedor 2", 180, 25),*/
    new Producto(108, "Monitor", "Proveedor 3", 90, 40),
    new Producto(109, "Escritorio", "Proveedor 1", 220, 18),
];
function agregarUnProductoLista(producto, lista) {
    lista.push(producto);
}

function obtenerCodigoUltimoProducto(arrayDeProductos) {
    const ultimoProducto = arrayDeProductos[arrayDeProductos.length - 1];
    let ultimoCodigo;
    if(ultimoProducto){
        ultimoCodigo = parseInt(ultimoProducto.codigo);
        return ultimoCodigo;
    }else{
        alert("Hubo un problema al buscar el ultimo codigo");
    }
}

function mostrarListaDeProductos(productos) {
    let listaProductos = "";
    productos.forEach(producto => {
        listaProductos += producto.mostrarProducto() + "\n\n";
    });
    alert("Lista de Productos:\n" + listaProductos);
}

function buscarProductoPorCodigo(codigo, productos) {
    const producto = productos.find(producto => producto.codigo == codigo);
    if(producto){
        alert("Producto encontrado");
        return producto;
    }else{
        alert("Producto no encontrado");
    }
}

function eliminarProductoDeLaLista(lista, elemento) {
    const indice = lista.indexOf(elemento);
    if (indice !== -1) {
        lista.splice(indice, 1);
        return true;
    } else {
        return false;
    }
}

let arrayFactura = [];

function agregarUnProductoFactura(producto, lista) {
    lista.push(producto);
}

function menuVentas() {
    let banderaVentas=true;
    while (banderaVentas) {
        const opcion = prompt("Elija una de las siguientes opciones\n1)Listar productos\n2)Cargar productos de la venta\n3)Quitar producto de la venta\n4)Confirmar la venta\n5)Volver al menu principal");
        let producto;
        switch (opcion) {
            case '1':
                mostrarListaDeProductos(arrayProductos);
                break;
            case '2':
                let codigo = parseInt(prompt("Indique el codigo para cargar el producto en la factura"));
                producto = buscarProductoPorCodigo(codigo, arrayProductos);
                if(producto != null) {
                    agregarUnProductoFactura(producto, arrayFactura);
                }
                if(arrayFactura.length === 0){
                    alert("La factura esta vacia");
                }else{
                    mostrarListaDeProductos(arrayFactura);
                }

                break;
            case '3':
                if(arrayFactura.length === 0){
                    alert("La factura esta vacia");
                }else{
                    mostrarListaDeProductos(arrayFactura);
                    let codigo = parseInt(prompt("Indique el codigo para quitar el producto en la factura"));
                    producto = buscarProductoPorCodigo(codigo, arrayFactura);
                    if(eliminarProductoDeLaLista(arrayFactura, producto)== true){
                        alert("El producto se quito de la factura");
                        mostrarListaDeProductos(arrayFactura);
                    }else{
                        alert("Hubo un error");
                    }
                }

                break;
            case '4':
                break;
            case '5':
                banderaVentas=false;
                menuPrincipal();
                break;
            default:
                alert("Opcion incorrecta");
                break;
        }
    }
}

function menuCompras() {
    const opcion = prompt("Elija una de las siguientes opciones\n1)Listar Proveedores\n2)Cargar productos para la compra\n3)Quitar producto de la compra\n4)Confirmar la compra\n5)Volver al menu principal");
    switch (opcion) {
        case '1':
            break;
        case '2':
            break;
        case '3':
            break;
        case '4':
            break;
        case '5':
            menuPrincipal();
            break;
        default:
            alert("Opcion incorrecta");
            break;
    }
}

function menuModificacion() {
    const opcion = prompt("Elija una de las siguientes opciones\n1)Dar de alta un producto\n2)Dar de baja un producto\n3)Volver al menu");
    let codigo;
    let productoAQuitar;
    switch (opcion) {
        case '1':
            codigo = obtenerCodigoUltimoProducto(arrayProductos);
            codigo = codigo + 1;
            const nombre = prompt("Nombre del producto");
            const proveedor = prompt("Nombre del proveedor");
            const precio = parseInt(prompt("Precio del prodcuto"));
            const stock = parseInt(prompt("Stock del producto"));
            const producto = new Producto(codigo, nombre, proveedor, precio, stock);
            agregarUnProductoLista(producto, arrayProductos);
            break;
        case '2':
            codigo=prompt("Codigo del producto");
            productoAQuitar = buscarProductoPorCodigo(codigo, arrayProductos);
            if(eliminarProductoDeLaLista(arrayProductos, productoAQuitar)== true){
                alert("El producto se quito de la factura");
                mostrarListaDeProductos(arrayProductos);
            }else{
                alert("Hubo un error");
            }
            break;
        case '3':
            menuPrincipal();
            break;
        default:
            alert("Opcion incorrecta");
            break;
    }
}


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

menuPrincipal();