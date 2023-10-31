import React from 'react'
import * as XLSX from 'xlsx';
//import { FaFileExcel } from 'react-icons/fa';
import FileSaver from 'file-saver';

const ExportCSV = ({ excelData, fileName, selected_members, setExcelData, event, year }) => {

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = () => {
        if(selected_members.length < 2){
            alert('No member has been selected!')
        }
        else if(event === '' || year === ''){
            alert('Event and Year must be selected!')
        }
        else{
            const ws = XLSX.utils.json_to_sheet(excelData);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], {type: fileType});
            FileSaver.saveAs(data, fileName + fileExtension);

            setExcelData([]);
        }        
    }

    return (
        <button 
            className='max-w-fit px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white'
            onClick={(e) => exportToCSV()}
        >
            Generate Excel
        </button>
    )
}

export default ExportCSV