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
const db = firebase.database()
const trainRef = db.ref('trains')
console.log(firebase.database().ref())
trainRef.on('child_added', function (data) {
    console.log(data.val)
})
//Update schedule function
function refreshSchedule() {
    //create row for each train object in array
    //Display train info in columns
    //get name, destination, first arrival and frequency from firebase
    //format arrival time
    //calculate minutes until arrival
}

//Add button function
function addTrain() {
    //prevent page reload
    event.preventDefault
    //create object in database with input fields
    //format input for first arrival and frequency time
    //update schedule
    refreshSchedule()
}
