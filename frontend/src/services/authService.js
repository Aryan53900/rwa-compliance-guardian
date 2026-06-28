import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export async function loginUser(email, password) {
  const response = await axios.post(
    `${API}/api/auth/login`,
    {
      email,
      password,
    }
  );

  return response.data;
}