import Box from '@mui/material/Box';
import {DataGrid} from '@mui/x-data-grid';

const columns = [
	{field: 'id', headerName: 'ID', hideable: true, width: 0},
	{field: 'grade', headerName: 'Грейд', width: 200, sortable: false},
	{
		field: 'peopleQuantity',
		headerName: 'Кількість залучених людей',
		width: 200,
		editable: true,
		sortable: false,
		type: 'number',
	},
	{
		field: 'involvement',
		headerName: '% залучення',
		width: 200,
		editable: true,
		type: 'number',
		sortable: false,
	},
	{
		field: 'peopleHours',
		headerName: 'Кількість людино-годин',
		type: 'number',
		width: 250,
		editable: false,
		sortable: false,
	},
	{
		field: 'usdRate',
		headerName: 'Ставка, USD',
		type: 'number',
		width: 150,
		editable: false,
		sortable: false,
	},
	{
		field: 'usdCost',
		headerName: 'Вартість, USD',
		type: 'number',
		width: 150,
		editable: false,
		sortable: false,
	},
	{
		field: 'usdPrimeCost',
		headerName: 'Собівартість, USD',
		type: 'number',
		width: 176,
		editable: false,
		sortable: false,
	},
	{
		field: 'usdProfit',
		headerName: 'Прибуток, USD',
		type: 'number',
		width: 150,
		editable: false,
		sortable: false,
	},
	// {
	// 	field: 'fullName',
	// 	headerName: 'Full name',
	// 	description: 'This column has a value getter and is not sortable.',
	// 	sortable: false,
	// 	width: 160,
	// 	valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
	// },
];

const rows = [
	{
		id: 1,
		grade: 'Партнер',
		peopleQuantity: 0,
		involvement: 0,
		peopleHours: 100,
		usdRate: 350,
		usdCost: 35000,
		usdPrimeCost: 4793,
		usdProfit: 30207,
	},
	{
		id: 2,
		grade: 'Радник',
		peopleQuantity: 0,
		involvement: 0,
		peopleHours: 100,
		usdRate: 350,
		usdCost: 35000,
		usdPrimeCost: 4793,
		usdProfit: 30207,
	},
	{
		id: 3,
		grade: 'Старший юрист',
		peopleQuantity: 0,
		involvement: 0,
		peopleHours: 100,
		usdRate: 350,
		usdCost: 35000,
		usdPrimeCost: 4793,
		usdProfit: 30207,
	},
	{
		id: 4,
		grade: 'Юрист',
		peopleQuantity: 0,
		involvement: 0,
		peopleHours: 100,
		usdRate: 350,
		usdCost: 35000,
		usdPrimeCost: 4793,
		usdProfit: 30207,
	},
	{
		id: 5,
		grade: 'Молодший юрист',
		peopleQuantity: 0,
		involvement: 0,
		peopleHours: 100,
		usdRate: 350,
		usdCost: 35000,
		usdPrimeCost: 4793,
		usdProfit: 30207,
	},
	{
		id: 6,
		grade: 'Помічник юриста',
		peopleQuantity: 0,
		involvement: 0,
		peopleHours: 100,
		usdRate: 350,
		usdCost: 35000,
		usdPrimeCost: 4793,
		usdProfit: 30207,
	},
	{
		id: 7,
		grade: 'Адмін.менеджер',
		peopleQuantity: 0,
		involvement: 0,
		peopleHours: 100,
		usdRate: 350,
		usdCost: 35000,
		usdPrimeCost: 4793,
		usdProfit: 30207,
	},
];

export default function DataTable() {
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
				onStateChange={e => console.log(e.rows.dataRowIdToModelLookup)}
			/>
			<Box
				sx={{
					width: '100%',
					background: '#e9561d',
					color: '#fff',
					borderBottomLeftRadius: '4px',
					borderBottomRightRadius: '4px',
					padding: '4px',
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
				<Box className='cell'>500</Box>
				<Box className='cell'></Box>
				<Box className='cell'>91000</Box>
				<Box className='cell'>10332</Box>
				<Box className='cell'>80668</Box>
			</Box>
		</Box>
	);
}
