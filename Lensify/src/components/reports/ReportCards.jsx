import {
FaUsers,
FaReceipt,
FaRupeeSign,
FaBoxOpen
} from "react-icons/fa";


import "./ReportCards.css";

function ReportCards(){

const reports=[

{
title:"Revenue",
value:"₹1,25,000",
icon:<FaRupeeSign/>,
color:"green"
},

{
title:"Customers",
value:"320",
icon:<FaUsers/>,
color:"blue"
},

{
title:"Receipts",
value:"145",
icon:<FaReceipt/>,
color:"orange"
},

{
title:"Products",
value:"120",
icon:<FaBoxOpen/>,
color:"purple"
}

];

return(

<div className="report-cards-grid">

{

reports.map((item,index)=>(

<div
key={index}
className="report-card"
>

<div className={`report-icon ${item.color}`}>

{item.icon}

</div>

<div className="report-content">

<h4>{item.title}</h4>

<h2>{item.value}</h2>

<span>Updated Today</span>

</div>

</div>

))

}

</div>

);

}

export default ReportCards;