import React, { Component, useState, useEffect } from "react";
// import TouchableGraph from "react-native-touchable-graph";
import { Bar } from "react-chartjs-2";

import { Dimensions, View } from "react-native";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const Charts = () => {
  // const [getData, setData] = useState("");
  // useEffect(async () => {
  //   const response = await fetch(`http://localhost:3000/queues`);
  //   const json = await response.json();
  //   setData(json);
  // }, []);

  return (
    <View>
      <LineChart
        data={{
          labels: ["January", "Feburary", "March", "April", "May", "June"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={chartConfig}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};
export default Charts;
// const BarGraph = () => {
//   return (
//     <View>
//       <BarChart
//         data={{
//           labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//           datasets: [
//             {
//               label: "# of Votes",
//               data: [12, 19, 3, 5, 2, 3],
//               backgroundColor: [
//                 "rgba(255, 99, 132, 0.2)",
//                 "rgba(54, 162, 235, 0.2)",
//                 "rgba(255, 206, 86, 0.2)",
//                 "rgba(75, 192, 192, 0.2)",
//                 "rgba(153, 102, 255, 0.2)",
//                 "rgba(255, 159, 64, 0.2)",
//               ],
//               borderColor: [
//                 "rgba(255, 99, 132, 1)",
//                 "rgba(54, 162, 235, 1)",
//                 "rgba(255, 206, 86, 1)",
//                 "rgba(75, 192, 192, 1)",
//                 "rgba(153, 102, 255, 1)",
//                 "rgba(255, 159, 64, 1)",
//               ],
//               borderWidth: 1,
//             },
//             {
//               label: "Quantity",
//               data: [47, 104, 67, 58, 9, 50],
//               backgroundColor: "blue",
//               hoverBorderColor: "green",
//             },
//           ],
//         }}
//         width={400}
//         height={400}
//         options={{
//           maintainAspectRatio: false,
//           scales: {
//             yAxes: [
//               {
//                 ticks: {
//                   beginAtZero: true,
//                 },
//               },
//             ],
//           },
//         }}
//       />
//     </View>
//   );
// };
// export default BarGraph;
const chartConfig = {
  backgroundGradientFrom: "#EAF1F2",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};
