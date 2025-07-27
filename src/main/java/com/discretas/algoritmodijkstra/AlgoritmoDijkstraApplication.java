package com.discretas.algoritmodijkstra;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Clase principal de la aplicación Spring Boot para el algoritmo de Dijkstra.
 *
 * Esta aplicación proporciona servicios REST para calcular caminos más cortos
 * en grafos utilizando el algoritmo de Dijkstra.
 *
 * @author Duvan
 * @version 1.0
 */
@SpringBootApplication
public class AlgoritmoDijkstraApplication {

    /**
     * Método principal que inicia la aplicación Spring Boot.
     */
    public static void main(String[] args) {
        SpringApplication.run(AlgoritmoDijkstraApplication.class, args);
    }

}
