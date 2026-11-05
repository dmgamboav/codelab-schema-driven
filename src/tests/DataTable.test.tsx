import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { DataTable } from "../components/DataTable";
import type { TableSchema } from "../types";

const cases = [
  {
    name: "muestra una columna",
    schema: {
      columns: [{ key: "name", header: "Producto", type: "text" }],
    },
    data: [{ name: "Teclado" }],
    expectedHeaders: ["Producto"],
    expectedCells: ["Teclado"],
  },
  {
    name: "muestra varias columnas",
    schema: {
      columns: [
        { key: "name", header: "Producto", type: "text" },
        { key: "price", header: "Precio", type: "number" },
      ],
    },
    data: [{ name: "Mouse", price: 8 }],
    expectedHeaders: ["Producto", "Precio"],
    expectedCells: ["Mouse", "8"],
  },
] satisfies {
  name: string;
  schema: TableSchema;
  data: Record<string, unknown>[];
  expectedHeaders: string[];
  expectedCells: string[];
}[];

describe("DataTable", () => {
  it.each(cases)(
    "$name",
    ({ schema, data, expectedHeaders, expectedCells }) => {
      render(<DataTable schema={schema} data={data} />);

      for (const header of expectedHeaders) {
        expect(
          screen.getByRole("columnheader", { name: header }),
        ).toBeInTheDocument();
      }

      const rows = screen.getAllByRole("row");
      const dataRow = within(rows[1]).getAllByRole("cell");

      expectedCells.forEach((cell, index) => {
        expect(dataRow[index]).toHaveTextContent(cell);
      });
    },
  );
});
