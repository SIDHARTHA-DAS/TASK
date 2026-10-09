import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { useEffect } from "react";
import { getCurrentUser } from "./services/api";
export const serverUrl = "https://task-ai-note-server.onrender.com";
import { useDispatch, useSelector } from "react-redux";
import History from "./pages/History";
import Notes from "./pages/Notes";
import Pricing from "./pages/Pricing";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";

const App = () => {

  const dispatch = useDispatch();
  
  // function for get current user data
  useEffect(() => {
    getCurrentUser(dispatch);
  }, [dispatch]);

  const { userData } = useSelector((state) => state.user);
  
  return (
    <>
      <Routes>
        <Route path="/" element={userData ? <Home /> : <Navigate to="/auth" replace/>} />  // route for home page
        <Route path="/auth" element={userData ? <Navigate to="/" replace/> : <Auth />} />   // route for auth or login page
        <Route path="/history" element={userData ?<History/> : <Navigate to="/auth" replace/>} /> // route for history or your note page
        <Route path="/notes" element={userData ? <Notes /> : <Navigate to="/auth" replace/>} />  // route for note generate page
        <Route path="/pricing" element={userData ? <Pricing /> : <Navigate to="/auth" replace/>} />  route for pricing page

        <Route path="/payment-success" element={<PaymentSuccess/>}/> //route for payment success page
        <Route path="/payment-failed" element={<PaymentFail/>}/>  // route for payment fail page
      </Routes>
    </>
  );
};

export default App;
