
const API_URL = "http://localhost:8080/api/customers";

export async function getCustomers() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load customers");
  }

  return response.json();
}

export async function addCustomer(customer) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
    throw new Error("Failed to add customer");
  }

  return response.json();
}


export async function updateCustomer(id, customer) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(customer),
  });

  if (!response.ok) {
  const errorText = await response.text();
  console.error("Update API error:", response.status, errorText);
  throw new Error(
    `Failed to update customer (${response.status}): ${errorText}`
  );
}

  return response.json();
}

export async function deleteCustomer(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete customer");
  }
}
