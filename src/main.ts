import { DataSourceResponce, DataTable } from "./@types/datasource";
import "./style.css";

async function fetchTable({
  sheetid,
  gid,
}: {
  [key: string]: string;
}): Promise<DataTable> {
  return fetch(
    `https://docs.google.com/spreadsheets/d/${sheetid}/gviz/tq?gid=${gid}&tqx=out:json`
  )
    .then((res) => res.text())
    .then((text) => text.slice(47, -2))
    .then((text) => JSON.parse(text) as DataSourceResponce)
    .then((res) => {
      if (res.status === "error") {
        throw new Error(`${res.errors}`);
      }
      if (res.status === "warning") {
        console.warn(res.warnings);
      }
      return res.table;
    });
}

const table = await fetchTable({
  sheetid: "1Qnm1BxOjYjOcaJcw_KodYl8V5F2eT8kCBHvrW5o80YU",
  gid: "0",
});

const cols = table.cols.flatMap((c) => c.label || []);
const obj: { [key: string]: string }[] = table.rows.map((r) =>
  cols.reduce(
    (obj, k, i) => ({ ...obj, [k]: (r.c[i]?.f ?? r.c[i]?.v) || "" }),
    {}
  )
);
// console.log(obj);
document
  .querySelector<HTMLDivElement>("#app")!
  .appendChild(objectToHTMLTable(obj));

function objectToHTMLTable(obj: { [key: string]: string }[]) {
  const t = document.createElement("table");
  const tr = document.createElement("tr");
  cols.map((c) => {
    const th = document.createElement("th");
    th.innerText = c;
    tr.appendChild(th);
  });
  t.appendChild(tr);
  obj.map((r) => {
    const tr = document.createElement("tr");
    cols.map((c) => {
      const td = document.createElement("td");
      td.innerText = r[c];
      tr.appendChild(td);
    });
    t.appendChild(tr);
  });
  return t;
}
