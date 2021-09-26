/*Menu--------*/
let btnMenu = document.getElementById('btn-menu');
let mainNav = document.getElementById('main-nav');
btnMenu.addEventListener('click', function(){
    mainNav.classList.toggle('mostrar');
});


/* Boton de carrito-------*/
$(document).ready(function() {
    $('a[href^="#"]').click(function() {
      var destino = $(this.hash); 
      $('html, body').animate({ scrollTop: destino.offset().top }, 700);
      return false;
    });
  });

/* Funciones del carrito-------------------------*/
const addToShoppingCartBottons = document.querySelectorAll('.addToCart');
addToShoppingCartBottons.forEach(addToCartBottons => {
    addToCartBottons.addEventListener('click', addToCartClicked);
});
const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonClicked);
const vaciarButton = document.querySelector('.vaciarButton');

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

function addToCartClicked(event){
    const button = event.target;
    const item = button.closest('.product');
  

    const itemTitle = item.querySelector('.product-title').textContent;
    const itemPrice = item.querySelector('.product-price').textContent;
    const itemImg = item.querySelector('.product-img').src;

    addItemToShoppingCart(itemTitle, itemPrice, itemImg);
    
}

function addItemToShoppingCart(itemTitle, itemPrice, itemImg) {
    const elementsTitle = shoppingCartItemsContainer.getElementsByClassName(
      'shoppingCartItemTitle'
    );
    for (let i = 0; i < elementsTitle.length; i++) {
      if (elementsTitle[i].innerText === itemTitle) {
        let elementQuantity = elementsTitle[
          i
        ].parentElement.parentElement.parentElement.querySelector(
          '.shoppingCartItemQuantity'
        );
        elementQuantity.value++;
        updateShoppingCartTotal();
        return;
      }
    }
    const shoppingCartRow = document.createElement('div');
    const shoppingCartContent = `
    <div class="row shoppingCartItem">
    <div class="col-6">
        <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <img src=${itemImg} class="shopping-cart-image">
            <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${itemTitle}</h6>
        </div>
    </div>
    <div class="col-2">
        <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
            <p class="item-price mb-0 shoppingCartItemPrice">${itemPrice}</p>
        </div>
    </div>
    <div class="col-4">
        <div
            class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
            <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
                value="1">
            <button class="btn btn-danger buttonDelete" type="button">X</button>
        </div>
    </div>
</div>`;

shoppingCartRow.innerHTML = shoppingCartContent;
shoppingCartItemsContainer.append(shoppingCartRow);

shoppingCartRow.querySelector('.buttonDelete').addEventListener('click',removeShoppingCartItem);
shoppingCartRow.querySelector('.shoppingCartItemQuantity').addEventListener('change',quantityChanged);

updateShoppingCartTotal();

}

function updateShoppingCartTotal(){
    let total = 0;
    let envio = 1500;
    let adicional = 350;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach(shoppingCartItem =>{
     const shoppingCartItemPriceElement  = shoppingCartItem.querySelector('.shoppingCartItemPrice');
    const shoppimgCartItemPrice = shoppingCartItemPriceElement.textContent.replace('$', '');
    const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');
    const shoppingCartItemQuantity = Number (shoppingCartItemQuantityElement.value);

    total = total + shoppimgCartItemPrice * shoppingCartItemQuantity + adicional;
    });
    shoppingCartTotal.innerHTML = `$${total + envio}`;

}
function removeShoppingCartItem(event){
    const buttonClicked = event.target;
    buttonClicked.closest('.shoppingCartItem').remove();
    updateShoppingCartTotal();
}
function quantityChanged(event){
    const input = event.target;
    input.value <= 0 ? (input.value = 1) : null;
    updateShoppingCartTotal();
}

function comprarButtonClicked(){
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}
function vaciarCarrito() {
    shoppingCartItemsContainer.innerHTML = '';
    updateShoppingCartTotal();
}
vaciarButton.addEventListener('click', vaciarCarrito);

/*Validar Usuario*/
function ValidarUsuario(){

    if (document.form.password.value=='CONTRASEÑA' && document.form.login.value=='USUARIO'){ 
        document.form.submit(); 
        } 
    else{ 
             alert("Porfavor ingrese, nombre de usuario y contraseña correctos."); 
        } 
}

