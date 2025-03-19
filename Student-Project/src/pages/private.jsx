import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export const Private = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Show notification & redirect to Dashboard
        setTimeout(() => {
          alert("✅ Login successful! Redirecting to Dashboard...");
          navigate("/dashboard");
        }, 1000); // Delay for notification effect
      } else {
        navigate("/"); // Redirect to login if no user
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Private Page</h2>
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <p className="text-gray-600 mb-6">
          {user ? `Welcome, ${user.email}` : "Redirecting..."}
        </p>
      </div>
    </section>
  );
};
