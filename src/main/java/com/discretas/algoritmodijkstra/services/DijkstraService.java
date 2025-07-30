package com.discretas.algoritmodijkstra.services;

import com.discretas.algoritmodijkstra.models.Arista;
import com.discretas.algoritmodijkstra.models.Grafo;
import com.discretas.algoritmodijkstra.models.Vertice;
import com.discretas.algoritmodijkstra.presentation.dto.DijkstraDTO;
import com.discretas.algoritmodijkstra.presentation.dto.ApiResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Servicio que implementa el algoritmo de Dijkstra para encontrar caminos más cortos en grafos.
 * El algoritmo de Dijkstra es utilizado para encontrar el camino más corto desde un vértice
 * origen hacia todos los demás vértices en un grafo con pesos no negativos.
 *
 * @author Duvan
 * @version 1.0
 * @see <a href="https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm">Algoritmo de Dijkstra</a>
 */
@Service
@Slf4j
public class DijkstraService {

    /**
     * Calcula el camino más corto desde un vértice inicial a todos los demás vértices del grafo
     * utilizando el algoritmo de Dijkstra.
     *
     * @param grafo El grafo sobre el cual calcular las distancias
     * @param verticeInicioId El ID del vértice desde donde comenzar el cálculo
     * @return Un mapa con las distancias mínimas y caminos desde el vértice inicial a cada vértice
     */
    public ApiResponseDTO<Map<String, DijkstraDTO>> calcularCaminoMasCorto(Grafo grafo, String verticeInicioId) {
        ApiResponseDTO<Map<String, DijkstraDTO>> response = new ApiResponseDTO<>();

        // Mapa para almacenar la distancia mínima desde el vértice inicial a cada vértice
        Map<String, Integer> distancias = new HashMap<>();

        // Mapa para reconstruir el camino más corto
        Map<String, String> predecesores = new HashMap<>();

        // Conjunto para llevar registro de los vértices ya procesados
        Set<String> visitados = new HashSet<>();

        // Cola de prioridad para seleccionar siempre el vértice con menor distancia
        PriorityQueue<Map.Entry<String, Integer>> colaPrioridad = new PriorityQueue<>(
            Map.Entry.comparingByValue()
        );

        // PASO 1: Inicializar todas las distancias con infinito (valor muy grande)
        // excepto el vértice inicial que tendrá distancia 0
        for (Vertice vertice : grafo.getVertices()) {
            distancias.put(vertice.getId(), Integer.MAX_VALUE);
            predecesores.put(vertice.getId(), null);
        }

        // PASO 2: La distancia al vértice inicial es 0 y lo agregamos a la cola
        distancias.put(verticeInicioId, 0);
        colaPrioridad.offer(new AbstractMap.SimpleEntry<>(verticeInicioId, 0));

        // PASO 3: Procesar vértices mientras la cola no esté vacía
        while (!colaPrioridad.isEmpty()) {
            // Extraer el vértice con menor distancia de la cola
            Map.Entry<String, Integer> actual = colaPrioridad.poll();
            String verticeActual = actual.getKey();

            // Si ya procesamos este vértice, lo saltamos (puede estar duplicado en la cola)
            if (visitados.contains(verticeActual)) {
                continue;
            }

            // Marcar el vértice actual como visitado/procesado
            visitados.add(verticeActual);

            // PASO 4: Examinar todas las aristas que salen del vértice actual
            for (Arista arista : grafo.getAristas()) {
                // Solo considerar aristas que empiecen en el vértice actual
                if (arista.getInicio().equals(verticeActual)) {
                    String vecino = arista.getFin();

                    // Calcular la nueva distancia pasando por el vértice actual
                    int nuevaDistancia = distancias.get(verticeActual) + arista.getPeso();

                    // PASO 5: Si encontramos un camino más corto, actualizar la distancia
                    if (nuevaDistancia < distancias.get(vecino)) {
                        distancias.put(vecino, nuevaDistancia);
                        predecesores.put(vecino, verticeActual);
                        // Agregar el vecino a la cola con su nueva distancia
                        colaPrioridad.offer(new AbstractMap.SimpleEntry<>(vecino, nuevaDistancia));
                    }
                }
            }
        }

        // Construir el resultado con distancias y caminos
        Map<String, DijkstraDTO> resultado = new HashMap<>();
        for (String verticeId : distancias.keySet()) {
            int distancia = distancias.get(verticeId);
            List<String> camino = reconstruirCamino(predecesores, verticeInicioId, verticeId);
            resultado.put(verticeId, new DijkstraDTO(distancia, camino));
        }

        response.SuccessOperation(resultado);
        return response;
    }

    /**
     * Calcula la distancia más corta entre dos vértices específicos.
     * Reutiliza el método calcularCaminoMasCorto y consulta el resultado.
     *
     * @param grafo El grafo sobre el cual calcular la distancia
     * @param verticeOrigenId El ID del vértice de origen
     * @param verticeDestinoId El ID del vértice de destino
     * @return La distancia mínima y el camino entre los dos vértices
     */
    public ApiResponseDTO<DijkstraDTO> calcularDistanciaEntreVertices(Grafo grafo, String verticeOrigenId, String verticeDestinoId) {
        ApiResponseDTO<DijkstraDTO> response = new ApiResponseDTO<>();

        // Si origen y destino son el mismo, la distancia es 0
        if (verticeOrigenId.equals(verticeDestinoId)) {
            DijkstraDTO resultado = new DijkstraDTO(0, List.of(verticeOrigenId));
            response.SuccessOperation(resultado);
            return response;
        }

        // Calcular todas las distancias desde el vértice origen
        ApiResponseDTO<Map<String, DijkstraDTO>> resultados = calcularCaminoMasCorto(grafo, verticeOrigenId);
        DijkstraDTO resultado = resultados.getData().get(verticeDestinoId);

        // Verificar si existe un camino válido al destino
        if (resultado == null || resultado.distancia() == Integer.MAX_VALUE) {
            log.info("Distancia: Inalcanzable");
            response.SuccessOperation();
            return response; // No hay camino disponible
        } else {
            log.info("Distancia: " + resultado.distancia());
            response.SuccessOperation(resultado);
            return response; // Retornar la distancia y camino encontrados
        }
    }

    /**
     * Reconstruye el camino más corto desde el vértice origen hasta el destino
     * utilizando el mapa de predecesores.
     *
     * @param predecesores Mapa de predecesores construido por el algoritmo
     * @param origen Vértice de origen
     * @param destino Vértice de destino
     * @return Lista ordenada de vértices que conforman el camino más corto
     */
    private List<String> reconstruirCamino(Map<String, String> predecesores, String origen, String destino) {
        List<String> camino = new ArrayList<>();

        // Si no hay camino al destino, retornar lista vacía
        if (predecesores.get(destino) == null && !origen.equals(destino)) {
            return camino;
        }

        // Reconstruir el camino desde el destino hacia el origen
        String actual = destino;
        while (actual != null) {
            camino.addFirst(actual); // Agregar al inicio para mantener el orden correcto
            actual = predecesores.get(actual);
        }

        return camino;
    }
}
