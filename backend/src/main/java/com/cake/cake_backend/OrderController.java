
package com.cake.cake_backend;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = {
	    "http://localhost:5173",
	    "http://127.0.0.1:5500",
	    "http://localhost:5500"
	})
public class OrderController {

    private final OrderRepository orderRepository;

    public OrderController(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // Get all orders
    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // Get order by ID
    @GetMapping("/{id}")
    public Order getOrderById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // Add new order
    @PostMapping
    public Order addOrder(@RequestBody Order order) {
        order.setId(null);
        return orderRepository.save(order);
    }

    // Update existing order
    @PutMapping("/{id}")
    public Order updateOrder(
            @PathVariable Long id,
            @RequestBody Order updatedOrder) {

        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        existingOrder.setCustomer(updatedOrder.getCustomer());
        existingOrder.setItems(updatedOrder.getItems());
        existingOrder.setAmount(updatedOrder.getAmount());
        existingOrder.setStatus(updatedOrder.getStatus());
        existingOrder.setOrderDate(updatedOrder.getOrderDate());
        
        existingOrder.setDeliveryAddress(updatedOrder.getDeliveryAddress());
        existingOrder.setCity(updatedOrder.getCity());
        existingOrder.setPincode(updatedOrder.getPincode());
        existingOrder.setPhone(updatedOrder.getPhone());
        existingOrder.setPaymentMethod(updatedOrder.getPaymentMethod());
        existingOrder.setInstructions(updatedOrder.getInstructions());

        return orderRepository.save(existingOrder);
    }

    // Delete order
    @DeleteMapping("/{id}")
    public void deleteOrder(@PathVariable Long id) {
        orderRepository.deleteById(id);
    }
}

