const trainRef = firebase.database().ref('trains')

    trainRef.on('child_added', function (data) {
        //create row for each train object in array
        var row = document.createElement('tr')
        
        // calculate and format next arrival time
        const timeNow = moment()
        const trainfreq = data.val().frequency
        // Set nextTrain to first arrival time then add frequency until passed the current time
        let nextTrain = moment(data.val().first, 'H:mm')
        while (nextTrain < timeNow) {
            nextTrain = moment(nextTrain).add(trainfreq, 'm')
        }
        //calculate minutes until arrival
        let howLong = moment(timeNow).to(nextTrain, true)
        //Display train info in table
        row.innerHTML = `
            <td>${data.val().name}</td>
            <td>${data.val().destination}</td>
            <td>${data.val().frequency}</td>
            <td>${moment(nextTrain).format('hh:mm a')}</td>
            <td>${howLong}</td>
            `
            document.getElementById('js-schedule').appendChild(row)
        })
        
        //Add button function
        function addTrain() {
            //prevent page reload
            event.preventDefault()
            document.getElementsByClassName('js-input-error').innerHTML = ''
    //Validate name input. must not be empty
    let isValid = true
    if (document.getElementById('js-name').value === '') {
        isValid = false
        //error message
        document.getElementById('js-name-error').innerHTML = 'Enter a name'
    }
    //Validate destination. must not be empty
    if (document.getElementById('js-dest').value === '') {
        isValid = false
        //error message
        document.getElementById('js-dest-error').innerHTML = 'Enter a destination.'
    }
    //Validate first arrival time. Must contain ':', hour '0'-'23', and minutes '0'-'59'
    let firstArrivalArr = document.getElementById('js-first').value.split(':')
    if (firstArrivalArr.length != 2) {
        isValid = false
        document.getElementById('js-first-error').innerHTML = 'Invalid time format. Use HH:mm'
    }
    firstArrivalArr[0] = parseInt(firstArrivalArr[0])
    firstArrivalArr[1] = parseInt(firstArrivalArr[1])
    if (isNaN(firstArrivalArr[0]) || isNaN(firstArrivalArr[1]) ) {
        isValid = false
        //error message
        document.getElementById('js-first-error').innerHTML = 'Invalid time format. Use HH:mm'
    }
    if (firstArrivalArr[0] < 0 || firstArrivalArr[0] > 23) {
        isValid = false
        //error message
        document.getElementById('js-first-error').innerHTML = 'Invalid hours. Use 00-23'
    }
    if (firstArrivalArr[1] < 0 || firstArrivalArr[1] > 59) {
        isValid = false
        //error message
        document.getElementById('js-first-error').innerHTML = 'Invalid minutes. Use 00-59'
    }
    //Validate frequency, must be number
    if (isNaN(parseInt(document.getElementById('js-freq').value))) {
        isValid = false
        //error message
        document.getElementById('js-freq-error').innerHTML = 'Enter minutes'
    }
    //Create object in database with input fields
    if (isValid) {
        trainRef.push({
            name: document.getElementById('js-name').value,
            destination: document.getElementById('js-dest').value,
            first: document.getElementById('js-first').value,
            frequency: parseInt(document.getElementById('js-freq').value),
        })
        //clear any error messages
        document.getElementsByClassName('js-input-error').innerHTML = ''
    }
}
