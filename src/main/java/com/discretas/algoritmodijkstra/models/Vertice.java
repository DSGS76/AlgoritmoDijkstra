package com.discretas.algoritmodijkstra.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Representa un vértice (nodo) en un grafo.
 * Un vértice es un punto en el grafo que puede estar conectado a otros vértices mediante aristas.
 *
 * @author Duvan Gil
 * @version 1.0
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Vertice {

    /**
     * Identificador único del vértice.
     * Se utiliza para referenciar el vértice en las aristas y como nombre descriptivo.
     */
    private String id;

}
