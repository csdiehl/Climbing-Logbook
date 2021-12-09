 //confirm data was received from backend
 console.log(chartData)

 //confirm chart2 data is received
 console.log(maxData)

 //console.log(JSON.parse(chartData.replace(/&#34;/g,'"'))) - use in case json gets messed up
//function to find max by date
groupMax = function(arr) {
    const result = Object.values(
        arr.reduce((r, o) => {
        r[o.date] = (r[o.date] && r[o.date].difficulty > o.difficulty) ? r[o.date] : o
    
        return r
    }, {}))

    return result
}

//filter by climbing type then return days with max difficulty climb
const boulder = groupMax(maxData.filter(row => row.type == "boulder"))
const lead = groupMax(maxData.filter(row => row.type == "lead"))
const toprope = groupMax(maxData.filter(row => row.type == "toprope"))

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



//Chart 2

 //setup Chart 2
const data2 = {
    datasets: [{
        label: 'Boulder',
        backgroundColor: 'rgb(255, 99, 132)',
        data: boulder
    },
    {
        label: 'Lead',
        backgroundColor: 'steelblue',
        data: lead
    },
    {
        label: 'Toprope',
        backgroundColor: 'gold',
        data: toprope
    }]
};

//config Chart 2
const config2 = {
    type: 'line',
    data: data2,
    options: {
        parsing: {
            xAxisKey: 'date',
            yAxisKey: 'difficulty'
        },
        scales: {
            y: {
                ticks: {
                    min: 0,
                    max: 12,
                    stepSize: 1,
                    callback: function(label, index, labels) {
                        switch(label) {
                            case 0:
                                return '5.7'
                            case 1:
                                return '5.8 | VB'
                            case 2:
                                return '5.9 | V0'
                            case 3:
                                return '5.10a'
                            case 4:
                                return '5.10b'
                            case 5:
                                return '5.10c'
                            case 6:
                                return '5.10d'
                            case 7: 
                                return '5.11a'
                            case 8:
                                return '5.11b'
                            case 9:
                                return '5.11c'
                            case 10:
                                return '5.11d'
                            case 11:
                                return '5.12a'
                            case 12:
                                return '5.12b'
                        }
                    }
                }
            }
        }
    }
};

//render Chart 2
const Chart2 = new Chart(
    document.getElementById('chart2'),
    config2
);