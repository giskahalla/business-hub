'use client';

import { Table, TableContainer, TableBody, TableHead, TableRow, TableCell, 
        TablePagination, TableSortLabel } from '@mui/material';
import { useState } from 'react';

export const TableList = ({ columns, filteredData, filteredInfo, setFilteredInfo }) => {

  const [orderBy, setOrderBy] = useState('updatedAt');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property) => (event) => {
    const isAsc = orderBy === property && filteredInfo?.[orderBy] === 'asc';
    setFilteredInfo(prev => ({...prev, [orderBy]: isAsc ? 'desc' : 'asc'}));
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 330 }} className='my-5'>
          <Table sx={{ minWidth: 650 }} stickyHeader>
          <TableHead>
              <TableRow>
              {columns?.map((column) => (
                  <TableCell
                    key={column.field}
                    style={{ minWidth: column.minWidth }}
                  >
                    <TableSortLabel
                      active={column.field === orderBy}
                      direction={orderBy === column.field ? filteredInfo?.[orderBy] : 'desc'}
                      onClick={handleRequestSort(column.field)}
                      >
                      {column.headerName}
                    </TableSortLabel>
                  </TableCell>
              ))}
              </TableRow>
          </TableHead>
          <TableBody>
              {filteredData
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((row, i) => {
                  return (
                  <TableRow hover role="checkbox" key={row.id || i}>
                      {columns.map((col) => {
                      return (
                          <TableCell key={col.field}>
                            {col.renderer ? col.renderer(row) : row[col.field]}
                          </TableCell>
                      );
                      })}
                  </TableRow>
                  );
              })}
          </TableBody>
          </Table>
      </TableContainer>
      <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </>
  );
}