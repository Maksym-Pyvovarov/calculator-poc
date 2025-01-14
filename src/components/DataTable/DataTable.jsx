import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';
import PropTypes from 'prop-types';

export function CustomFooterComponent({
	totalPeopleHours,
	totalCostUSD,
	totalPrimeCostUSD,
	totalProfitUSD,
}) {
	return (
		<Box
			sx={{
				width: '100%',
				background: '#e9561d',
				color: '#fff',
				fontSize: 'inherit',
				borderBottomLeftRadius: '4px',
				borderBottomRightRadius: '4px',
				padding: '4px 0',
				display: 'grid',
				// gridTemplateColumns: '200px 200px 200px 250px 150px 150px 176px 150px',
				gridTemplateColumns: '4fr 4fr 4fr 5fr 3fr 3fr 3.52fr 3fr',
				overflowX: 'scroll',
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
	);
}

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
					{
						textAlign: 'left',
						flexDirection: 'row',
					},
				'& .css-twqb3m-MuiDataGrid-root .MuiDataGrid-cell--textRight': {
					textAlign: 'left',
				},
				width: '100%',
				marginBottom: '32px',
				overflow: 'auto', // Добавлено для скроллинга
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
				slots={{footer: CustomFooterComponent}}
				slotProps={{
					footer: {
						totalPeopleHours,
						totalCostUSD,
						totalPrimeCostUSD,
						totalProfitUSD,
					},
				}}
				hideFooterPagination
				pageSizeOptions={[5]}
				disableRowSelectionOnClick
				disableColumnMenu
				disableColumnResize
				processRowUpdate={row => {
					onDataChange(row);
					return row;
				}}
				onProcessRowUpdateError={error => {
					console.error('Error updating row:', error);
				}}
			/>
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

CustomFooterComponent.propTypes = {
	totalPeopleHours: PropTypes.number.isRequired,
	totalCostUSD: PropTypes.number.isRequired,
	totalPrimeCostUSD: PropTypes.number.isRequired,
	totalProfitUSD: PropTypes.number.isRequired,
};
