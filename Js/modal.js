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
        <div class="modal-dialog modal-dialog-centered" style="max-width: 600px;">
            <div class="modal-content">
                <div class="modal-header border-bottom-0">
                    <h5 class="modal-title fw-bold">${prod.title}</h5>
                    <button type="button" 
                            class="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close">
                    </button>
                </div>
                <div class="modal-body px-4 py-3">
                    <div class="row align-items-center">
                        <div class="col-md-6">
                            <div class="product-image-container">
                                <img src='${prod.image}' 
                                     class="img-fluid rounded product-image" 
                                     alt="${prod.title}">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="product-details">
                                <h3 class="price mb-3">$${prod.price}</h3>
                                <p class="description mb-4">${prod.description}</p>
                                <div class="d-grid gap-2">
                                    <button type="button" 
                                            class="btn btn-primary btn-lg buy-button" 
                                            id="buy-${prod.id}">
                                        <i class="fas fa-shopping-cart me-2"></i>Agregar al carrito
                                    </button>
                                    <button type="button" 
                                            class="btn btn-outline-secondary" 
                                            data-bs-dismiss="modal">
                                        Volver
                                    </button>
                                </div>
                            </div>
                        </div>
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
        bootstrap.Modal.getInstance(modal).hide();
    });

    const myModal = new bootstrap.Modal(modal);
    myModal.show();
}

