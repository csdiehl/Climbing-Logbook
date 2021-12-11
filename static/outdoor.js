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