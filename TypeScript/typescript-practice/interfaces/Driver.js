"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TennisCoach_1 = require("./TennisCoach");
const TrackCoach_1 = require("./TrackCoach");
let myTennisCoach = new TennisCoach_1.TennisCoach();
let myTrackCoach = new TrackCoach_1.TrackCoach();
let myCoaches = [];
myCoaches.push(myTennisCoach);
myCoaches.push(myTrackCoach);
for (let coach of myCoaches) {
    console.log(coach.getDailyWorkout());
}
