package com.discretas.algoritmodijkstra.presentation.dto;

import java.util.List;

/**
 * DTO para transferir los resultados del algoritmo de Dijkstra que incluye tanto
 * la distancia como el camino completo hasta un vértice.
 *
 * @author Duvan Gil
 * @version 1.0
 * @param distancia Distancia mínima desde el vértice origen hasta este vértice
 * @param camino Camino completo desde el vértice origen hasta este vértice. Incluye todos los vértices intermedios en orden
 */
public record DijkstraDTO(
        int distancia,
        List<String> camino
) {
}
