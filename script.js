let pedido = [];

const botonesAgregar = document.querySelectorAll(".agregar");
const listaPedido = document.getElementById("listaPedido");
const totalElemento = document.getElementById("total");
const realizarBtn = document.getElementById("realizarBtn");
const buscarBtn = document.getElementById("buscarBtn");

botonesAgregar.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const nombre = boton.dataset.nombre;
        const precio = parseFloat(boton.dataset.precio);

        pedido.push({
            nombre: nombre,
            precio: precio
        });

        actualizarPedido();

        mostrarMensaje(nombre + " agregado al pedido");

    });

});

function actualizarPedido() {

    listaPedido.innerHTML = "";

    if (pedido.length === 0) {

        listaPedido.innerHTML =
            '<p class="pedido-vacio">Tu pedido está vacío</p>';

        totalElemento.textContent = "$0.00";

        return;
    }

    pedido.forEach(function(producto, indice) {

        const productoDiv = document.createElement("div");

        productoDiv.classList.add("producto-pedido");

        productoDiv.innerHTML = `
            <span>☕</span>

            <div>
                <strong>${producto.nombre}</strong>
                <p>$${producto.precio.toFixed(2)}</p>
            </div>

            <button onclick="eliminarProducto(${indice})">
                ×
            </button>
        `;

        listaPedido.appendChild(productoDiv);

    });

    let total = 0;

    pedido.forEach(function(producto) {
        total += producto.precio;
    });

    totalElemento.textContent = "$" + total.toFixed(2);

}

function eliminarProducto(indice) {

    pedido.splice(indice, 1);

    actualizarPedido();

    mostrarMensaje("Producto eliminado");

}

realizarBtn.addEventListener("click", function() {

    if (pedido.length === 0) {

        alert("Tu pedido está vacío. Agrega algún producto.");

        return;
    }

    let total = 0;

    pedido.forEach(function(producto) {
        total += producto.precio;
    });

    alert(
        "¡Pedido realizado con éxito! ☕\n\n" +
        "Total a pagar: $" +
        total.toFixed(2)
    );

    pedido = [];

    actualizarPedido();

});

buscarBtn.addEventListener("click", function() {

    document.getElementById("productos").scrollIntoView({
        behavior: "smooth"
    });

});

const categorias = document.querySelectorAll(".categoria");
const tarjetas = document.querySelectorAll(".tarjeta");

categorias.forEach(function(categoria) {

    categoria.addEventListener("click", function() {

        categorias.forEach(function(c) {
            c.classList.remove("activa");
        });

        categoria.classList.add("activa");

        const categoriaSeleccionada =
            categoria.dataset.categoria;

        tarjetas.forEach(function(tarjeta) {

            if (
                categoriaSeleccionada === "todos" ||
                tarjeta.dataset.categoria === categoriaSeleccionada
            ) {

                tarjeta.style.display = "block";

            } else {

                tarjeta.style.display = "none";

            }

        });

    });

});

function mostrarMensaje(texto) {

    let mensaje = document.querySelector(".mensaje");

    if (!mensaje) {

        mensaje = document.createElement("div");

        mensaje.classList.add("mensaje");

        document.body.appendChild(mensaje);

    }

    mensaje.textContent = texto;

    mensaje.style.display = "block";

    setTimeout(function() {

        mensaje.style.display = "none";

    }, 2000);

}