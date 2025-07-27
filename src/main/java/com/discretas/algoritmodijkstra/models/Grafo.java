package com.discretas.algoritmodijkstra.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

/**
 * Representa un grafo dirigido compuesto por vértices y aristas.
 * Esta estructura de datos es utilizada para aplicar algoritmos de caminos más cortos
 * como el algoritmo de Dijkstra.
 *
 * @author Duvan
 * @version 1.0
 */
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Grafo {

    /**
     * Lista de todos los vértices que componen el grafo.
     * Cada vértice debe tener un ID único dentro del grafo.
     */
    private List<Vertice> vertices;

    /**
     * Lista de todas las aristas que conectan los vértices del grafo.
     * Las aristas definen las conexiones y los pesos entre vértices.
     */
    private List<Arista> aristas;

}
