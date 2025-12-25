import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import VerifyPage from "./pages/VerifyPage";
import DashboardPage from "./pages/DashboardPage";
import WorkoutPage from "./pages/WorkoutPage";
import ExercisePage from "./pages/ExercisePage";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function App() {

    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
        (response) => response,
        (error) => {
          
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.warn("Session expired or invalid token. Logging out...");
            
            localStorage.removeItem("token");
            localStorage.removeItem("email");

           
            if (window.location.pathname !== "/login") {
                window.location.href = "/login";
            }
            }
            return Promise.reject(error);
        }
        );

        return () => axios.interceptors.response.eject(interceptor);
    }, [navigate]);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage/>} />
            <Route path="/verify" element={<VerifyPage/>} />
            <Route path = "/" element={<DashboardPage />} />
            <Route path = "/workout:id" element={<WorkoutPage />} />
            <Route path = "/exercise:id" element={<ExercisePage />} />
        </Routes>
    );
}

export default App;
