
export function showToast(prod){

    let divToast = document.querySelector('#toast')
    
    let htmlToast = `
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <strong class="me-auto">${prod.title}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    ¡Producto agregado al carrito!
                </div>
            </div>
    `
    divToast.innerHTML = htmlToast;

    let toastElement = document.querySelector('#liveToast');
    let toast = new bootstrap.Toast(toastElement, {
        delay: 1000,  
        autohide: true 
    });
    toast.show();
}