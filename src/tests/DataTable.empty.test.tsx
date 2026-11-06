import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { DataTable } from "../components/DataTable";
import type { TableSchema } from "../types";

describe("DataTable with no records", () => {
  it("renders the column headers without data rows", () => {
    const schema: TableSchema = {
      columns: [
        { key: "name", header: "Producto", type: "text" },
        { key: "price", header: "Precio", type: "currency" },
      ],
    };

    render(<DataTable schema={schema} data={[]} />);

    expect(screen.getByRole("columnheader", { name: "Producto" })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "Precio" })).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(1);
    expect(screen.queryByRole("cell")).not.toBeInTheDocument();
  });
});
