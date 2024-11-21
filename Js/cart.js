import { deleteProduct, emptyCart, checkout } from "./toast.js";

export function addToCart() {
  let cartLs = JSON.parse(localStorage.getItem("prodCart")) || [];
  let sideBarCart = document.querySelector("#sideBarCart");
  sideBarCart.innerHTML = "";

  cartLs.forEach((p) => {
    let card = `
            <div class="card mb-3" style="max-width: 540px;" id="card-${p.id}">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${
                          p.image
                        }" class="img-fluid rounded-start" alt="${p.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${p.title}</h5>
                            <button type="button" class="btn btn-danger" id="btnRest-${
                              p.id
                            }">-</button>
                            <span id="quant-${p.id}" class="m-2 fw-bold">${
      p.quantity
    }</span>
                            <button type="button" class="btn btn-success" id="btnSum-${
                              p.id
                            }">+</button>
                            <h6 class="m-2">Total: $<span id="totalPrice-${
                              p.id
                            }">${p.price * p.quantity}</span></h6>
                              <button type="button" class="btn btn-outline-danger" id="btnDelete-${
                                p.id
                              }">
        <i class="bi bi-trash"></i>
    </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    sideBarCart.innerHTML += card;
  });

  if (cartLs.length > 0) {
    sideBarCart.innerHTML += `
            <div class="d-grid gap-2 mt-3">
                <button type="button" class="btn btn-danger" id="btnEmptyCart">
                    <i class="bi bi-trash3 me-2"></i>Vaciar Carrito
                </button>
                <button type="button" class="btn btn-success" id="btnCheckout">
                    <i class="bi bi-bag-check me-2"></i>Finalizar Compra
                </button>
            </div>
        `;
  }

  cartLs.forEach((p) => {
    let quant = document.querySelector(`#quant-${p.id}`);
    let totalPrice = document.querySelector(`#totalPrice-${p.id}`);
    let btnSum = document.querySelector(`#btnSum-${p.id}`);
    let btnRest = document.querySelector(`#btnRest-${p.id}`);
    let btnDelete = document.querySelector(`#btnDelete-${p.id}`);
    let card = document.querySelector(`#card-${p.id}`);

    btnRest.disabled = p.quantity === 1;

    btnRest.addEventListener("click", () => {
      if (p.quantity > 1) {
        p.quantity -= 1;
        quant.innerHTML = p.quantity;
        totalPrice.innerHTML = p.price * p.quantity;
        localStorage.setItem("prodCart", JSON.stringify(cartLs));
      }
      btnRest.disabled = p.quantity === 1;
    });

    btnSum.addEventListener("click", () => {
      p.quantity += 1;
      quant.innerHTML = p.quantity;
      totalPrice.innerHTML = p.price * p.quantity;
      localStorage.setItem("prodCart", JSON.stringify(cartLs));
      btnRest.disabled = false;
    });

    btnDelete.addEventListener("click", () => {
      deleteProduct(p.id, cartLs, card, sideBarCart, offcanvasElement);
    });
  });

  const btnEmptyCart = document.querySelector("#btnEmptyCart");
  const btnCheckout = document.querySelector("#btnCheckout");
  const offcanvasElement = document.querySelector("#offcanvasRight");

  if (btnEmptyCart) {
    btnEmptyCart.addEventListener("click", () => {
      emptyCart(cartLs, sideBarCart, offcanvasElement);
    });
  }

  if (btnCheckout) {
    btnCheckout.addEventListener("click", () => {
      checkout(cartLs, sideBarCart, offcanvasElement);
    });
  }
}
