import {
ResponsiveContainer,
BarChart,
Bar,
CartesianGrid,
XAxis,
YAxis,
Tooltip
}
from "recharts";

import "./SalesChart.css";

const data=[

{month:"Jan",sales:12},

{month:"Feb",sales:18},

{month:"Mar",sales:15},

{month:"Apr",sales:25},

{month:"May",sales:20},

{month:"Jun",sales:28},

];

function SalesChart(){

return(

<div className="chart-card">

<h3>

Monthly Sales

</h3>

<ResponsiveContainer
width="100%"
height={320}
>

<BarChart data={data}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="sales"
fill="#16a34a"
/>

</BarChart>

</ResponsiveContainer>

</div>

);

}

export default SalesChart;