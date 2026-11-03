
package com.cake.cake_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cake.cake_backend.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
