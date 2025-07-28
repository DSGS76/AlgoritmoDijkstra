/**
 * verticeOrigen: se usa como vértice de inicio para ambos cálculos
 * verticeDestino: se usa solo para calcular el camino más corto entre dos vértices específicos
 */

function ejecutarDijkstra() {
    if (vertices.length === 0 || aristas.length === 0) {
        showNotification("Agrega vértices y aristas primero", "warning");
        return;
    }

    const button = event.target;
    const verticeInicio = document.getElementById("verticeInicio").value;
    const grafo = { vertices, aristas };

    // Agregar efecto de carga
    addLoadingEffect(button, 3000);
    showNotification(`Calculando caminos más cortos desde "${verticeInicio}"...`, "info", 1500);

    fetch(`http://localhost:5000/algoritmodijkstra/api/grafo/dijkstra?verticeInicio=${encodeURIComponent(verticeInicio)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(grafo)
    })
    .then(resp => resp.ok ? resp.json() : Promise.reject("Error en el backend"))
    .then(response => {
        mostrarResultado(response.data);
        showNotification("Cálculo completado exitosamente", "success");
    })
    .catch(err => {
        showNotification("Error: " + err, "error");
        console.error("Error en ejecutarDijkstra:", err);
    });
}

function mostrarResultado(data) {
    const div = document.getElementById("resultado");
    div.innerHTML = "<h3>🎯 Distancias desde el vértice de inicio:</h3>";

    const ul = document.createElement("ul");
    Object.entries(data).forEach(([k, v], index) => {
        const li = document.createElement("li");
        li.style.animationDelay = `${index * 0.1}s`;
        li.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span><strong>${k}:</strong></span>
                <span class="distance-badge" style="background: ${v === 2147483647 ? 'linear-gradient(135deg, #e74c3c, #c0392b)' : 'linear-gradient(135deg, #27ae60, #229954)'}; color: white; padding: 4px 12px; border-radius: 20px; font-weight: bold; font-size: 0.9rem;">
                    ${v === 2147483647 ? "🚫 Inalcanzable" : `📏 ${v}`}
                </span>
            </div>
        `;
        ul.appendChild(li);
    });

    div.appendChild(ul);

    // Animar la aparición del contenedor
    div.style.opacity = '0';
    div.style.transform = 'translateY(20px)';
    setTimeout(() => {
        div.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        div.style.opacity = '1';
        div.style.transform = 'translateY(0)';
    }, 100);
}

