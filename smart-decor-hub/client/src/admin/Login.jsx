import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Home, KeyRound, Mail, AlertTriangle, LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    document.title = "Admin Login | BEST HOME DECORS";
  }, []);

  useEffect(() => {
    if (user) navigate("/admin/dashboard");
  }, [user, navigate]);

  useEffect(() => {
    if (searchParams.get("message") === "session_expired") {
      setError("Your session has expired. Please log in again.");
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await login(email, password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-accent-gray">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-gray-100 shadow-xl">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex p-3 bg-primary-700 rounded-xl text-white">
            <Home size={28} />
          </div>
          <h2 className="font-bold text-xl text-accent-charcoal">BEST HOME DECORS</h2>
          <p className="text-gray-400 text-sm">Admin Panel Login</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-xl flex items-start gap-2">
              <AlertTriangle size={18} className="flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-gray-400">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@besthomedecors.com"
                className="w-full bg-accent-gray border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase text-gray-400">Password</label>
            <div className="relative">
              <KeyRound size={16} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-accent-gray border border-gray-100 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:border-primary-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-75"
          >
            <LogIn size={16} />
            {submitting ? "Signing in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
