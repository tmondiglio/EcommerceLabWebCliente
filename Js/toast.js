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

