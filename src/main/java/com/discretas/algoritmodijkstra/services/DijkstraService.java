package com.discretas.algoritmodijkstra.services;

import com.discretas.algoritmodijkstra.models.Arista;
import com.discretas.algoritmodijkstra.models.Grafo;
import com.discretas.algoritmodijkstra.models.Vertice;
import com.discretas.algoritmodijkstra.presentation.dto.ApiResponseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Servicio que implementa el algoritmo de Dijkstra para encontrar caminos más cortos en grafos.
 *
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
     * @return Un mapa con las distancias mínimas desde el vértice inicial a cada vértice
     */
    public ApiResponseDTO<Map<String, Integer>> calcularCaminoMasCorto(Grafo grafo, String verticeInicioId) {
        ApiResponseDTO<Map<String, Integer>> response = new ApiResponseDTO<>();
        // Mapa para almacenar la distancia mínima desde el vértice inicial a cada vértice
        Map<String, Integer> distancias = new HashMap<>();

        // Conjunto para llevar registro de los vértices ya procesados
        Set<String> visitados = new HashSet<>();

        // Cola de prioridad para seleccionar siempre el vértice con menor distancia
        // Se ordena por el valor (distancia) de menor a mayor
        PriorityQueue<Map.Entry<String, Integer>> colaPrioridad = new PriorityQueue<>(
            Map.Entry.comparingByValue()
        );

        // PASO 1: Inicializar todas las distancias con infinito (valor muy grande)
        // excepto el vértice inicial que tendrá distancia 0
        for (Vertice vertice : grafo.getVertices()) {
            distancias.put(vertice.getId(), Integer.MAX_VALUE);
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
                        // Agregar el vecino a la cola con su nueva distancia
                        colaPrioridad.offer(new AbstractMap.SimpleEntry<>(vecino, nuevaDistancia));
                    }
                }
            }
        }

        // Retornar el mapa con las distancias mínimas desde el vértice inicial
        response.SuccessOperation(distancias);
        return response;
    }

    /**
     * Calcula la distancia más corta entre dos vértices específicos.
     * Reutiliza el método calcularCaminoMasCorto y consulta el resultado.
     *
     * @param grafo El grafo sobre el cual calcular la distancia
     * @param verticeOrigenId El ID del vértice de origen
     * @param verticeDestinoId El ID del vértice de destino
     * @return La distancia mínima entre los dos vértices, -1 si no hay camino o 0 si son el mismo vértice
     */
    public ApiResponseDTO<Integer>  calcularDistanciaEntreVertices(Grafo grafo, String verticeOrigenId, String verticeDestinoId) {
        ApiResponseDTO<Integer> response = new ApiResponseDTO<>();
        // Si origen y destino son el mismo, la distancia es 0
        if (verticeOrigenId.equals(verticeDestinoId)) {
            response.SuccessOperation(0);
            return response;
        }

        // Calcular todas las distancias desde el vértice origen
        ApiResponseDTO<Map<String, Integer>> distancias = calcularCaminoMasCorto(grafo, verticeOrigenId);

        // Obtener la distancia al vértice destino
        Integer distancia = distancias.getData().get(verticeDestinoId);

        // Verificar si existe un camino válido al destino
        if (distancia == null || distancia == Integer.MAX_VALUE) {
            log.info("Distancia: Inalcanzable");
            response.SuccessOperation();
            return response; // No hay camino disponible
        } else {
            log.info("Distancia: " + distancia);
            response.SuccessOperation(distancia);
            return response; // Retornar la distancia encontrada
        }
    }
}


