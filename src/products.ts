// src/products.ts
import type { TableSchema } from "./types";

export const PRODUCT_SCHEMA: TableSchema = {
  columns: [
    { key: "name", header: "Producto", type: "text" },
    { key: "price", header: "Precio", type: "currency" },
    { key: "category", header: "Categoría", type: "text" },
  ],
};

export const MOCK_DATA = [
  { id: 1, name: "Teclado", price: 12500, category: "Accesorios" },
  { id: 2, name: "Monitor", price: 98500, category: "Pantallas" },
  { id: 3, name: "Mouse", price: 8500, category: "Accesorios" },
];
