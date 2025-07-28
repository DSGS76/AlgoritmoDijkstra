let vertices = [];
let aristas = [];
let aristaIdCounter = 1; // Contador para IDs únicos de aristas

function agregarVertice() {
    const id = prompt("ID del vértice:");
    if (!id || vertices.find(v => v.id === id)) return;
    const etiqueta = prompt("Etiqueta del vértice:", id);
    vertices.push({ id, etiqueta });
    renderVertices();
    renderSelectInicio();
}

function eliminarVertice(id) {
    vertices = vertices.filter(v => v.id !== id);
    aristas = aristas.filter(a => a.inicio !== id && a.fin !== id);
    renderVertices();
    renderAristas();
    renderSelectInicio();
}

function renderVertices() {
    const cont = document.getElementById("vertices-list");
    cont.innerHTML = "";
    vertices.forEach(v =>
        cont.innerHTML += `<div>${v.etiqueta} (${v.id}) <button type="button" onclick="eliminarVertice('${v.id}')">Eliminar</button></div>`
    );
}

function agregarArista() {
    if (vertices.length < 2) {
        alert("Agrega al menos dos vértices primero.");
        return;
    }
    const inicio = prompt("ID del vértice de inicio:");
    const fin = prompt("ID del vértice de fin:");
    if (!inicio || !fin || inicio === fin || !vertices.find(v => v.id === inicio) || !vertices.find(v => v.id === fin)) return;
    const peso = parseInt(prompt("Peso de la arista:"), 10);
    if (isNaN(peso) || peso <= 0) return;
    // Generar un ID único para la arista
    const aristaId = `a${aristaIdCounter++}`;
    aristas.push({ id: aristaId, inicio, fin, peso });
    renderAristas();
}

function eliminarArista(id) {
    aristas = aristas.filter(a => a.id !== id);
    renderAristas();
}

function renderAristas() {
    const cont = document.getElementById("aristas-list");
    cont.innerHTML = "";
    aristas.forEach(a =>
        cont.innerHTML += `<div>${a.inicio} → ${a.fin} (peso: ${a.peso}) <button type="button" onclick="eliminarArista('${a.id}')">Eliminar</button></div>`
    );
}

function renderSelectInicio() {
    const selectInicio = document.getElementById("verticeInicio");
    const selectOrigen = document.getElementById("verticeOrigen");
    const selectDestino = document.getElementById("verticeDestino");
    if (selectInicio) {
        selectInicio.innerHTML = "";
        vertices.forEach(v => {
            const opt = document.createElement("option");
            opt.value = v.id;
            opt.textContent = `${v.etiqueta} (${v.id})`;
            selectInicio.appendChild(opt);
        });
    }
    if (selectOrigen) {
        selectOrigen.innerHTML = "";
        vertices.forEach(v => {
            const opt = document.createElement("option");
            opt.value = v.id;
            opt.textContent = `${v.etiqueta} (${v.id})`;
            selectOrigen.appendChild(opt);
        });
    }
    if (selectDestino) {
        selectDestino.innerHTML = "";
        vertices.forEach(v => {
            const opt = document.createElement("option");
            opt.value = v.id;
            opt.textContent = `${v.etiqueta} (${v.id})`;
            selectDestino.appendChild(opt);
        });
    }
}

window.onload = function() {
    renderVertices();
    renderAristas();
    renderSelectInicio();
};
