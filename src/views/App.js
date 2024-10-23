import "./App.scss";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/_all.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AppRouter from "../routers/AppRouter";
export function App() {
  return (
    <>
      <AppRouter />
    </>
  );
}
