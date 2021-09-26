/*LocalStore*/
class Carro{
    comprarProducto(event){
    if(event.target.classList.contains('comprarButton')){
        const producto = event.target.parentElement.parentElement;
        this.addItemToShoppingCart(producto);
    } 
}
guardarProductosLocalStorage(producto){
    let productos;
    productos = this.obtenerProductosLocalStorage();
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos));
}

obtenerProductosLocalStorage(){
    let productoLS;

  
    if(localStorage.getItem('productos') === null){
        productoLS = [];
    }
    else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
    }
    return productoLS;
}
leerLocalStorage(){
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.itemImg}" width=100>
            </td>
            <td>${producto.itemTitle}</td>
            <td>${producto.itemPrice}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
        `;
        listaProductos.appendChild(row);
    });
}
leerLocalStorageCompra(){
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.itemImg}" width=100>
            </td>
            <td>${producto.itemTitle}</td>
            <td>${producto.itemPrice}</td>
            <td>
                <input type="number" class="form-control cantidad" min="1" value=${producto.shoppingCartItemQuantity}>
            </td>
            <td id='subtotales'>${producto.itemPrice * producto.shoppingCartItemQuantity}</td>
            <td>
                <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
            </td>
        `;
        listaCompra.appendChild(row);
    });
}
eliminarProductoLocalStorage(productoID){
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function(productoLS, index){
        if(productoLS.id === productoID){
            productosLS.splice(index, 1);
        }
    });
    
    localStorage.setItem('productos', JSON.stringify(productosLS));
}
vaciarLocalStorage(){
    localStorage.clear();
}

}