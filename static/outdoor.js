//confirm receipt of data
console.log(data)

//make big numbers
document.addEventListener('DOMContentLoaded', function() {
    const high = data.reduce((acc, obj) => {return (acc.height > obj.height) ? acc : obj} )
    const boulder = data.filter(obj => obj.type == "boulder")
                        .reduce((acc, obj) => {return acc.difficulty > obj.difficulty ? acc : obj} )

    document.querySelector('#multipitch').innerHTML = high.height
    document.querySelector('#hardBoulder').innerHTML = boulder.grade
    document.querySelector('#multiSub').innerHTML = high.name 
    document.querySelector('#boulderSub').innerHTML = boulder.name
    document.querySelector('#pitches').innerHTML = `${high.pitches} pitches`
})

//generate chart
var arr = data.filter(obj => obj.type == "lead")

const result = Object.values(
    arr.reduce((r, o) => {
    r[o.send_type] = (r[o.send_type] && r[o.send_type].difficulty > o.difficulty) ? r[o.send_type] : o

    return r
}, {}))

//parsing input data
var labels = result.map(obj => obj.send_type)
var finalData = result.map(obj => obj.difficulty)

//Labeling function
callBack = function(label, index, labels) {
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
};

//setup
const chartData = {
    labels: labels,
    datasets: [{
        data: finalData,
        backgroundColor: 'steelblue'
    }]
}

//configure chart
const config = {
    type: 'bar',
    data: chartData,
    options: {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                ticks: {
                    callback: callBack
                }
            }
        }
    }
}

//render chart
const outdoorChart = new Chart(
    document.getElementById('outdoorChart'),
    config
);