import { getProducts } from "./api.js"
import { modal } from "./modal.js";

export function createCards() {
    getProducts().then((data) => {
        let cardDiv = document.querySelector('#cards');

        data.forEach((prod) => {
            let card = `
                <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                    <div class="card product-card h-100">
                        <div class="img-container">
                            <img src="${prod.image}" 
                                class="card-img-top product-img" 
                                alt="${prod.title}">
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h4 class="card-title product-title text-truncate mb-2" 
                                title="${prod.title}">
                                ${prod.title}
                            </h4>
                            <h5 class="product-price mt-2">$${prod.price.toFixed(2)}</h5>
                            <button type="button" 
                                    class="btn btn-detail mt-auto" 
                                    id="btn-${prod.id}">
                                <i class="fas fa-info-circle me-2"></i>Details
                            </button>  
                        </div>
                    </div>
                </div>`;
            cardDiv.innerHTML += card;

            setTimeout(() => {
                let btn = document.querySelector(`#btn-${prod.id}`);
                btn.addEventListener('click', () => {
                    modal(prod);
                });
            }, 0);
        });
    });
}