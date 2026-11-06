import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { DataTable } from "../components/DataTable";
import type { TableSchema } from "../types";

const cases = [
  {
    name: "renders a single text column",
    schema: {
      columns: [{ key: "name", header: "Producto", type: "text" }],
    },
    data: [{ id: 1, name: "Teclado" }],
    expectedHeaders: ["Producto"],
    expectedRows: [["Teclado"]],
  },
  {
    name: "renders multiple columns and records",
    schema: {
      columns: [
        { key: "name", header: "Producto", type: "text" },
        { key: "price", header: "Precio", type: "currency" },
      ],
    },
    data: [
      { id: 1, name: "Mouse", price: 8 },
      { id: 2, name: "Teclado", price: 12 },
    ],
    expectedHeaders: ["Producto", "Precio"],
    expectedRows: [
      ["Mouse", new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC" }).format(8)],
      ["Teclado", new Intl.NumberFormat("es-CR", { style: "currency", currency: "CRC" }).format(12)],
    ],
  },
  {
    name: "renders a placeholder for null values",
    schema: {
      columns: [{ key: "name", header: "Producto", type: "text" }],
    },
    data: [{ id: 1, name: null }],
    expectedHeaders: ["Producto"],
    expectedRows: [["—"]],
  },
] satisfies {
  name: string;
  schema: TableSchema;
  data: { id: number; [key: string]: unknown }[];
  expectedHeaders: string[];
  expectedRows: string[][];
}[];

describe("DataTable", () => {
  it.each(cases)("$name", ({ schema, data, expectedHeaders, expectedRows }) => {
    render(<DataTable schema={schema} data={data} />);

    for (const header of expectedHeaders) {
      expect(
        screen.getByRole("columnheader", { name: header }),
      ).toBeInTheDocument();
    }

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(expectedRows.length + 1);

    expectedRows.forEach((expectedCells, rowIndex) => {
      const cells = within(rows[rowIndex + 1]).getAllByRole("cell");
      expect(cells).toHaveLength(expectedCells.length);
      expectedCells.forEach((cell, cellIndex) => {
        expect(cells[cellIndex]).toHaveTextContent(cell);
      });
    });
  });
});
