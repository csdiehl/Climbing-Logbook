 //setup Chart 1
 const labels = [
    'January',
    'February',
    'March',
    'April',
    'May'
]

const data = {
    labels: labels,
    datasets: [{
        label: "example dataset",
        backgroundColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20],
    }]
};

//config Chart 1
const config = {
    type: 'line',
    data: data,
    options: {}
};

//render Chart 1
const Chart1 = new Chart(
    document.getElementById('chart1'),
    config
);





 //setup Chart 2
 const labels2 = [
    'January',
    'February',
    'March',
    'April',
    'May'
]

const data2 = {
    labels: labels2,
    datasets: [{
        label: "example dataset",
        backgroundColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20],
    }]
};

//config Chart 2
const config2 = {
    type: 'line',
    data: data2,
    options: {}
};

//render Chart 2
const Chart2 = new Chart(
    document.getElementById('chart2'),
    config2
);