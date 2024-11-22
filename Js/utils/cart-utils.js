export function listenToCartChanges() {
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    originalSetItem.apply(this, arguments);
    if (key === "prodCart") {
      updateCartBadge();
    }
  };

  function updateCartBadge() {
    const cartLs = JSON.parse(localStorage.getItem("prodCart")) || [];
    const totalItems = cartLs.reduce((sum, item) => sum + item.quantity, 0);

    const btnSideBar = document.querySelector("#btnSideBar");
    if (btnSideBar) {
      btnSideBar.innerHTML = `
          <i class="bi bi-cart"></i>
          ${
            totalItems > 0
              ? `
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              ${totalItems}
            </span>
          `
              : ""
          }
        `;

      if (!btnSideBar.classList.contains("position-relative")) {
        btnSideBar.classList.add("position-relative");
      }
    }
  }

  updateCartBadge();
}
