import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {Box} from '@mui/material';
import PropTypes from 'prop-types';

export default function MUIDatePicker({date, onDateChange}) {
	return (
		<Box sx={{width: '250px', m: 1, '& .date-picker': {m: 0}}}>
			<LocalizationProvider dateAdapter={AdapterMoment} adapterLocale='de'>
				<DatePicker
					value={date}
					onChange={e => onDateChange(e)}
					format='DD.MM.YYYY'
					className='date-picker'
				/>
			</LocalizationProvider>
		</Box>
	);
}

MUIDatePicker.propTypes = {
	date: PropTypes.object.isRequired, // practice должен быть строкой и обязателен
	onDateChange: PropTypes.func.isRequired, // onPracticeChange должен быть функцией и обязателен
};
