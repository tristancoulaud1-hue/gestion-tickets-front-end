const API_BASE_URL = "http://127.0.0.1:8000";

export async function fetchTickets(filters = {}) {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_BASE_URL}/tickets?${params.toString()}`);
  return await response.json();
}

export async function createTicket(ticket) {
  const response = await fetch(`${API_BASE_URL}/tickets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticket),
  });

  return await response.json();
}

export async function deleteTicket(id) {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
    method: "DELETE",
  });

  return await response.json();
}

export async function updateTicket(id, updatedFields) {
  const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });

  return await response.json();
}