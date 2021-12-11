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
