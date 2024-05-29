import "./App.css";
import AppRouter from "./AppRouter";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer position="top-right" />
      <AppRouter />
    </div>
  );
}

export default App;
