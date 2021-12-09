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

//sort dates
sortDate = function(a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}

//filter by climbing type then return days with max difficulty climb
let maxSorted = maxData.sort(sortDate)

const boulder = groupMax(maxSorted.filter(row => row.type == "boulder"))
const lead = groupMax(maxSorted.filter(row => row.type == "lead"))
const toprope = groupMax(maxSorted.filter(row => row.type == "toprope"))

console.log(boulder)
console.log(lead)
console.log(toprope)

 //setup Chart 1
const data = {
    datasets: [{
        label: "example dataset",
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
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
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgb(255, 99, 132)',
        data: boulder,
        xAxisID: 'x'
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
                position: 'left',
                ticks: {
                    autoSkip: false,
                    stepSize: 1,
                    callback: function(label, index, labels) {
                        switch(label) {
                            case 0:
                                return '5.7   '
                            case 1:
                                return '5.8 | VB'
                            case 2:
                                return '5.9 | V0'
                            case 3:
                                return '5.10a   '
                            case 4:
                                return '5.10b   '
                            case 5:
                                return '5.10c | V1'
                            case 6:
                                return '5.10d   '
                            case 7: 
                                return '5.11a | V2'
                            case 8:
                                return '5.11b | V3'
                            case 9:
                                return '5.11c   '
                            case 10:
                                return '5.11d   '
                            case 11:
                                return '5.12a | V4'
                            case 12:
                                return '5.12b | V5'
                        }
                    }
                }
            },
        }
    }
};

//render Chart 2
const Chart2 = new Chart(
    document.getElementById('chart2'),
    config2
);

//Setup Chart3
const data3 = {
    datasets: [{
            label: 'Lead',
            borderColor: 'steelblue',
            backgroundColor: 'steelblue',
            data: lead
        }]
}

//render Chart 3
const Chart3 = new Chart(
    document.getElementById('chart3'),
    config2
);

//Setup Chart4
const data4 = {
    datasets: [{
        label: 'Toprope',
        borderColor: 'gold',
        backgroundColor: 'gold',
        data: toprope
    }]
}

//render Chart 4
const Chart4 = new Chart(
    document.getElementById('chart4'),
    config2
);