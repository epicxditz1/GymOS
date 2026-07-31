const API_URL = "http://localhost:5000/api/users";

export async function getOwnerProfile() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
export async function updateOwnerProfile(formData) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/me`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}