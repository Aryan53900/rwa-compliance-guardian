import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
  
    if (token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await loginUser(
        formData.email,
        formData.password
      );

      login(response.user, response.token);

      toast.success("Login Successful!");

      navigate("/");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#CFE8D5] flex justify-center items-center px-5">

      <div className="w-full max-w-md bg-white border-4 border-black shadow-[10px_10px_0_black] p-8">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-black">
            AI Compliance Guardian
          </h1>

          <p className="mt-3 text-gray-600">
            Secure Login
          </p>

        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>

            <label className="font-semibold block mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@guardian.ai"
              className="w-full border-2 border-black p-3"
              required
            />

          </div>

          <div>

            <label className="font-semibold block mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border-2 border-black p-3"
              required
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-black
              text-white
              py-3
              font-bold
              border-2
              border-black
              hover:bg-white
              hover:text-black
              transition
            "
          >
            {loading ? "Signing In..." : "Login"}
          </button>

        </form>

        <div className="mt-8 border-t pt-5">

          <h3 className="font-bold mb-3">
            Demo Credentials
          </h3>

          <div className="bg-gray-100 p-4 rounded">

            <p>
              <strong>Email:</strong>
              {" "}
              admin@guardian.ai
            </p>

            <p>
              <strong>Password:</strong>
              {" "}
              admin123
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;