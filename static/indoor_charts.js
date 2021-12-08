 //confirm data was received from backend
 console.log(chartData)
 //console.log(JSON.parse(chartData.replace(/&#34;/g,'"'))) - use in case json gets messed up
 
 //setup Chart 1
const data = {
    datasets: [{
        label: "example dataset",
        backgroundColor: 'rgb(255, 99, 132)',
        data: chartData
    }]
};

//config Chart 1
const config = {
    type: 'line',
    data: data,
    options: {
        parsing: {
            xAxisKey: 'date',
            yAxisKey: 'routes'
        }
    }
};

//render Chart 1
const Chart1 = new Chart(
    document.getElementById('chart1'),
    config
);





 //setup Chart 2
const data2 = {
    datasets: [{
        backgroundColor: 'rgb(255, 99, 132)',
        data: [{"date": "2021-12-02", "routes": 4}, {"date": "2021-12-05", "routes": 5}, {"date": "2021-12-07", "routes": 7}]
    }]
};

//config Chart 2
const config2 = {
    type: 'line',
    data: data2,
    options: {
        parsing: {
            xAxisKey: 'date',
            yAxisKey: 'routes'
        }
    }
};

//render Chart 2
const Chart2 = new Chart(
    document.getElementById('chart2'),
    config2
);