export function addToCart() {
    let cartLs = JSON.parse(localStorage.getItem('prodCart'));
    let sideBarCart = document.querySelector('#sideBarCart');
    sideBarCart.innerHTML = '';

    cartLs.forEach((p) => {
        let card = `
            <div class="card mb-3" style="max-width: 540px;" id='card-${p.id}'>
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${p.image}" class="img-fluid rounded-start" alt="${p.title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${p.title}</h5>
                            <button type="button" class="btn btn-danger" id="btnRest-${p.id}">-</button>
                            <span id="quant-${p.id}" class='m-2 fw-bold'>${p.quantity}</span>
                            <button type="button" class="btn btn-success" id="btnSum-${p.id}">+</button>
                            <h6 class="m-2">Total: $<span id="totalPrice-${p.id}">${p.price * p.quantity}</span></h6>
                            <button type="button" class="btn btn-warning" id="btnDelete-${p.id}">delete</button>

                        </div>
                    </div>
                </div>
            </div>
        `;
        sideBarCart.innerHTML += card;
    });

    cartLs.forEach((p) => {
        let quant = document.querySelector(`#quant-${p.id}`);
        let totalPrice = document.querySelector(`#totalPrice-${p.id}`);
        let btnSum = document.querySelector(`#btnSum-${p.id}`);
        let btnRest = document.querySelector(`#btnRest-${p.id}`);
        let btnDelete = document.querySelector(`#btnDelete-${p.id}`);
        let card = document.querySelector(`#card-${p.id}`);
        
        btnRest.disabled = p.quantity === 1;

        btnRest.addEventListener('click', () => {
            if (p.quantity > 1) {
                p.quantity -= 1;
                quant.innerHTML = p.quantity;
                totalPrice.innerHTML = (p.price * p.quantity);
                localStorage.setItem('prodCart', JSON.stringify(cartLs));
            }
            btnRest.disabled = p.quantity === 1;
        });

        btnSum.addEventListener('click', () => {
            p.quantity += 1;
            quant.innerHTML = p.quantity;
            totalPrice.innerHTML = (p.price * p.quantity);
            localStorage.setItem('prodCart', JSON.stringify(cartLs));
            btnRest.disabled = false;
        });

        btnDelete.addEventListener('click', () => {
            if(confirm('¿Estás seguro de eliminar este producto?')){
            let index = cartLs.findIndex((e) => e.id === p.id);
            cartLs.splice(index, 1);
            localStorage.setItem('prodCart', JSON.stringify(cartLs));
            card.remove();}
        });
    });
}    
