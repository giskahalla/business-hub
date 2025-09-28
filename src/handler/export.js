import * as XLSX from 'xlsx'

export const handleExportExcel = (rows, columns, fileName = "export") => {

  const headers = columns.map(col => col.headerName || col.field);
  const body = rows.map(row => columns.map(col => row[col.field]));

  const worksheetData = [headers, ...body];

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};