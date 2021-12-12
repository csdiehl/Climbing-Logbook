//change select based on type of climb
function changeSelect() {
    const select =  document.getElementById('type-select');
    select.onchange = function() {
        let type = select.value;
        document.getElementById('grade-select').innerHTML = '';

        const grades = ["5.7", "5.8", "5.9", "5.10a", "5.10b", "5.10c", "5.10d", "5.11a", "5.11b", "5.11c", "5.11d", 
        "5.12a", "5.12b", "5.12c", "5.12d", "5.13a", "5.13b"]

        const boulders = ["VB", "V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8"]

        if (type === "boulder") {
            for(let i = 0; i < boulders.length; i++) {
                option = document.createElement('option')
                option.value = boulders[i]
                option.innerHTML = boulders[i]
                document.getElementById('grade-select').appendChild(option)
            }
        } else {
            for(let i = 0; i < grades.length; i++) {
                option = document.createElement('option')
                option.value = grades[i]
                option.innerHTML = grades[i]
                document.getElementById('grade-select').appendChild(option)
            }
        }
    }
}

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

//function for finding all time max (without grouping dates)
findMax = function(arr) {
    let obj = arr.reduce(function(prev, current) {
        return (prev.difficulty > current.difficulty) ? prev : current;
    })
    return obj.grade
    }

//function to find max by date
groupMax = function(arr) {
    const result = Object.values(
        arr.reduce((r, o) => {
        r[o.date] = (r[o.date] && r[o.date].difficulty > o.difficulty) ? r[o.date] : o
    
        return r
    }, {}))

    return result
}

//max by week
groupWeek = function(arr) {
    const result = Object.values(
        arr.reduce((r, o) => {
            let week = moment(o.date, "YYYY-MM-DD").week()

        r[week] = (r[week] && r[week].difficulty > o.difficulty) ? r[week] : o
    
        return r
    }, {}))

    return result
}


//max by month
groupMonth = function(arr) {
    const result = Object.values(
        arr.reduce((r, o) => {
            let month = new Date(o.date).getMonth()

        r[month] = (r[month] && r[month].difficulty > o.difficulty) ? r[month] : o
    
        return r
    }, {}))
    return result
}

//Sum by Week or Month
function groupSum(arr, mode) {
    var result = []

    arr.reduce(function(res, value) {
        var week;

        if (mode == "week") {
            week = moment(value.date, 'YYYY-MM-DD').week()
        } else if (mode == "month") {
            week = new Date(value.date).getMonth()
        }

        if(!res[week]) {
            res[week] = {date: value.date, routes: 0}
            result.push(res[week])
        }
        res[week].routes += value.routes
        return res
    }, {});

    return result
}

//sort dates
sortDate = function(a, b) {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
}