package com.cake.cake_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cake.cake_backend.entity.Cake;

public interface CakeRepository extends JpaRepository<Cake, Long> {

}
