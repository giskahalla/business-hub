
'use client';

import { Box }from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';


export const TableList = (props) => {

  const { filteredData, apiRef, sort, columns } = props

  return (
      <Box sx={{ height: 400, width: 1150 }}>
        <DataGrid
          apiRef={apiRef}
          columns={columns}
          // loading={filteredData.length === 0}
          rows={filteredData.map((row, index) => ({
            ...row,
            id: row.id ?? `row-${index}`,
          }))}
          disableColumnMenu={true}
          pagination
          pageSizeOptions={[5, 10, 25, 50, 100]}
          initialState={{
            ...columns.initialState,
            sorting: {
              ...columns.initialState?.sorting,
              sortModel: [
                {
                  field: sort,
                  sort: 'desc',
                },
              ],
            },
          }}
          sx={{
            border: "none",          
            backgroundColor: "transparent", 
            "& .MuiDataGrid-columnSeparator": {
              display: "none",   
            },
          }}
          rowHeight={80}
          />
      </Box>
  );
}