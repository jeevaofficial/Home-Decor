import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CallNowButton from "./components/CallNowButton";
import AppRoutes from "./routes/AppRoutes";

const AppLayout = () => {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith("/admin");

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {!isAdminArea && <Navbar />}

      <main className="flex-grow">
        <AppRoutes />
      </main>

      {!isAdminArea && (
        <>
          <Footer />
          <WhatsAppButton />
          <CallNowButton />
        </>
      )}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
