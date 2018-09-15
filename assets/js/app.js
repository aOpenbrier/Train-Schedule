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
//Update schedule function
function refreshSchedule() {

    trainRef.on('child_added', function (data) {
        console.log(data.val())
        //create row for each train object in array
        var row = document.createElement('tr')
        
        //calculate and format next rrival time
        
        //calculate minutes until arrival
        
        //Display train info in table
        row.innerHTML = `
            <td>${data.val().name}</td>
            <td>${data.val().destination}</td>
            <td>${data.val().frequency}</td>
            <td></td>
            <td></td>
        `
        document.getElementById('js-schedule').appendChild(row)
    })
}
refreshSchedule()
//Add button function
function addTrain() {
    //prevent page reload
    event.preventDefault
    //create object in database with input fields
    trainRef.push({
        name: document.getElementById('js-name').value,
        destination: document.getElementById('js-dest').value,
        first: document.getElementById('js-first').value,
        frequency: document.getElementById('js-freq').value,
    })
    //format input for first arrival and frequency time
    //update schedule
    refreshSchedule()
}
