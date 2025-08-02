package com.discretas.algoritmodijkstra.presentation.controller;

import com.discretas.algoritmodijkstra.models.Grafo;
import com.discretas.algoritmodijkstra.presentation.dto.DijkstraDTO;
import com.discretas.algoritmodijkstra.presentation.dto.ApiResponseDTO;
import com.discretas.algoritmodijkstra.services.DijkstraService;
import com.discretas.algoritmodijkstra.utils.Constants;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controlador REST para operaciones relacionadas con grafos y algoritmos de caminos más cortos.
 * Proporciona endpoints para ejecutar el algoritmo de Dijkstra y calcular distancias
 * en grafos dirigidos con pesos.
 *
 * @author Duvan Gil
 * @version 1.0
 */
@RestController
@RequestMapping(Constants.Global.API_BASE_PATH + Constants.Grafo.GRAFO_SERVICE_PATH)
public class GrafoController {

    private final DijkstraService dijkstraService;

    public GrafoController(DijkstraService dijkstraService) {
        this.dijkstraService = dijkstraService;
    }

    /**
     * Calcula las distancias más cortas desde un vértice inicial a todos los demás vértices del grafo.
     *
     * @param grafo El grafo sobre el cual ejecutar el algoritmo
     * @param verticeInicio El ID del vértice desde donde comenzar el cálculo
     * @return ResponseEntity con un mapa de vértices y sus distancias mínimas y caminos desde el vértice inicial
     */
    @PostMapping(Constants.Grafo.GRAFO_SERVICE_PATH_DIJKSTRA)
    public ResponseEntity<?> dijkstra(@RequestBody Grafo grafo,
                                      @RequestParam String verticeInicio) {
        ApiResponseDTO<Map<String, DijkstraDTO>> result = dijkstraService.calcularCaminoMasCorto(grafo, verticeInicio);
        return new ResponseEntity<>(result, HttpStatusCode.valueOf(result.getStatus()));
    }

    /**
     * Calcula la distancia más corta entre dos vértices específicos del grafo.
     *
     * @param grafo El grafo sobre el cual calcular la distancia
     * @param verticeOrigen El ID del vértice de origen
     * @param verticeDestino El ID del vértice de destino
     * @return ResponseEntity con la distancia mínima y el camino entre los dos vértices
     */
    @PostMapping(Constants.Grafo.GRAFO_SERVICE_PATH_DIJKSTRA_DISTANCIA)
    public ResponseEntity<?> calcularDistanciaEntreVertices(@RequestBody Grafo grafo,
                                                                  @RequestParam String verticeOrigen,
                                                                  @RequestParam String verticeDestino) {
        ApiResponseDTO<DijkstraDTO> distancia = dijkstraService.calcularDistanciaEntreVertices(grafo, verticeOrigen, verticeDestino);
        return new ResponseEntity<>(distancia, HttpStatusCode.valueOf(distancia.getStatus()));
    }
}
