import FileSaver from "file-saver";
import XLSX from 'sheetjs-style';

export const checkRole = (user, role, system_admin, system_auditor, admin, auditor, setNavlinks) => {

    if(user && user.groupid === 0 && role === 'admin'){
        setNavlinks(system_admin);
    }
    else if(user && user.groupid === 0 && role === 'auditor'){
        setNavlinks(system_auditor);
    }
    else if(user && user.groupid > 0 && role === 'admin'){
        setNavlinks(admin);
    }
    else if(user && user.groupid > 0 && role === 'auditor'){
        setNavlinks(auditor);
    }
}


export const formatPosition = (position) => {
    if(position === "1" || position.charAt(position.length - 1) === "1"){
        return 'st'
    }
    else if(position === "2" || position.charAt(position.length - 1) === "2"){
        return 'nd'
    }
    else if(position === "3" || position.charAt(position.length - 1) === "3"){
        return 'rd'
    }
    else{
        return 'th'
    }
}


export const formatDateWithFullMonthName = (dt) => {
    const date = new Date(dt);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
  
    return `${monthNames[month]} ${day}, ${year}`;
}


export const exportToExcel = async ( excleData, fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(excleData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);

}
