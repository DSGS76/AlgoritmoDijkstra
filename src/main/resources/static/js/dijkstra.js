/**
 * verticeOrigen: se usa como vértice de inicio para ambos cálculos
 * verticeDestino: se usa solo para calcular el camino más corto entre dos vértices específicos
 */

function ejecutarDijkstra() {
    if (vertices.length === 0 || aristas.length === 0) {
        alert("Agrega vértices y aristas primero.");
        return;
    }
    const verticeInicio = document.getElementById("verticeInicio").value;
    const grafo = { vertices, aristas };

    fetch(`http://localhost:5000/algoritmodijkstra/api/grafo/dijkstra?verticeInicio=${encodeURIComponent(verticeInicio)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(grafo)
    })
    .then(resp => resp.ok ? resp.json() : Promise.reject("Error en el backend"))
    .then(data => mostrarResultado(data))
    .catch(err => alert("Error: " + err));
}

function mostrarResultado(data) {
    const div = document.getElementById("resultado");
    div.innerHTML = "<h3>Distancias desde el vértice de inicio:</h3>";
    div.innerHTML += "<ul>" + Object.entries(data).map(
        ([k, v]) => `<li>${k}: ${v === 2147483647 ? "Inalcanzable" : v}</li>`
    ).join("") + "</ul>";
}

function ejecutarDijkstraEntreDos() {
    if (vertices.length === 0 || aristas.length === 0) {
        alert("Agrega vértices y aristas primero.");
        return;
    }
    const verticeOrigen = document.getElementById("verticeOrigen").value;
    const verticeDestino = document.getElementById("verticeDestino").value;
    if (!verticeOrigen || !verticeDestino) {
        alert("Selecciona vértice origen y destino.");
        return;
    }
    const grafo = { vertices, aristas };

    fetch(`http://localhost:5000/algoritmodijkstra/api/grafo/dijkstra/distancia?verticeOrigen=${encodeURIComponent(verticeOrigen)}&verticeDestino=${encodeURIComponent(verticeDestino)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(grafo)
    })
    .then(resp => resp.ok ? resp.json() : Promise.reject("Error en el backend"))
    .then(data => mostrarResultadoEntreDos(data, verticeOrigen, verticeDestino))
    .catch(err => alert("Error: " + err));
}

function mostrarResultadoEntreDos(distancia, origen, destino) {
    const div = document.getElementById("resultadoEntreDos");
    div.innerHTML = `<h3>Camino más corto de <b>${origen}</b> a <b>${destino}</b>:</h3>`;
    if (distancia === -1) {
        div.innerHTML += "<p>No existe un camino entre los dos vértices.</p>";
    } else {
        div.innerHTML += `<p>Distancia mínima: <b>${distancia}</b></p>`;
    }
}

