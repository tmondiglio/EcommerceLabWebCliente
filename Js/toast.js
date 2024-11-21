export function showToast(prod) {
  Swal.fire({
    icon: "success",
    title: "Producto agregado",
    text: `¡El producto "${prod.title}" se agregó a tu carrito!`,
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  });
}

export function deleteProduct(productId, cartLs, cardElement, sideBarCart, offcanvasElement) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El producto será eliminado del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const index = cartLs.findIndex((p) => p.id === productId);
        if (index !== -1) {
          cartLs.splice(index, 1);
          localStorage.setItem("prodCart", JSON.stringify(cartLs));
          cardElement.remove();
        }
        if (cartLs.length === 0) {
          sideBarCart.innerHTML = "";
          const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
          offcanvas.hide();
        }
        Swal.fire(
          "¡Eliminado!",
          "El producto fue eliminado del carrito.",
          "success"
        );
      }
    });
  }

export function emptyCart(cartLs, sideBarCart, offcanvasElement) {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminarán todos los productos del carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.setItem("prodCart", JSON.stringify([]));
      sideBarCart.innerHTML = "";
      Swal.fire("¡Vaciado!", "El carrito ha sido vaciado.", "success");
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      offcanvas.hide();
    }
  });
}

export function checkout(cartLs, sideBarCart, offcanvasElement) {
  Swal.fire({
    title: "¡Compra finalizada!",
    text: "Gracias por tu compra.",
    icon: "success",
    confirmButtonText: "Aceptar",
  }).then(() => {
    localStorage.setItem("prodCart", JSON.stringify([]));
    sideBarCart.innerHTML = "";
    const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvas.hide();
  });
}
