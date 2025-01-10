import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
// import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export default function DataTable({
	columns,
	rows,
	onDataChange,
	totalPeopleHours,
	totalCostUSD,
	totalPrimeCostUSD,
	totalProfitUSD,
}) {
	return (
		<Box
			sx={{
				'& .css-1gqmilo-MuiDataGrid-columnHeaderTitle': {
					whiteSpace: 'normal',
				},
				'& .css-twqb3m-MuiDataGrid-root .MuiDataGrid-columnHeader--alignRight .MuiDataGrid-columnHeaderTitleContainer':
					{textAlign: 'left', flexDirection: 'row'},
				'& .css-twqb3m-MuiDataGrid-root .MuiDataGrid-cell--textRight': {
					textAlign: 'left',
				},
				width: '100%',
				marginBottom: '96px',
			}}
		>
			<DataGrid
				sx={{borderBottomLeftRadius: '0', borderBottomRightRadius: '0'}}
				rows={rows}
				columns={columns}
				initialState={{
					columns: {
						columnVisibilityModel: {
							id: false,
						},
					},
				}}
				pageSizeOptions={[5]}
				disableRowSelectionOnClick
				disableColumnMenu
				disableColumnResize
				hideFooter
				processRowUpdate={row => {
					onDataChange(row);
					return row;
				}}
				onProcessRowUpdateError={error => {
					console.error('Error updating row:', error);
				}}
			/>
			<Box
				sx={{
					width: '100%',
					background: '#e9561d',
					color: '#fff',
					borderBottomLeftRadius: '4px',
					borderBottomRightRadius: '4px',
					padding: '4px 0',
					display: 'grid',
					gridTemplateColumns:
						'200px 200px 200px 250px 150px 150px 176px 150px',
					'& .cell': {
						padding: '0 10px',
						textAlign: 'left',
					},
				}}
			>
				<Box className='cell' sx={{textAlign: 'left !important'}}>
					Всього
				</Box>
				<Box className='cell'></Box>
				<Box className='cell'></Box>
				<Box className='cell'>{Number(totalPeopleHours).toLocaleString()}</Box>
				<Box className='cell'></Box>
				<Box className='cell'>{Number(totalCostUSD).toLocaleString()}</Box>
				<Box className='cell'>{Number(totalPrimeCostUSD).toLocaleString()}</Box>
				<Box className='cell'>{Number(totalProfitUSD).toLocaleString()}</Box>
			</Box>
		</Box>
	);
}

DataTable.propTypes = {
	columns: PropTypes.array.isRequired,
	rows: PropTypes.array.isRequired,
	onDataChange: PropTypes.func.isRequired,
	totalPeopleHours: PropTypes.number.isRequired,
	totalCostUSD: PropTypes.number.isRequired,
	totalPrimeCostUSD: PropTypes.number.isRequired,
	totalProfitUSD: PropTypes.number.isRequired,
};
