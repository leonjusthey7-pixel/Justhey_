const productos = [
  { id: 1, nombre: "Jabón de Coco", precio: 2.00, img: "img_jabones_coco.jpg" },
  { id: 2, nombre: "Jabón de Café y Canela", precio: 2.00, img: "img_jabones_canela.jpg" },
  { id: 3, nombre: "Jabón de Avena y Miel", precio: 5.00, img: "img_jabones_avena.jpg" },
  { id: 4, nombre: "Jabón de Rosas", precio: 3.50, img: "img_jabones_rosas.jpg" },
  { id: 5, nombre: "Jabón de Carbón", precio: 3.50, img: "img_jabones_carbon.jpg" },
  //mascarillas
  { id: 6, nombre: "Mascarilla de Avena", precio: 3.50, img: "img_mascarilla_avena.jpeg" },
  { id: 7, nombre: "Mascarilla de Aloe Vera", precio: 12.00, img: "img_mascarilla_aloe.png" },
  { id: 8, nombre: "Mascarilla de Miel", precio: 12.00, img: "img_mascarilla_miel.jpg" },
  { id: 9, nombre: "Mascarilla de Cafe", precio: 7.50, img: "img_mascarilla_cafe.png" },
  { id: 10, nombre: "Mascarilla de Pepino", precio: 12.00, img: "img_mascarilla_pepino.png" },
  //serums
  { id: 11, nombre: "Serum de Rosa Mosqueta", precio: 25.00, img: "img_serum_rosa_mosqueta.jpg" },
  { id: 12, nombre: "Serum de Te Verde", precio: 22.30, img: "img_serum_te_verde.jpg" },
  { id: 13, nombre: "Serum de Calendula", precio: 26.60, img: "img_serum_calendula.png" },
  { id: 14, nombre: "Serum de Lavanda", precio: 24.20, img: "img_serum_lavanda.jpg" },
  { id: 15, nombre: "Serum de Aceite de Almendras", precio: 22.00, img: "img_serum_aceite_almendras.png" },
  //exfoliantes
  { id: 16, nombre: "Exfoliante de Avena Tostada Fina", precio: 15.00, img: "img_exfoliantes_avena.jpeg" },
  { id: 17, nombre: "Exfoliante de Semillas de Uva", precio: 12.00, img: "img_exfoliantes_uva.jpeg" },
  { id: 18, nombre: "Exfoliante de Arroz Molido", precio: 16.40, img: "img_exfoliantes_arroz.jpeg" },
  { id: 19, nombre: "Exfoliante de Cafe", precio: 14.00, img: "img_exfoliantes_cafe.jpeg" },
  { id: 20, nombre: "Exfoliante de Azucar Morena", precio: 11.25, img: "img_exfoliantes_azucar.jpeg" },
  //tonicos
  { id: 21, nombre: "Tonico de Romero Suave", precio: 8.00, img: "img_tonicos_romero.jpeg" },
  { id: 22, nombre: "Tonico de Pepino Fresco", precio: 7.35, img: "img_tonicos_pepino.jpeg" },
  { id: 23, nombre: "Tonico de Avena Suave", precio: 8.75, img: "img_tonicos_avena.jpeg" },
  { id: 24, nombre: "Tonico de Arroz", precio: 7.00, img: "img_tonicos_arroz.jpeg" },
  { id: 25, nombre: "Tonico de Hamamelis Natural", precio: 12.00, img: "img_tonicos_hamamelis.jpeg" },
  //balsamos
  { id: 26, nombre: "Balsamo de Manzanilla Pura", precio: 5.00, img: "img_balsamos_manzanilla.jpeg" },
  { id: 27, nombre: "Balsamo de Cacao Natural", precio: 6.80, img: "img_balsamos_cacao.jpeg" },
  { id: 28, nombre: "Balsamo de Rosa Silvestre", precio: 5.30, img: "img_balsamos_rosa.jpeg" },
  { id: 29, nombre: "Balsamo de Karité Puro", precio: 6.00, img: "img_balsamos_karite.jpeg" },
  { id: 30, nombre: "Balsamo de Caléndula", precio: 7.25, img: "img_balsamos_calendula.jpeg" },

];

let carrito = [];

const listaCarrito = document.getElementById("lista-carrito");
const totalHTML = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar_carrito");

// AGREGAR PRODUCTO
function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }

  renderCarrito();
}

// RENDER CARRITO
function renderCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((prod, index) => {
    total += prod.precio * prod.cantidad;

    listaCarrito.innerHTML += `
      <div class="item">
        <img src="${prod.img}">
        <p>${prod.nombre}</p>
        <p>$${prod.precio.toFixed(2)}</p>
        <p>${prod.cantidad}</p>
        <p><span onclick="eliminarProducto(${index})">❌</span></p>
      </div>
    `;
  });

  totalHTML.textContent = total.toFixed(2);
}

// ELIMINAR UNO
function eliminarProducto(index) {
  carrito.splice(index, 1);
  renderCarrito();
}

// VACIAR TODO
btnVaciar.addEventListener("click", () => {
  carrito = [];
  renderCarrito();
});
//
const btnComprar = document.getElementById("comprar_carrito");

btnComprar.addEventListener("click", () => {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }

  // Guardar carrito para otra página
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Redirigir a página de compra
  window.location.href = "forma de pago.html";
});

//wasap
