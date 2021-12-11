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
//setup
const chartData = {
    datasets: [{
        data: data.filter(obj => obj.type == "lead")
    }]
}

//configure chart
const config = {
    type: 'bar',
    data: chartData,
    parsing: {
        xAxisKey: 'difficulty',
        yAxisKey: 'send_type'
    }
}

//render chart
const outdoorChart = new Chart(
    document.getElementById('outdoorChart'),
    config
);