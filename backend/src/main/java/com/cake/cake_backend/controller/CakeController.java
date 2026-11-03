package com.cake.cake_backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.cake.cake_backend.entity.Cake;
import com.cake.cake_backend.service.CakeService;

@RestController
@RequestMapping("/api/cakes")
@CrossOrigin(origins = "http://localhost:5173")
public class CakeController {

    private final CakeService cakeService;

    public CakeController(CakeService cakeService) {
        this.cakeService = cakeService;
    }

    @GetMapping
    public List<Cake> getAllCakes() {
        return cakeService.getAllCakes();
    }

    @GetMapping("/{id}")
    public Cake getCakeById(@PathVariable Long id) {
        Cake cake = cakeService.getCakeById(id);

        if (cake == null) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Cake not found"
            );
        }

        return cake;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cake addCake(@RequestBody Cake cake) {
        return cakeService.saveCake(cake);
    }

    @PutMapping("/{id}")
    public Cake updateCake(
            @PathVariable Long id,
            @RequestBody Cake cakeDetails) {

        Cake existingCake = cakeService.getCakeById(id);

        if (existingCake == null) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Cake not found"
            );
        }

        existingCake.setName(cakeDetails.getName());
        existingCake.setFlavour(cakeDetails.getFlavour());
        existingCake.setPrice(cakeDetails.getPrice());
        existingCake.setQuantity(cakeDetails.getQuantity());

        return cakeService.saveCake(existingCake);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCake(@PathVariable Long id) {
        if (cakeService.getCakeById(id) == null) {
            throw new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Cake not found"
            );
        }

        cakeService.deleteCake(id);
    }
}
