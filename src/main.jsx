import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import { AuthProvider } from "./components/AuthContext";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
)