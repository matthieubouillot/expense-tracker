import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Register from "./Register"; // ✅

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false); // ✅

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        alert(data.error || "Erreur de connexion");
        return;
      }
  
      login(data); // ✅ Stocke à la fois user et token dans le contexte
    } catch (err) {
      alert("Erreur réseau");
    }
  };
  // ✅ Affiche la page d’inscription
  if (showRegister) return <Register />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4 w-80">
        <h2 className="text-2xl font-semibold text-center">Connexion</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Se connecter
        </button>
        <p className="text-sm text-center">
          Pas de compte ?{" "}
          <button
            type="button"
            onClick={() => setShowRegister(true)}
            className="text-blue-600 underline"
          >
            Créer un compte
          </button>
        </p>
      </form>
    </div>
  );
}