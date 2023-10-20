interface Header {
  version: string;
  reqId: string;
}

interface OkBody {
  status: "ok";
  sig: string;
  table: DataTable;
}

interface WarnBody {
  status: "warning";
  warnings: Warning[];
  sig: string;
  table: DataTable;
}

interface ErrorBody {
  status: "error";
  errors: Error[];
}

export type DataSourceResponce = Header & (OkBody | WarnBody | ErrorBody);

interface DataTable {
  cols: Col[];
  rows: Row[];
  parsedNumHeaders: number;
}

interface Col {
  id: string;
  label: string;
  type: string;
  pattern?: string;
}

interface Row {
  c: (Cell | null)[];
}

interface Cell {
  v: unknown;
  f?: string;
}

interface Warning {
  reason: string;
  message: string;
  detailed_message: string;
}

interface Error {
  reason: string;
  message: string;
  detailed_message: string;
}
