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
				minWidth: '1325px',
				background: '#e9561d',
				color: '#fff',
				fontSize: 'inherit',
				borderBottomLeftRadius: '4px',
				borderBottomRightRadius: '4px',
				padding: '4px 0',
				display: 'grid',
				gridTemplateColumns: '200px 200px 200px 250px 150px 150px 176px 150px',
				'& .cell': {
					padding: '0 10px',
					textAlign: 'right',
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
				width: '100%',
				marginBottom: '32px',
				overflow: 'visible',
				'@media (max-width: 1560px)': {
					overflow: 'auto',
				},
			}}
		>
			<DataGrid
				sx={{
					borderBottomLeftRadius: '0',
					borderBottomRightRadius: '0',
					width: 'max-content', // Чтобы таблица занимала всю доступную ширину
				}}
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
