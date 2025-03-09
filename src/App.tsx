import React from "react";
import Signup from "./pages/Signup";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import InstallPromptPopup from "./components/InstallPromptPopup/InstallPromptPopup";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Logs from "./pages/Logs";
import Problems from "./pages/Problems";

const App: React.FC = () => {
  // useEffect(() => {
  //   console.log(isInstalled)
  //   const timeout = setTimeout(() => {
  //     setShowInstall(false)
  //   }, 5000)

  //   return clearTimeout(timeout)
  // }, [isInstalled])
  return (
    <div className="flex min-h-screen w-full overflow-y-auto  flex-col p-5 justify-center ">
      <img
        src="/assets/images/logo_angra.png"
        alt="Logo"
        className="mx-auto h-[151px] my-2"
      />

      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/problems" element={<Problems />} />
        {/* <Route path="/logs" element={<Logs />} /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/logs" element={<Logs />} />
        </Route>
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
      <InstallPromptPopup />
    </div>
  );
};

export default App;
