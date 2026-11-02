
const API_URL = "http://localhost:8080/api/cakes";

export async function getCakes() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Unable to load cakes");
  }

  return response.json();
}

export async function addCake(cake) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cake),
  });

  if (!response.ok) {
    throw new Error("Unable to add cake");
  }

  return response.json();
}

export async function updateCake(id, cake) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cake),
  });

  if (!response.ok) {
    throw new Error("Unable to update cake");
  }

  return response.json();
}

export async function deleteCake(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Unable to delete cake");
  }
}
