import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';

const practices = [
	{
		value: 'Оборонні закупівлі',
		label: 'Оборонні закупівлі',
	},
	{
		value: 'Вирішення спорів',
		label: 'Вирішення спорів',
	},
	{
		value: 'WCC',
		label: 'WCC',
	},
	{
		value: 'Антимонопольне',
		label: 'Антимонопольне',
	},
];

export default function PracticeSelect({practice, onPracticeChange}) {
	return (
		<TextField
			required
			id='practiceSelect'
			select
			label='Практика'
			onChange={e => onPracticeChange(e.target.value)}
			value={practice}
			sx={{width: '250px'}}
		>
			{practices.map(option => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</TextField>
	);
}

PracticeSelect.propTypes = {
	practice: PropTypes.string.isRequired, // practice должен быть строкой и обязателен
	onPracticeChange: PropTypes.func.isRequired, // onPracticeChange должен быть функцией и обязателен
};
