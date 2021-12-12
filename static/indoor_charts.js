 //confirm data was received from backend
 console.log(chartData)

 //confirm chart2 data is received
 console.log(maxData)

 //console.log(JSON.parse(chartData.replace(/&#34;/g,'"'))) - use in case json gets messed up

//filter by climbing type then return days with max difficulty climb
let maxSorted = maxData.sort(sortDate)
let chartDataSorted = chartData.sort(sortDate)


let boulder = groupMax(maxSorted.filter(row => row.type == "boulder"))
let lead = groupMax(maxSorted.filter(row => row.type == "lead"))
let toprope = groupMax(maxSorted.filter(row => row.type == "toprope"))

//Choose data based on button selection
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#weekBtn').onclick = function() {
        data.datasets[0].data = groupSum(chartData, 'week')
        data2.datasets[0].data = groupWeek(maxSorted.filter(row => row.type == "boulder"))
        data3.datasets[0].data = groupWeek(maxSorted.filter(row => row.type == "lead"))
        data4.datasets[0].data = groupWeek(maxSorted.filter(row => row.type == "toprope"))

        Chart1.update()
        Chart2.update()
        Chart3.update()
        Chart4.update()
    }

    document.querySelector('#monthBtn').onclick = function() {
        data.datasets[0].data = groupSum(chartData, 'month')
        data2.datasets[0].data = groupMonth(maxSorted.filter(row => row.type == "boulder"))
        data3.datasets[0].data = groupMonth(maxSorted.filter(row => row.type == "lead"))
        data4.datasets[0].data = groupMonth(maxSorted.filter(row => row.type == "toprope"))

        Chart1.update()
        Chart2.update()
        Chart3.update()
        Chart4.update()
    }

    document.querySelector('#dayBtn').onclick = function() {
        data.datasets[0].data = chartDataSorted
        data2.datasets[0].data = groupMax(maxSorted.filter(row => row.type == "boulder"))
        data3.datasets[0].data = groupMax(maxSorted.filter(row => row.type == "lead"))
        data4.datasets[0].data = groupMax(maxSorted.filter(row => row.type == "toprope"))

        Chart1.update()
        Chart2.update()
        Chart3.update()
        Chart4.update()
    }

})


//Generate Big Numbers
document.addEventListener('DOMContentLoaded', function() {
    const maxB = findMax(boulder)
    const maxL = findMax(lead)
    const maxT = findMax(toprope)
    const flash = findMax(maxData.filter(row => row.sendType == "onsight" || row.sendType == "flash"))

    document.querySelector('#topBoulder').innerHTML = maxB
    document.querySelector('#topLead').innerHTML = maxL
    document.querySelector('#topTopRope').innerHTML = maxT
    document.querySelector('#topFlash').innerHTML = flash
})


//Generate Charts
//create gradient
createGrad = function(id, color) {
    var ctx = document.getElementById(id).getContext('2d');
    var gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, '#FFFFFF');
    return gradient
}

const gradient = createGrad('chart1', '#2471E0')
const gradient2 = createGrad('chart2', '#FF8602')
const gradient3 = createGrad('chart3', '#FF140C')
const gradient4 = createGrad('chart4', '#3C005D')


 //setup Chart 1

const data = {
    datasets: [{
        label: "example dataset",
        backgroundColor: gradient,
        borderColor: '#2471E0',
        data: chartData,
        fill: true
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
        },
        plugins: {
        legend: {
            display: false
        }},
        scales: {
           x: {
               type: 'time',
               time: {
                   unit: 'day'
               }
           }
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
    labels: boulder.map(obj => obj.date),
    datasets: [{
        label: 'Boulder',
        borderColor: '#FF8602',
        backgroundColor: gradient2,
        fill: true,
        data: boulder,
        xAxisID: 'x'
    }]
};

//config Chart 2
const config2 = {
    type: 'line',
    data: data2,
    options: {plugins: {
        legend: {
            display: false
        }},
        parsing: {
            xAxisKey: 'date',
            yAxisKey: 'difficulty'
        },
        scales: {
            y: {
                position: 'left',
                ticks: {
                    autoSkip: false,
                    stepSize: 1,
                    callback: callBack
                    }
                },
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                }
            }
            },
        }
    };

//render Chart 2
const Chart2 = new Chart(
    document.getElementById('chart2'),
    config2
);

//Setup Chart3
const data3 = {
    labels: lead.map(o => o.date),
    datasets: [{
            label: 'Lead',
            borderColor: '#FF140C',
            backgroundColor: gradient3,
            fill: true,
            data: lead
        }]
}

//configure chart 3
const config3 = {
    type: 'line',
    data: data3,
    options: {plugins: {
        legend: {
            display: false,
        }},
        parsing: {
            xAxisKey: 'date',
            yAxisKey: 'difficulty'
        },
        scales: {
            y: {
                position: 'left',
                ticks: {
                    autoSkip: false,
                    stepSize: 1,
                    callback: callBack
                    }
                },
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }
            },
        }
    };

//render Chart 3
const Chart3 = new Chart(
    document.getElementById('chart3'),
    config3
);

//Setup Chart4
const data4 = {
    labels: toprope.map(obj => obj.date),
    datasets: [{
        label: 'Toprope',
        borderColor: '#3C005D',
        backgroundColor: gradient4,
        fill: true,
        data: toprope
    }]
}

//config chart 4
const config4 = {
    type: 'line',
    data: data4,
    options: {
        plugins: {
        legend: {
            display: false
        }},
        parsing: {
            xAxisKey: 'date',
            yAxisKey: 'difficulty'
        },
        scales: {
            y: {
                position: 'left',
                ticks: {
                    autoSkip: false,
                    stepSize: 1,
                    callback: callBack
                    }
                },
                x: {
                    type: 'time',
                    time: {
                        unit: 'day'
                    }
                }
            },
        }
    };

//render Chart 4
const Chart4 = new Chart(
    document.getElementById('chart4'),
    config4
);