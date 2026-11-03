package com.cake.cake_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cake.cake_backend.entity.Cake;
import com.cake.cake_backend.repository.CakeRepository;

@Service
public class CakeService {

    private final CakeRepository cakeRepository;

    public CakeService(CakeRepository cakeRepository) {
        this.cakeRepository = cakeRepository;
    }

    public Cake saveCake(Cake cake) {
        return cakeRepository.save(cake);
    }

    public List<Cake> getAllCakes() {
        return cakeRepository.findAll();
    }

    public Cake getCakeById(Long id) {
        return cakeRepository.findById(id).orElse(null);
    }

    public void deleteCake(Long id) {
        cakeRepository.deleteById(id);
    }
}
