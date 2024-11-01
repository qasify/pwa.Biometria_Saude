import React, { } from "react";
import Signup from "./pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import InstallPromptPopup from "./components/InstallPromptPopup/InstallPromptPopup";

const App: React.FC = () => {

  // useEffect(() => {
  //   console.log(isInstalled)
  //   const timeout = setTimeout(() => {
  //     setShowInstall(false)
  //   }, 5000)

  //   return clearTimeout(timeout)
  // }, [isInstalled])
  return (
    <div className="flex min-h-screen w-full overflow-y-auto bg-background-light">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
        <Route path="*" element={<Navigate to="/signup" replace />} />
      </Routes>
      <InstallPromptPopup />
    </div>
  );
};

export default App;