// Initialize Firebase
var config = {
    apiKey: "AIzaSyB5WKou--JYYWKtNtLu7j9XFObppDORccY",
    authDomain: "train-schedule-1bd5e.firebaseapp.com",
    databaseURL: "https://train-schedule-1bd5e.firebaseio.com",
    projectId: "train-schedule-1bd5e",
    storageBucket: "train-schedule-1bd5e.appspot.com",
    messagingSenderId: "273052543989"
};
firebase.initializeApp(config);
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
    //Validate name input. must not be empty
    let isValid = true
    if (document.getElementById('js-name').value === '') {
        isValid = false
        //error message
        console.error('name invalid')
    }
    //Validate destination. must not be empty
    if (document.getElementById('js-dest').value === '') {
        isValid = false
        //error message
        console.error('destination invalid')
    }
    //Validate first arrival time. Must contain ':', hour '0'-'23', and minutes '0'-'59'
    const firstArrivalArr = document.getElementById('js-first').value.split(':')
    console.log(firstArrivalArr)
    if (firstArrivalArr.length != 2) {
        isValid = false
        console.error('first arrival in wrong format')
    }
    if (parseInt(firstArrivalArr[0]) < 0 || parseInt(firstArrivalArr[0]) > 23) {
        isValid = false
        //error message
        console.error('first arrival invalid. hour should be in 24 hour format 0 - 23')
    }
    if (parseInt(firstArrivalArr[1]) < 0 || parseInt(firstArrivalArr[1]) > 59) {
        isValid = false
        //error message
        console.error('first arrival invalid. minutes should be beween 00 - 59')
    }
    //Validate frequency, must be number
    if (parseInt(document.getElementById('js-freq').value) === NaN) {
        isValid = false
        //error message
        console.error('frequency invalid')
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
        console.clear()
    }
}
