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
function agregarUnProductoLista(producto, lista) {
    lista.push(producto);
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


function menuVentas() {
    const opcion = prompt("Elija una de las siguientes opciones\n1)Listar productos\n2)Cargar productos de la venta\n3)Quitar producto de la venta\n4)Confirmar la venta\n5)Volver al menu principal");
    switch (opcion) {
        case '1':
            mostrarListaDeProductos(arrayProductos);
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
    switch (opcion) {
        case '1':
            const nombre = prompt("Nombre del producto");
            const proveedor = prompt("Nombre del proveedor");
            const precio = parseInt(prompt("Precio del prodcuto"));
            const stock = parseInt(prompt("Stock del producto"));
            const producto = new Producto(nombre, proveedor, precio, stock);
            agregarUnProductoLista(producto, arrayProductos);
            break;
        case '2':
            const codigo=prompt("Codigo del producto");
            buscarProductoPorCodigo(codigo, arrayProductos);
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