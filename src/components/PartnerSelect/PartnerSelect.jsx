import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const partners = [
	{
		value: 'Василишин Сергій',
		label: 'Василишин Сергій',
	},
	{
		value: 'Гончар Ольга',
		label: 'Гончар Ольга',
	},
	{
		value: 'Тарасюк Олег',
		label: 'Тарасюк Олег',
	},
	{
		value: 'Лукінчук Роксолана',
		label: 'Лукінчук Роксолана',
	},
	{
		value: "Котова Дар'я",
		label: "Котова Дар'я",
	},
];

export default function PartnerSelect({partner, onPartnerChange}) {
	return (
		<TextField
			required
			id='partnerSelect'
			select
			label='Партнер'
			onChange={e => onPartnerChange(e.target.value)}
			value={partner}
			sx={{width: '250px'}}
		>
			{partners.map(option => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
}

PartnerSelect.propTypes = {
	partner: PropTypes.string.isRequired, // partner должен быть строкой и обязателен
	onPartnerChange: PropTypes.func.isRequired, // onPartnerChange должен быть функцией и обязателен
};
