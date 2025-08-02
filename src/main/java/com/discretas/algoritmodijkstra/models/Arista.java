package com.discretas.algoritmodijkstra.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Representa una arista en un grafo dirigido.
 * Una arista conecta dos vértices y tiene un peso asociado.
 *
 * @author Duvan Gil
 * @version 1.0
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Arista {

    /**
     * Identificador único de la arista.
     */
    private String id;

    /**
     * ID del vértice de origen de la arista.
     */
    private String inicio;

    /**
     * ID del vértice de destino de la arista.
     */
    private String fin;

    /**
     * Peso o costo asociado a la arista.
     * Debe ser un valor positivo para el algoritmo de Dijkstra.
     */
    private int peso;

}
