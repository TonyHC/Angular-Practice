import { Coach } from "./Coach";
import { TennisCoach } from "./TennisCoach";
import { TrackCoach } from "./TrackCoach";

let myTennisCoach = new TennisCoach();
let myTrackCoach = new TrackCoach();

let myCoaches: Coach[] = [];

myCoaches.push(myTennisCoach);
myCoaches.push(myTrackCoach);

for (let coach of myCoaches) {
    console.log(coach.getDailyWorkout());
}