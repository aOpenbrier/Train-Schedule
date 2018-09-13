# Train-Schedule

## Description
This website will provide up-to-date information about various trains, including their arrival times, trip frequency, and minutes remaining until arrival at the station. User can input additional trains and app will generate future arrival information.

## Design
- Header with title
- Table with data for each train
- Form to add new train data
##### Example:
![Page Design Example](assets/images/Design_Example.png)

## Project
This is a class assignment at UCI Coding Bootcamp which incorporates Firebase to host train data.

### Requirements:
- Calculate next train arrival, relative to current time.
- User submission for train data:
  - Name
  - Destination
  - First arrival time (in 24-hour format)
  - Frequency
  - Format times with Moment.js
- Store train data on Firebase

#### Bonus Challenges:
- [ ] Update "minutes to arrival" and "next train time" every minute.
- [ ] Add "Update" and "Remove" buttons for each train. Update allows user to edit Name, Destination and Arrival Time.
- [ ] Require sign-in with Google or GitHub accounts only.