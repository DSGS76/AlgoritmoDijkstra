package com.discretas.algoritmodijkstra.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Representa el resultado del algoritmo de Dijkstra que incluye tanto
 * la distancia como el camino completo hasta un vértice.
 *
 * @author Duvan
 * @version 1.0
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ResultadoDijkstra {

    /**
     * Distancia mínima desde el vértice origen hasta este vértice.
     */
    private int distancia;

    /**
     * Camino completo desde el vértice origen hasta este vértice.
     * Incluye todos los vértices intermedios en orden.
     */
    private List<String> camino;

}