function ejecutarDijkstraEntreDos() {
    if (vertices.length === 0 || aristas.length === 0) {
        showNotification("Agrega vértices y aristas primero", "warning");
        return;
    }

    const button = event.target;
    const verticeOrigen = document.getElementById("verticeOrigen").value;
    const verticeDestino = document.getElementById("verticeDestino").value;

    if (!verticeOrigen || !verticeDestino) {
        showNotification("Selecciona vértice origen y destino", "warning");
        return;
    }

    const grafo = { vertices, aristas };

    // Agregar efecto de carga
    addLoadingEffect(button, 3000);
    showNotification(`Calculando camino de "${verticeOrigen}" a "${verticeDestino}"...`, "info", 1500);

    fetch(`http://localhost:5000/algoritmodijkstra/api/grafo/dijkstra/distancia?verticeOrigen=${encodeURIComponent(verticeOrigen)}&verticeDestino=${encodeURIComponent(verticeDestino)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(grafo)
    })
    .then(resp => resp.ok ? resp.json() : Promise.reject("Error en el backend"))
    .then(response => {
        if (response.success) {
            // Caso exitoso: hay un camino válido
            mostrarResultadoEntreDos(response.data, verticeOrigen, verticeDestino);
            showNotification("Cálculo completado exitosamente", "success");
        } else if (response.status === 400 && response.data === 0) {
            // Caso especial: origen y destino son iguales (BadOperation con data = 0)
            mostrarResultadoEntreDos(0, verticeOrigen, verticeDestino);
            showNotification("Vértices origen y destino son iguales", "info");
        } else {
            // Caso de error: no hay camino (FailedOperation sin data)
            mostrarResultadoEntreDos(null, verticeOrigen, verticeDestino);
            showNotification("No existe camino entre los vértices", "warning");
        }
    })
    .catch(err => {
        showNotification("Error: " + err, "error");
        console.error("Error en ejecutarDijkstraEntreDos:", err);
    });
}

function mostrarResultadoEntreDos(distancia, origen, destino) {
    const div = document.getElementById("resultadoEntreDos");

    let content = `<h3>🎯 Camino más corto de <strong style="color: var(--primary-color);">${origen}</strong> a <strong style="color: var(--accent-color);">${destino}</strong>:</h3>`;

    if (distancia === null) {
        content += `
            <div class="result-message error-message" style="text-align: center; padding: 20px; border-radius: 10px; margin-top: 15px;">
                <div style="font-size: 2.5rem; margin-bottom: 10px;">🚫</div>
                <p style="font-size: 1.1rem; margin: 0;"><strong>No existe un camino entre los dos vértices</strong></p>
                <p style="font-size: 0.9rem; margin: 5px 0 0 0; opacity: 0.8;">Los vértices no están conectados por ninguna ruta.</p>
            </div>
        `;
    } else if (distancia === 0) {
        content += `
            <div class="result-message success-message" style="text-align: center; padding: 20px; border-radius: 10px; margin-top: 15px;">
                <div style="font-size: 2.5rem; margin-bottom: 10px;">🎯</div>
                <p style="font-size: 1.1rem; margin: 0;"><strong>El vértice origen y destino son el mismo</strong></p>
                <p style="font-size: 1.2rem; margin: 10px 0 0 0;">Distancia: <span style="background: linear-gradient(135deg, #27ae60, #229954); color: white; padding: 5px 15px; border-radius: 20px; font-weight: bold;">📏 0</span></p>
            </div>
        `;
    } else {
        content += `
            <div class="result-message success-message" style="text-align: center; padding: 20px; border-radius: 10px; margin-top: 15px;">
                <div style="font-size: 2.5rem; margin-bottom: 10px;">✅</div>
                <p style="font-size: 1.1rem; margin: 0;"><strong>¡Camino encontrado!</strong></p>
                <p style="font-size: 1.3rem; margin: 15px 0 0 0;">Distancia mínima: <span style="background: linear-gradient(135deg, #3498db, #2980b9); color: white; padding: 8px 20px; border-radius: 25px; font-weight: bold; font-size: 1.1rem;">📏 ${distancia}</span></p>
            </div>
        `;
    }

    div.innerHTML = content;

    // Animar la aparición del contenedor
    div.style.opacity = '0';
    div.style.transform = 'translateY(20px)';
    setTimeout(() => {
        div.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        div.style.opacity = '1';
        div.style.transform = 'translateY(0)';
    }, 100);
}

// Función auxiliar para agregar efectos de pulso a elementos importantes
function addPulseEffect(element) {
    element.style.animation = 'pulse 0.6s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 600);
}

// Mejorar la experiencia al seleccionar vértices
document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que las variables globales estén disponibles
    setTimeout(() => {
        // Agregar listeners para los selects
        const selects = ['verticeInicio', 'verticeOrigen', 'verticeDestino'];
        selects.forEach(selectId => {
            const select = document.getElementById(selectId);
            if (select) {
                select.addEventListener('change', function() {
                    addPulseEffect(this);
                    // Verificar que vertices existe antes de usarlo
                    if (typeof vertices !== 'undefined' && vertices.length > 0) {
                        const selectedVertex = vertices.find(v => v.id === this.value);
                        if (selectedVertex) {
                            showNotification(`Seleccionado: ${selectedVertex.etiqueta} (${selectedVertex.id})`, "info", 1500);
                        }
                    }
                });
            }
        });
    }, 100);
});
