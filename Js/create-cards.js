import { getProducts } from "./api.js"
import { modal } from "./modal.js";

export function createCards() {

    getProducts().then((data) => {

        let cardDiv = document.querySelector('#cards')

        data.forEach((prod) => {
            let card = `
            <div class="card border-success p-3" style='max-width: 300px;' >
            <img src="${prod.image}" class="card-img-top" alt="${prod.title}" >
            <div class="card-body">
              <h4 class="card-title text-truncate">${prod.title}</h4>
              <h5>$${prod.price}</h5>
              <button type="button" class="btn btn-secondary" id="btn-${prod.id}">Details</button>  
            </div>
          </div>
    `
            cardDiv.innerHTML += card;

            setTimeout(() => {
                let btn = document.querySelector(`#btn-${prod.id}`)
                btn.addEventListener('click', () => {
                    modal(prod)
                })
            }, 0);
        });
    })
}

