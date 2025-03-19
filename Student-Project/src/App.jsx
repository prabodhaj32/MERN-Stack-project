import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { Login } from "./pages/Login"; 
import { Private } from "./pages/Private";
import NavbarMain from "./components/navbar/NavbarMain"; 
import HeroMain from "./components/HeroSection/HeroMain";

function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsFetching(false);
    });

    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return <h2>Loading...</h2>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* user is NOT logged in, show Login page  */}
        <Route path="/" element={user ? <Navigate to="/HeroMain" /> : <Login />} />

       {/* Private Route - Only accessible when logge */}
        <Route path="/HeroMain" element={user ? <Private /> : <Navigate to="/" />} />
      </Routes>

      {/* Show Navbar & HeroMain only if the user is logged in  */}
      {user && (
        <>
          <NavbarMain />
          <HeroMain />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
