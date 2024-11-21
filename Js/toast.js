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

export function deleteProduct(productId, cartLs, cardElement) {
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
      Swal.fire(
        "¡Eliminado!",
        "El producto fue eliminado del carrito.",
        "success"
      );
    }
  });
}
