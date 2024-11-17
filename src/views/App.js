import "./App.scss";
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
