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
} from '@mui/material';
import {useState} from 'react';
import PartnerSelect from './components/PartnerSelect/PartnerSelect';
import PracticeSelect from './components/PracticeSelect/PracticeSelect';
import MUIDatePicker from './components/DatePicker/DatePicker';
import CurrencySelect from './components/CurrencySelect/CurrencySelect';
import moment from 'moment';

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

	return (
		<>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<Container
					maxWidth='xl'
					className='container'
					sx={{
						display: 'flex',
						justifyContent: 'center',
						background: '#fff',
						height: '100vh',
					}}
				>
					<Box
						padding='24px 12px'
						borderRadius='8px'
						component='form'
						sx={{
							'& .MuiTextField-root': {m: 1},
							display: 'flex',
							flexDirection: 'column',
							backgroundColor: '#fff',
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
								alignSelf: 'center',
								width: '500px',
							}}
							value={projectName}
							onChange={e => setProjectName(e.target.value.trim())}
						/>
						<Box sx={{display: 'flex', justifyContent: 'center'}}>
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
						<Box borderTop={'1px solid #e9561d'}>
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
								<TextField
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
							</Box>
						</Box>
					</Box>
				</Container>
			</ThemeProvider>
		</>
	);
}

export default App;
