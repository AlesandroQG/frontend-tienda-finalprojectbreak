import { ThemeProvider } from "./themes/ThemeContext.jsx";
import { AuthProvider } from "./auth/AuthContext.jsx";
import RoutesApp from "./routes/RoutesApp.jsx";
import "./App.css";

function App() {
    return (
        <>
            <ThemeProvider>
                <AuthProvider>
                    <RoutesApp />
                </AuthProvider>
            </ThemeProvider>
        </>
    );
}

export default App;