// src/components/DataTable.tsx
import type { TableSchema } from "../types";

type Product = {
  id: number;
  [key: string]: unknown;
};

type DataTableProps = {
  schema: TableSchema;
  data: Product[];
};

function formatValue(value: unknown, type: string) {
  if (value == null) return "—";

  if (type === "currency" && typeof value === "number") {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "CRC",
    }).format(value);
  }

  return String(value);
}

export function DataTable({ schema, data }: DataTableProps) {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {schema.columns.map((column) => (
              <th key={column.key} scope="col">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {schema.columns.map((column) => (
                <td key={column.key}>
                  {formatValue(row[column.key], column.type)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
