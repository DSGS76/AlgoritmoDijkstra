let vertices = [];
let aristas = [];
let aristaIdCounter = 1; // Contador para IDs únicos de aristas

// Sistema de notificaciones personalizado
function showNotification(message, type = 'info', duration = 3000) {
    // Crear el contenedor de notificaciones si no existe
    let container = document.getElementById('notification-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
        `;
        document.body.appendChild(container);
    }

    // Crear la notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        margin-bottom: 10px;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        transform: translateX(400px);
        transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255,255,255,0.2);
        font-weight: 500;
    `;

    notification.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between;">
            <span>${getNotificationIcon(type)} ${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" 
                    style="background: none; border: none; color: white; font-size: 18px; cursor: pointer; margin-left: 10px;">×</button>
        </div>
    `;

    container.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);

    // Auto-remover después del tiempo especificado
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, duration);
}

function getNotificationColor(type) {
    const colors = {
        'info': 'linear-gradient(135deg, #3498db, #2980b9)',
        'success': 'linear-gradient(135deg, #27ae60, #229954)',
        'error': 'linear-gradient(135deg, #e74c3c, #c0392b)',
        'warning': 'linear-gradient(135deg, #f39c12, #d68910)'
    };
    return colors[type] || colors.info;
}

function getNotificationIcon(type) {
    const icons = {
        'info': 'ℹ️',
        'success': '✅',
        'error': '❌',
        'warning': '⚠️'
    };
    return icons[type] || icons.info;
}

// Modal personalizado para inputs
function showCustomPrompt(title, placeholder = '', defaultValue = '') {
    return new Promise((resolve) => {
        // Crear overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(5px);
            animation: fadeIn 0.3s ease;
        `;

        // Crear modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            max-width: 400px;
            width: 90%;
            transform: scale(0.7);
            animation: popIn 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        `;

        modal.innerHTML = `
            <h3 style="margin: 0 0 20px 0; color: #2c3e50; font-size: 1.3rem;">${title}</h3>
            <input type="text" id="customPromptInput" value="${defaultValue}" placeholder="${placeholder}"
                   style="width: 100%; padding: 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 16px; margin-bottom: 20px;">
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
                <button id="cancelBtn" style="padding: 10px 20px; border: 1px solid #ddd; background: white; color: black; border-radius: 6px; cursor: pointer;">Cancelar</button>
                <button id="confirmBtn" style="padding: 10px 20px; border: none; background: linear-gradient(135deg, #3498db, #2980b9); color: white; border-radius: 6px; cursor: pointer;">Confirmar</button>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Agregar estilos de animación
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes popIn {
                to { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        // Focus en el input
        setTimeout(() => {
            document.getElementById('customPromptInput').focus();
        }, 100);

        // Event listeners
        document.getElementById('confirmBtn').onclick = () => {
            const value = document.getElementById('customPromptInput').value;
            document.body.removeChild(overlay);
            document.head.removeChild(style);
            resolve(value);
        };

        document.getElementById('cancelBtn').onclick = () => {
            document.body.removeChild(overlay);
            document.head.removeChild(style);
            resolve(null);
        };

        // Enter para confirmar, Escape para cancelar
        document.getElementById('customPromptInput').onkeydown = (e) => {
            if (e.key === 'Enter') {
                document.getElementById('confirmBtn').click();
            } else if (e.key === 'Escape') {
                document.getElementById('cancelBtn').click();
            }
        };
    });
}

async function agregarVertice() {
    const id = await showCustomPrompt("ID del vértice:", "Ingrese el ID único");
    if (!id || vertices.find(v => v.id === id)) {
        if (id && vertices.find(v => v.id === id)) {
            showNotification("El ID del vértice ya existe", "error");
        }
        return;
    }

    const etiqueta = await showCustomPrompt("Etiqueta del vértice:", "Ingrese la etiqueta", id);
    if (etiqueta === null) return;

    vertices.push({ id, etiqueta: etiqueta || id });
    renderVertices();
    renderSelectInicio();
    showNotification(`Vértice "${etiqueta || id}" agregado exitosamente`, "success");
}

function eliminarVertice(id) {
    const vertice = vertices.find(v => v.id === id);
    if (!vertice) return;

    // Agregar animación de eliminación
    const element = document.querySelector(`[data-vertice-id="${id}"]`);
    if (element) {
        element.classList.add('removing');
        setTimeout(() => {
            vertices = vertices.filter(v => v.id !== id);
            aristas = aristas.filter(a => a.inicio !== id && a.fin !== id);
            renderVertices();
            renderAristas();
            renderSelectInicio();
            showNotification(`Vértice "${vertice.etiqueta}" eliminado`, "success");
        }, 400);
    } else {
        // Fallback si no se encuentra el elemento
        vertices = vertices.filter(v => v.id !== id);
        aristas = aristas.filter(a => a.inicio !== id && a.fin !== id);
        renderVertices();
        renderAristas();
        renderSelectInicio();
        showNotification(`Vértice "${vertice.etiqueta}" eliminado`, "success");
    }
}

function renderVertices() {
    const cont = document.getElementById("vertices-list");
    cont.innerHTML = "";
    vertices.forEach((v, index) => {
        const div = document.createElement('div');
        div.className = 'vertice-item';
        div.setAttribute('data-vertice-id', v.id);
        div.style.animationDelay = `${index * 0.1}s`;
        div.innerHTML = `${v.etiqueta} (${v.id}) <button type="button" onclick="eliminarVertice('${v.id}')">Eliminar</button>`;
        cont.appendChild(div);
    });
}

async function agregarArista() {
    if (vertices.length < 2) {
        showNotification("Agrega al menos dos vértices primero", "warning");
        return;
    }

    const inicio = await showCustomPrompt("ID del vértice de inicio:", `Vértices disponibles: ${vertices.map(v => v.id).join(', ')}`);
    if (!inicio) return;

    const fin = await showCustomPrompt("ID del vértice de fin:", `Vértices disponibles: ${vertices.map(v => v.id).join(', ')}`);
    if (!fin) return;

    if (inicio === fin) {
        showNotification("El vértice de inicio y fin no pueden ser el mismo", "error");
        return;
    }

    if (!vertices.find(v => v.id === inicio) || !vertices.find(v => v.id === fin)) {
        showNotification("Uno o ambos vértices no existen", "error");
        return;
    }

    const pesoStr = await showCustomPrompt("Peso de la arista:", "Ingrese un número positivo");
    if (pesoStr === null) return;

    const peso = parseInt(pesoStr, 10);
    if (isNaN(peso) || peso <= 0) {
        showNotification("El peso debe ser un número positivo", "error");
        return;
    }

    // Generar un ID único para la arista
    const aristaId = `a${aristaIdCounter++}`;
    aristas.push({ id: aristaId, inicio, fin, peso });
    renderAristas();
    showNotification(`Arista ${inicio} → ${fin} (peso: ${peso}) agregada`, "success");
}

function eliminarArista(id) {
    const arista = aristas.find(a => a.id === id);
    if (!arista) return;

    const element = document.querySelector(`[data-arista-id="${id}"]`);
    if (element) {
        element.classList.add('removing');
        setTimeout(() => {
            aristas = aristas.filter(a => a.id !== id);
            renderAristas();
            showNotification(`Arista ${arista.inicio} → ${arista.fin} eliminada`, "success");
        }, 400);
    } else {
        aristas = aristas.filter(a => a.id !== id);
        renderAristas();
        showNotification(`Arista ${arista.inicio} → ${arista.fin} eliminada`, "success");
    }
}

function renderAristas() {
    const cont = document.getElementById("aristas-list");
    cont.innerHTML = "";
    aristas.forEach((a, index) => {
        const div = document.createElement('div');
        div.className = 'arista-item';
        div.setAttribute('data-arista-id', a.id);
        div.style.animationDelay = `${index * 0.1}s`;
        div.innerHTML = `${a.inicio} → ${a.fin} (peso: ${a.peso}) <button type="button" onclick="eliminarArista('${a.id}')">Eliminar</button>`;
        cont.appendChild(div);
    });
}

function renderSelectInicio() {
    const selects = [
        document.getElementById("verticeInicio"),
        document.getElementById("verticeOrigen"),
        document.getElementById("verticeDestino")
    ];

    selects.forEach(select => {
        if (select) {
            const currentValue = select.value;
            select.innerHTML = "";

            if (vertices.length === 0) {
                const opt = document.createElement("option");
                opt.value = "";
                opt.textContent = "No hay vértices disponibles";
                opt.disabled = true;
                select.appendChild(opt);
            } else {
                vertices.forEach(v => {
                    const opt = document.createElement("option");
                    opt.value = v.id;
                    opt.textContent = `${v.etiqueta} (${v.id})`;
                    select.appendChild(opt);
                });

                // Restaurar valor previo si existe
                if (currentValue && vertices.find(v => v.id === currentValue)) {
                    select.value = currentValue;
                }
            }
        }
    });
}

// Efectos de carga para botones
function addLoadingEffect(button, duration = 2000) {
    const originalText = button.textContent;
    const originalDisabled = button.disabled;

    button.classList.add('loading');
    button.disabled = true;
    button.textContent = 'Procesando...';

    setTimeout(() => {
        button.classList.remove('loading');
        button.disabled = originalDisabled;
        button.textContent = originalText;
    }, duration);
}

// Mejorar la función window.onload
window.onload = function() {
    renderVertices();
    renderAristas();
    renderSelectInicio();

    // Agregar efectos de entrada a las tarjetas
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    showNotification("¡Aplicación iniciada correctamente!", "success", 2000);
};
