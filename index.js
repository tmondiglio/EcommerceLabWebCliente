import { addToCart } from "./Js/cart.js";
import { createCards } from "./Js/create-cards.js";

document.addEventListener('DOMContentLoaded', () => {
    createCards();

    if (localStorage.getItem('prodCart') === null) {
        localStorage.setItem('prodCart', JSON.stringify([]));
    }

    let btnSideBar = document.querySelector('#btnSideBar');
    btnSideBar.addEventListener('click', () => addToCart());
});
