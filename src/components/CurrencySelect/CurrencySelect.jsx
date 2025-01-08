import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
	{
		value: 'UAH',
		label: 'UAH',
	},
	{
		value: 'USD',
		label: 'USD',
	},
];

export default function CurrencySelect({currency, onCurrencyChange}) {
	return (
		<TextField
			required
			id='currencySelect'
			select
			label='Валюта розрахунку'
			onChange={e => onCurrencyChange(e.target.value)}
			value={currency}
			sx={{width: '250px'}}
		>
			{currencies.map(option => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
}

CurrencySelect.propTypes = {
	currency: PropTypes.string.isRequired, // currency должен быть строкой и обязателен
	onCurrencyChange: PropTypes.func.isRequired, // onCurrencyChange должен быть функцией и обязателен
};
