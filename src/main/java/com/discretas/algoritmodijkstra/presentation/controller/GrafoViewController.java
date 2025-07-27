package com.discretas.algoritmodijkstra.presentation.controller;

import com.discretas.algoritmodijkstra.models.Grafo;
import com.discretas.algoritmodijkstra.utils.Constants;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controlador de vistas para la gestión y visualización de grafos.
 * Permite acceder a la página principal y a la vista de creación de grafos.
 *
 * @author Duvan
 * @version 1.0
 */
@Controller
public class GrafoViewController {

    /**
     * Muestra la página principal de la aplicación.
     *
     * @return Nombre de la plantilla index.html
     */
    @GetMapping("/")
    public String index() {
        return "index";
    }

    /**
     * Vista principal para crear el grafo y ejecutar ambos métodos de Dijkstra.
     * Desde aquí se puede calcular tanto las distancias desde un vértice de inicio
     * como el camino más corto entre dos vértices específicos, ya que el frontend
     * consume ambos endpoints REST y muestra los resultados en la misma página.
     *
     * @param model Modelo de Spring para pasar atributos a la vista
     * @return Nombre de la plantilla grafo/crear.html
     */
    @GetMapping(Constants.Grafo.GRAFO_SERVICE_PATH + Constants.Grafo.GRAFO_SERVICE_PATH_CREAR)
    public String crearGrafo(Model model) {
        model.addAttribute("grafo", new Grafo());
        return "grafo/crear";
    }
}