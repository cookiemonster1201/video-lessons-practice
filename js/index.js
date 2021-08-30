//юзать без бандлера

const GLOBAL_MEAN_TEMPERATURE = 14;

function fetchData() {
  return fetch("../ZonAnn.Ts+dSST.csv").then((response) => response.text());
}

function parseData(data) {
  return Papa.parse(data, { header: true }).data;
}

function getMetaData(dataArr) {
  return dataArr.reduce(
    (acc, entry) => {
      acc.years.push(entry.Year);
      acc.globeTemps.push(+entry.Glob + GLOBAL_MEAN_TEMPERATURE);
      acc.nHemTemps.push(+entry.NHem + GLOBAL_MEAN_TEMPERATURE);
      acc.sHemTemps.push(+entry.SHem + GLOBAL_MEAN_TEMPERATURE);
      return acc;
    },
    { years: [], globeTemps: [], nHemTemps: [], sHemTemps: [] }
  );
}

function drawChart(labels, global, north, south) {
  const context = document.getElementById("js-chart").getContext("2d");

  const temperatureChart = new Chart(context, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Globe",
          data: global,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "NHem",
          data: north,
          backgroundColor: "green",
          borderColor: "green",
          borderWidth: 1,
          fill: false,
        },
        {
          label: "SHem",
          data: south,
          backgroundColor: "blue",
          borderColor: "blue",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: function (value, index, values) {
              return value + "C";
            },
          },
        },
      },
    },
  });
}

fetchData()
  .then(parseData)
  .then(getMetaData)
  .then(({ years, globeTemps, nHemTemps, sHemTemps }) => {
    drawChart(years, globeTemps, nHemTemps, sHemTemps);
  });

// function fetchData() {
//   fetch("../ZonAnn.Ts+dSST.csv")
//     .then((response) => response.text())
//     .then((data) => {
//       const parseData = Papa.parse(data, { header: true }).data;

//       const metaData = parseData.reduce(
//         (acc, entry) => {
//           acc.years.push(entry.Year);
//           acc.globeTemps.push(+entry.Glob + GLOBAL_MEAN_TEMPERATURE);
//           acc.nHemTemps.push(+entry.NHem + GLOBAL_MEAN_TEMPERATURE);
//           acc.sHemTemps.push(+entry.SHem + GLOBAL_MEAN_TEMPERATURE);
//           return acc;
//         },
//         { years: [], globeTemps: [], nHemTemps: [], sHemTemps: [] }
//       );

//longer way-------------
//   const years = parseData.map((entry) => entry.Year);

//   const globeTemps = parseData.map(
//     (entry) => +entry.Glob + GLOBAL_MEAN_TEMPERATURE
//   );

//   const nHemTemps = parseData.map(
//     (entry) => +entry.NHem + GLOBAL_MEAN_TEMPERATURE
//   );

//   const sHemTemps = parseData.map(
//     (entry) => +entry.SHem + GLOBAL_MEAN_TEMPERATURE
//   );
//longer way-------------

//       const context = document.getElementById("js-chart").getContext("2d");

//       const myChart = new Chart(context, {
//         type: "line",
//         data: {
//           labels: metaData.years,
//           datasets: [
//             {
//               label: "Globe",
//               data: metaData.globeTemps,
//               backgroundColor: "rgba(255, 99, 132, 0.2)",
//               borderColor: "rgba(255, 99, 132, 1)",
//               borderWidth: 1,
//               fill: false,
//             },
//             {
//               label: "NHem",
//               data: metaData.nHemTemps,
//               backgroundColor: "green",
//               borderColor: "green",
//               borderWidth: 1,
//               fill: false,
//             },
//             {
//               label: "SHem",
//               data: metaData.sHemTemps,
//               backgroundColor: "blue",
//               borderColor: "blue",
//               borderWidth: 1,
//               fill: false,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               ticks: {
//                 // Include a dollar sign in the ticks
//                 callback: function (value, index, values) {
//                   return value + "C";
//                 },
//               },
//             },
//           },
//         },
//       });
//     });
// }
