// src/types.ts
export type ColumnType = "text" | "currency" | "badge";

export interface ColumnConfig {
  key: string;
  header: string;
  type: ColumnType;
}

export interface TableSchema {
  columns: ColumnConfig[];
}
