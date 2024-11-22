import { addToCart } from "./Js/cart.js";
import { createCards } from "./Js/create-cards.js";
import { listenToCartChanges } from "./Js/utils/cart-utils.js";

document.addEventListener('DOMContentLoaded', () => {
    createCards();

    if (localStorage.getItem('prodCart') === null) {
        localStorage.setItem('prodCart', JSON.stringify([]));
    }

    listenToCartChanges()

    let btnSideBar = document.querySelector('#btnSideBar');
    btnSideBar.addEventListener('click', () => addToCart());
});
