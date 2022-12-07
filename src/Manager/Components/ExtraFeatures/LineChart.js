import React from "react";
import Chart from "chart.js/auto";

import { Line } from "react-chartjs-2";
import moment from 'moment'

const LineChart = ({ chartData }) => {

	const labels = chartData.map(x => moment(x.date).format("MMM Do"));
  const y = chartData.map(x => x.cnt);

  console.log(labels);
  console.log(y);

	const data = {
	  labels: labels,
	  datasets: [
		{
		  label: "Amount Sold",
		  backgroundColor: "rgb(255, 99, 132)",
		  borderColor: "rgb(255, 99, 132)",
		  data: y,
		},
	  ],
	};
  return (
    <div>
      <Line
		data={data}
		height="500px"
		width="1000px"
		options= {{
			maintainAspectRatio: false,
			scales: {
				// x: {
				// 	type: 'time',
				// 	time: {
				// 		unit: 'day'
				// 	}
				// },
        // adapters: {
        //   date: {
        //       locale: de
        //   }
        // }
			}
		}}
	  />
    </div>
  );
};

export default LineChart;
