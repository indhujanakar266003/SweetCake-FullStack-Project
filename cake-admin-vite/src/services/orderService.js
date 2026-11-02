const API_URL = "http://localhost:8080/api/orders";

export async function getOrders() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to fetch orders");
    }

    return response.json();
}

export async function addOrder(orderData) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    });

    if (!response.ok) {
        throw new Error("Failed to add order");
    }

    return response.json();
}

export async function updateOrder(id, orderData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(orderData)
    });

    if (!response.ok) {
        throw new Error("Failed to update order");
    }

    return response.json();
}

export async function deleteOrder(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete order");
    }
}