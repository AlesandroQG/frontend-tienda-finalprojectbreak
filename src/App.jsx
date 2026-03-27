import { ThemeProvider } from "./themes/ThemeContext.jsx";
import RoutesApp from "./routes/RoutesApp.jsx";
import "./App.css";

function App() {
    return (
        <>
            <ThemeProvider>
                <RoutesApp />
            </ThemeProvider>
        </>
    );
}

export default App;