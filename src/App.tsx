import "./App.css";
import { DataTable } from "./components/DataTable";
import { PRODUCT_SCHEMA, MOCK_DATA } from "./products";

function App() {
  return (
    <main>
      <h1>Lista de productos</h1>
      <DataTable schema={PRODUCT_SCHEMA} data={MOCK_DATA} />
    </main>
  );
}

export default App;
