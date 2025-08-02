# 🚀 Algoritmo de Dijkstra - Spring Boot

Implementación completa del algoritmo de Dijkstra para encontrar el camino más corto en grafos dirigidos con pesos, desarrollado con Spring Boot y una interfaz web moderna e interactiva.

## 📋 Descripción

Esta aplicación web permite crear grafos dirigidos de manera visual y aplicar el algoritmo de Dijkstra para:
- Calcular las distancias mínimas desde un vértice origen a todos los demás vértices
- Encontrar el camino más corto entre dos vértices específicos
- Visualizar los resultados con caminos completos y distancias

## ✨ Características

- ✅ **Interfaz web intuitiva** para crear grafos visualmente
- ✅ **Algoritmo de Dijkstra completo** con cola de prioridad
- ✅ **Dos modos de cálculo**: desde origen a todos, o entre dos vértices específicos
- ✅ **API REST** para consumo externo
- ✅ **Validación robusta** y manejo de errores
- ✅ **Interfaz responsiva** con animaciones

## 🛠️ Tecnologías

- **Backend:** Spring Boot, Maven, Java
- **Frontend:** Thymeleaf, JavaScript, CSS3
- **Arquitectura:** MVC, REST API

## 📦 Instalación

### Prerrequisitos
- Java 24 o superior
- Maven 4.0.0+
- Git

### Opción 1: Con IntelliJ IDEA (Recomendado)
*Proyecto desarrollado originalmente en IntelliJ IDEA*

1. **Clonar el repositorio**
```bash
git clone https://github.com/DSGS76/AlgoritmoDijkstra.git
```

2. **Abrir en IntelliJ IDEA**
   - Abre IntelliJ IDEA
   - File → Open → Selecciona la carpeta del proyecto
   - El IDE detectará automáticamente Maven y configurará el proyecto

3. **Ejecutar la aplicación**
   - Ejecuta la clase `AlgoritmoDijkstraApplication`
   - O usa el botón de Run en la interfaz

### Opción 2: Instalación General

1. **Clonar el repositorio**
```bash
git clone https://github.com/DSGS76/AlgoritmoDijkstra.git
cd AlgoritmoDijkstra
```

2. **Instalar dependencias**
```bash
mvn clean install
```

3. **Ejecutar la aplicación**
```bash
mvn spring-boot:run
```

### Acceso a la aplicación
Una vez ejecutada la aplicación, accede a:
```
http://localhost:5000/algoritmodijkstra
```

## 🎯 Uso

### Interfaz Web

1. **Crear vértices**
   - Haz clic en "Agregar vértice"
   - Ingresa un ID único para cada vértice
   - Los vértices aparecerán en la lista

2. **Crear aristas**
   - Haz clic en "Agregar arista"
   - Selecciona vértice de inicio y fin
   - Asigna un peso positivo
   - Se permiten lazos (mismo vértice como inicio y fin)

3. **Ejecutar Dijkstra**
   - **Opción 1**: Calcular desde un origen a todos los vértices
   - **Opción 2**: Camino específico entre dos vértices
   - Los resultados se muestran con distancias y caminos completos

### Ejemplo Práctico

```
Vértices: A, B, C, D
Aristas: 
- A → B (peso: 4)
- A → C (peso: 2)
- B → D (peso: 3)
- C → D (peso: 1)

Resultado desde A:
- A: 0 (camino: A)
- B: 4 (camino: A → B)
- C: 2 (camino: A → C)
- D: 3 (camino: A → C → D)
```

## 🏗️ Estructura del Proyecto

```
src/main/
├── java/com/discretas/algoritmodijkstra/
│   ├── models/           # Grafo, Vertice, Arista
│   ├── services/         # DijkstraService
│   └── presentation/     # Controllers y DTOs
└── resources/
    ├── static/          # CSS, JavaScript
    └── templates/       # Plantillas Thymeleaf
```

## 🔗 API Endpoints

### Base URL
```
http://localhost:5000/algoritmodijkstra/api/grafo
```

### Endpoints Disponibles

#### 1. Calcular Dijkstra desde un origen
```http
POST /dijkstra?verticeInicio={id}
Content-Type: application/json

{
  "vertices": [
    {"id": "A"},
    {"id": "B"}
  ],
  "aristas": [
    {"id": "a1", "inicio": "A", "fin": "B", "peso": 5}
  ]
}
```

**Respuesta:**
```json
{
  "data": {
    "A": {"distancia": 0, "camino": ["A"]},
    "B": {"distancia": 5, "camino": ["A", "B"]}
  },
  "message": "OPERACION EXITOSA",
  "success": true,
  "status": 200,
  "timestamp": "2025-01-02T10:30:00"
}
```

#### 2. Calcular distancia entre dos vértices
```http
POST /dijkstra/distancia?verticeOrigen={id}&verticeDestino={id}
Content-Type: application/json

{
  "vertices": [...],
  "aristas": [...]
}
```

**Respuesta exitosa:**
```json
{
  "data": {"distancia": 5, "camino": ["A", "B"]},
  "message": "OPERACION EXITOSA",
  "success": true,
  "status": 200
}
```

## 🧮 Algoritmo de Dijkstra

### Complejidad
- **Tiempo**: O((V + E) log V) usando cola de prioridad
- **Espacio**: O(V) para almacenar distancias y predecesores

### Características de la Implementación
- ✅ Cola de prioridad para eficiencia óptima
- ✅ Reconstrucción completa de caminos
- ✅ Manejo de grafos desconectados
- ✅ Soporte para lazos (self-loops)
- ✅ Validación de pesos no negativos

### Limitaciones
- Solo funciona con pesos no negativos
- Grafos dirigidos únicamente
- No detecta ciclos negativos

## 🎨 Características de UI/UX

- **Diseño moderno** con gradientes y efectos glassmorphism
- **Animaciones fluidas** en todas las interacciones
- **Sistema de notificaciones** con diferentes tipos (éxito, error, advertencia, info)
- **Header semitransparente** que se adapta al scroll
- **Efectos hover** en todos los elementos interactivos
- **Layout responsivo** para diferentes tamaños de pantalla
- **Iconos Unicode** para mejor compatibilidad
- **Footer fijo** en la parte inferior

## 👨‍💻 Autor

**Duvan Gil** - [GitHub](https://github.com/DSGS76)

## 🙏 Agradecimientos

- Algoritmo de Dijkstra por Edsger W. Dijkstra
- Spring Boot Team por el excelente framework
- Comunidad de desarrolladores por las mejores prácticas

---

⭐ Si este proyecto te fue útil, ¡no olvides darle una estrella!
