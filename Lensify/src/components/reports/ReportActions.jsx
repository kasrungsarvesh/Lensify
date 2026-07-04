import {
FaFilePdf,
FaFileExcel,
FaPrint
} from "react-icons/fa";


import "./ReportActions.css";

function ReportActions(){

return(

<div className="report-actions">

<button className="pdf-btn">

<FaFilePdf/>

Export PDF

</button>

<button className="excel-btn">

<FaFileExcel/>

Export Excel

</button>

<button className="print-btn">

<FaPrint/>

Print Report

</button>

</div>

);

}

export default ReportActions;