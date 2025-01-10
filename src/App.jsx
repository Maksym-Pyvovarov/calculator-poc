import {
	CssBaseline,
	Container,
	Box,
	TextField,
	ThemeProvider,
	createTheme,
	InputAdornment,
	FormControl,
	OutlinedInput,
	InputLabel,
	Typography,
} from '@mui/material';
import {useState, useEffect} from 'react';
import moment from 'moment';
import 'moment/locale/en-gb';
import PartnerSelect from './components/PartnerSelect/PartnerSelect';
import PracticeSelect from './components/PracticeSelect/PracticeSelect';
import MUIDatePicker from './components/DatePicker/DatePicker';
import CurrencySelect from './components/CurrencySelect/CurrencySelect';
import DataTable from './components/DataTable/DataTable';

// Создаём кастомную локаль
moment.updateLocale('en-custom', {
	week: {
		dow: 1, // Начало недели с понедельника
	},
});

import './App.css';

function App() {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#e9561d',
				dark: '#e9561d',
			},
		},
	});

	const [projectName, setProjectName] = useState('');
	const [selectedPartner, setSelectedPartner] = useState('');
	const [selectedPractice, setSelectedPractice] = useState('');
	const [selectedDate, setSelectedDate] = useState(moment());
	const [selectedCurrency, setSelectedCurrency] = useState('UAH');
	const [discountPercentage, setDiscountPercentage] = useState(0);
	const [riskPercentage, setRiskPercentage] = useState(0);
	const [projectDuration, setProjectDuration] = useState(0);
	const [additionalExpenses, setAdditionalExpenses] = useState(0);
	const [exchangeRate, setExchangeRate] = useState(0);

	const [totalCostUSD, setTotalCostUSD] = useState(0);
	const [totalCostUAH, setTotalCostUAH] = useState(0);
	const [totalProfit, setTotalProfit] = useState(0);

	const [tableData, setTableData] = useState([
		{
			id: 1,
			grade: 'Партнер',
			peopleQuantity: 0,
			involvement: 0,
			peopleHours: 0,
			usdRate: 350,
			usdCost: 0,
			usdPrimeCost: 0,
			usdProfit: 0,
			rate: 48,
		},
		{
			id: 2,
			grade: 'Радник',
			peopleQuantity: 0,
			involvement: 0,
			peopleHours: 0,
			usdRate: 250,
			usdCost: 0,
			usdPrimeCost: 0,
			usdProfit: 0,
			rate: 28,
		},
		{
			id: 3,
			grade: 'Старший юрист',
			peopleQuantity: 0,
			involvement: 0,
			peopleHours: 0,
			usdRate: 200,
			usdCost: 0,
			usdPrimeCost: 0,
			usdProfit: 0,
			rate: 21,
		},
		{
			id: 4,
			grade: 'Юрист',
			peopleQuantity: 0,
			involvement: 0,
			peopleHours: 0,
			usdRate: 150,
			usdCost: 0,
			usdPrimeCost: 0,
			usdProfit: 0,
			rate: 11,
		},
		{
			id: 5,
			grade: 'Молодший юрист',
			peopleQuantity: 0,
			involvement: 0,
			peopleHours: 0,
			usdRate: 100,
			usdCost: 0,
			usdPrimeCost: 0,
			usdProfit: 0,
			rate: 5,
		},
		{
			id: 6,
			grade: 'Помічник юриста',
			peopleQuantity: 0,
			involvement: 0,
			peopleHours: 0,
			usdRate: 80,
			usdCost: 0,
			usdPrimeCost: 0,
			usdProfit: 0,
			rate: 6,
		},
		{
			id: 7,
			grade: 'Адмін.менеджер',
			peopleQuantity: 0,
			involvement: 0,
			peopleHours: 0,
			usdRate: 50,
			usdCost: 0,
			usdPrimeCost: 0,
			usdProfit: 0,
			rate: 9,
		},
	]);

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
			valueGetter: (value, row) => {
				return (
					projectDuration * row.peopleQuantity * (row.involvement / 100) * 40
				);
			},
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
			valueGetter: (value, row) => {
				return (
					projectDuration *
					5 *
					8 *
					row.peopleQuantity *
					(row.involvement / 100) *
					row.usdRate
				);
			},
		},
		{
			field: 'usdPrimeCost',
			headerName: 'Собівартість, USD',
			type: 'number',
			width: 176,
			editable: false,
			sortable: false,
			valueGetter: (value, row) => {
				return row.rate * row.peopleHours;
			},
		},
		{
			field: 'usdProfit',
			headerName: 'Прибуток, USD',
			type: 'number',
			width: 150,
			editable: false,
			sortable: false,
			valueGetter: (value, row) => {
				return row.usdCost - row.usdPrimeCost;
			},
		},
	];

	const [tableTotalPeopleHours, setTableTotalPeopleHours] = useState(0);
	const [tableTotalCostUSD, setTableTotalCostUSD] = useState(0);
	const [tableTotalPrimeCostUSD, setTableTotalPrimeCostUSD] = useState(0);
	const [tableTotalProfitUSD, setTableTotalProfitUSD] = useState(0);

	useEffect(() => {
		setTableTotalPeopleHours(
			tableData.reduce((sum, current) => sum + current.peopleHours, 0)
		);
		setTableTotalCostUSD(
			tableData.reduce((sum, current) => sum + current.usdCost, 0)
		);

		setTableTotalPrimeCostUSD(
			tableData.reduce((sum, current) => sum + current.usdPrimeCost, 0)
		);

		setTableTotalProfitUSD(
			tableData.reduce((sum, current) => sum + current.usdProfit, 0)
		);

		setTotalCostUSD(
			tableTotalCostUSD +
				tableTotalCostUSD * (riskPercentage / 100) -
				tableTotalCostUSD * (discountPercentage / 100) +
				additionalExpenses
		);

		setTotalCostUAH(totalCostUSD * exchangeRate);

		setTotalProfit(
			((totalCostUAH - tableTotalPrimeCostUSD - additionalExpenses) /
				totalCostUAH) *
				100
		);

		setTableData(
			tableData.map(item => {
				return {
					...item,
					peopleHours: Number(
						(
							projectDuration *
							item.peopleQuantity *
							(item.involvement / 100) *
							40
						).toFixed(2)
					),
					usdCost: Number(
						(
							projectDuration *
							5 *
							8 *
							item.peopleQuantity *
							(item.involvement / 100) *
							item.usdRate
						).toFixed(2)
					),
					usdPrimeCost: Number(item.peopleHours * item.rate),
					usdProfit: Number(item.usdCost - item.usdPrimeCost),
				};
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		tableData,
		projectDuration,
		discountPercentage,
		riskPercentage,
		additionalExpenses,
	]);

	const handlePartnerChange = newPartner => {
		setSelectedPartner(newPartner);
	};

	const handlePracticeChange = newPractice => {
		setSelectedPractice(newPractice);
	};

	const handleDateChange = newDate => {
		setSelectedDate(newDate);
		console.log('Дата:', moment(newDate._d).format('DD.MM.YYYY'));
	};

	const handleCurrencyChange = newCurrency => {
		setSelectedCurrency(newCurrency);
	};

	const handleDiscountChange = newDiscount => {
		if (newDiscount >= 0) setDiscountPercentage(Number(newDiscount));
		else return;
	};

	const handleRiskChange = newRisk => {
		if (newRisk >= 0) setRiskPercentage(Number(newRisk));
		else return;
	};

	const handleDurationChange = newDuration => {
		if (newDuration >= 0) setProjectDuration(Number(newDuration));
		else return;
	};

	const handleExpensesChange = newExpenses => {
		if (newExpenses >= 0) setAdditionalExpenses(Number(newExpenses));
		else return;
	};

	const handleRateChange = newRate => {
		if (newRate >= 0) setExchangeRate(Number(newRate));
		else return;
	};

	const handleTableDataChange = newData => {
		setTableData(prevData =>
			prevData.map(item =>
				item.id === newData.id
					? {
							...item,
							...newData,
							peopleHours: Number(
								(
									projectDuration *
									newData.peopleQuantity *
									(newData.involvement / 100) *
									40
								).toFixed(2)
							),
							usdCost: Number(
								(
									projectDuration *
									5 *
									8 *
									newData.peopleQuantity *
									(newData.involvement / 100) *
									newData.usdRate
								).toFixed(2)
							),
							usdPrimeCost: Number(newData.peopleHours * newData.rate),
							usdProfit: Number(item.usdCost - item.usdPrimeCost),
					  }
					: item
			)
		);

		setTotalCostUSD(
			tableTotalCostUSD +
				tableTotalCostUSD * (riskPercentage / 100) -
				tableTotalCostUSD * (discountPercentage / 100) +
				additionalExpenses
		);

		setTotalCostUAH(totalCostUSD * exchangeRate);
	};

	return (
		<>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<Container
					maxWidth='xl'
					className='container'
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						background: '#fff',
						minHeight: '100vh',
					}}
				>
					<Box
						component='form'
						sx={{
							'& .MuiTextField-root': {m: 1},
							display: 'flex',
							flexDirection: 'column',
							backgroundColor: '#fff',
							padding: '24px 12px',
							borderRadius: '8px',
						}}
						noValidate
						autoComplete='off'
					>
						{/* Project name */}
						<TextField
							required
							id='projectName'
							label='Назва проєкту'
							variant='outlined'
							sx={{
								width: '516px',
							}}
							value={projectName}
							onChange={e => setProjectName(e.target.value.trim())}
						/>
						<Box sx={{display: 'flex'}}>
							{/* Practice select */}
							<PracticeSelect
								practice={selectedPractice}
								onPracticeChange={handlePracticeChange}
							/>
							{/* Partner select */}
							<PartnerSelect
								onPartnerChange={handlePartnerChange}
								partner={selectedPartner}
							/>
						</Box>
						<Box sx={{display: 'flex', borderTop: '1px solid #e9561d'}}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'flex-start',
								}}
							>
								{/* Date picker */}
								<MUIDatePicker
									date={selectedDate}
									onDateChange={handleDateChange}
								/>
								{/* Currency select */}
								<CurrencySelect
									currency={selectedCurrency}
									onCurrencyChange={handleCurrencyChange}
								/>
								{/* Project duration */}
								<TextField
									required
									sx={{width: '250px'}}
									id='outlined-number'
									label='Тривалість проєкту, тижд.'
									type='number'
									slotProps={{
										inputLabel: {
											shrink: true,
										},
									}}
									value={projectDuration}
									onChange={e => handleDurationChange(e.target.value)}
								/>
								<TextField
									required
									sx={{width: '250px'}}
									id='outlined-number'
									label='Курс на дату розрахунку'
									type='number'
									slotProps={{
										inputLabel: {
											shrink: true,
										},
									}}
									value={exchangeRate}
									onChange={e => handleRateChange(e.target.value)}
								/>
								<Box sx={{display: 'flex'}}>
									{/* Discount percentage */}
									<FormControl sx={{m: 1, width: '117px'}} variant='outlined'>
										<InputLabel htmlFor='discountPercentage'>Знижка</InputLabel>
										<OutlinedInput
											type='number'
											label='Знижка'
											id='discountPercentage'
											endAdornment={
												<InputAdornment position='end'>%</InputAdornment>
											}
											aria-describedby='outlined-discount-helper-text'
											inputProps={{
												'aria-label': 'weight',
											}}
											value={discountPercentage}
											onChange={e => handleDiscountChange(e.target.value)}
										/>
									</FormControl>
									{/* Risk percentage */}
									<FormControl sx={{m: 1, width: '117px'}} variant='outlined'>
										<InputLabel htmlFor='riskPercentage'>Ризики</InputLabel>
										<OutlinedInput
											type='number'
											label='Ризики'
											id='riskPercentage'
											endAdornment={
												<InputAdornment position='end'>%</InputAdornment>
											}
											aria-describedby='outlined-risk-helper-text'
											inputProps={{
												'aria-label': 'weight',
											}}
											value={riskPercentage}
											onChange={e => handleRiskChange(e.target.value)}
										/>
									</FormControl>
								</Box>
								{/* Additional expenses */}
								<TextField
									sx={{width: '250px'}}
									id='outlined-number'
									label='Додаткові витрати, USD'
									type='number'
									slotProps={{
										inputLabel: {
											shrink: true,
										},
									}}
									value={additionalExpenses}
									onChange={e => handleExpensesChange(e.target.value)}
								/>
								{/* Exchange rate */}
							</Box>
							<Box
								sx={{
									'& .value': {
										color: 'primary.main',
										fontSize: '32px',
										fontWeight: '700',
									},
									'& .caption': {
										fontWeight: '500',
									},
									padding: '24px 48px 24px 96px',
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
									textAlign: 'center',
									gap: '40px',
								}}
							>
								<Box>
									<Typography className='value'>
										{Number(totalCostUSD).toLocaleString()}
									</Typography>
									<Typography className='caption'>
										Загальна вартість, USD
									</Typography>
								</Box>
								<Box>
									<Typography className='value'>
										{Number(totalCostUAH).toLocaleString()}
									</Typography>
									<Typography className='caption'>
										Загальна вартість, UAH
									</Typography>
								</Box>
								<Box>
									<Typography className='value'>
										{totalProfit.toFixed(2)}%
									</Typography>
									<Typography className='caption'>Прибуток, %</Typography>
								</Box>
							</Box>
						</Box>
					</Box>
					{/* Data Table */}
					<DataTable
						columns={columns}
						rows={tableData}
						onDataChange={handleTableDataChange}
						totalPeopleHours={tableTotalPeopleHours}
						totalCostUSD={tableTotalCostUSD}
						totalPrimeCostUSD={tableTotalPrimeCostUSD}
						totalProfitUSD={tableTotalProfitUSD}
					/>
				</Container>
			</ThemeProvider>
		</>
	);
}

export default App;
