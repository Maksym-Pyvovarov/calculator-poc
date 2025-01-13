// src/components/ExportButton/ExportButton.jsx
import { Button } from '@mui/material';
import ExcelJS from 'exceljs';
import moment from 'moment';

const ExportButton = ({
    projectName,
    selectedPractice,
    selectedPartner,
    selectedDate,
    selectedCurrency,
    discountPercentage,
    riskPercentage,
    projectDuration,
    additionalExpenses,
    exchangeRate,
    totalCostUSD,
    totalCostUAH,
    totalProfit, tableData,
}) => {
    // Function to handle downloading and modifying the template
    const handleExport = async () => {
        try {
            // Fetch the Excel template file from the public directory
            const response = await fetch('/template.xlsx');
            if (!response.ok) {
                throw new Error('Template file not found or server issue.');
            }

            const data = await response.arrayBuffer();
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(data);

            // Get the sheet by name "Калькулятор"
            const worksheet = workbook.getWorksheet('Калькулятор');

            // Insert values into the Excel sheet
            worksheet.getCell('C2').value = projectName;
            worksheet.getCell('B3').value = selectedPractice;
            worksheet.getCell('F3').value = selectedPartner;
            worksheet.getCell('B4').value = selectedDate.format('DD.MM.YYYY');  // Format as 'YYYY-MM-DD'
            worksheet.getCell('B5').value = selectedCurrency;
            worksheet.getCell('B6').value = discountPercentage/100;
            worksheet.getCell('B7').value = riskPercentage/100;
            worksheet.getCell('B8').value = projectDuration;
            worksheet.getCell('B9').value = additionalExpenses;
            worksheet.getCell('F5').value = exchangeRate;
            worksheet.getCell('F6').value = totalCostUSD;
            worksheet.getCell('F7').value = totalCostUAH;
            worksheet.getCell('F8').value = totalProfit/100;

            const tableStartRow = 12;

            tableData.forEach((row, rowIndex) => {
                const currentRow = tableStartRow + rowIndex;
                worksheet.getCell(`A${currentRow}`).value = row.grade;
                worksheet.getCell(`B${currentRow}`).value = row.peopleQuantity;
                worksheet.getCell(`C${currentRow}`).value = row.involvement/100;
                worksheet.getCell(`D${currentRow}`).value = row.peopleHours;
                worksheet.getCell(`E${currentRow}`).value = row.usdRate;
                worksheet.getCell(`F${currentRow}`).value = row.usdCost;
                worksheet.getCell(`G${currentRow}`).value = row.usdPrimeCost;
                worksheet.getCell(`H${currentRow}`).value = row.usdProfit;
            });

            // Save the modified workbook to a buffer
            const modifiedData = await workbook.xlsx.writeBuffer();

            // Create a Blob from the modified Excel file
            const blob = new Blob([modifiedData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            // Create a link to download the modified file
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'Вартість проєкту.xlsx';  // Set the filename for download
            link.click(); // Trigger the download
        } catch (error) {
            console.error('Error while processing the template:', error);
            alert('An error occurred while processing the template.');
        }
    };

    return (
        <Button onClick={handleExport} variant="contained" color="primary">
            Завантажити розрахунок
        </Button>
    );
};

export default ExportButton;
