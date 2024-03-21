import "./App.css";
import viteLogo from "/vite.svg";
import Layout from "./components/variant.2/layout";

function App() {
  console.log("APP");

  return (
    <>
      <a href="https://vitejs.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <Layout />
    </>
  );
}

export default App;
