import { showToast } from "./toast.js";

function quantity(prod) {
    let cartLStorage = JSON.parse(localStorage.getItem('prodCart')) || [];
    let existIndex = cartLStorage.findIndex((p) => p.id === prod.id);
    
    if (existIndex === -1) {
        prod.quantity = 1;
        cartLStorage.push(prod);
    } else {
        cartLStorage[existIndex].quantity += 1;
    }

    localStorage.setItem('prodCart', JSON.stringify(cartLStorage));
}


export function modal(prod) {
    let modal = document.querySelector('#modal');

    let cardDescription = `
        <div class="modal-dialog text-center mb-3" style="width: 18rem;">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="card-body">
                        <h5 class="modal-title mb-2">${prod.title} - $${prod.price}</h5>
                        <img src='${prod.image}' class="img-fluid" alt="${prod.title}">
                        <p class="card-text">${prod.description}</p>
                        <button type="button" class="btn btn-success" id="buy-${prod.id}">Buy</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Return</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.innerHTML = cardDescription;

    let btnBuy = document.querySelector(`#buy-${prod.id}`);
    btnBuy.addEventListener('click', () => {
        quantity(prod); 
        showToast(prod);
    });

    const myModal = new bootstrap.Modal(modal);
    myModal.show();
}

