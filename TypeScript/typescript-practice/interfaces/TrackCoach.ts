import { Coach } from "./Coach";

export class TrackCoach implements Coach {
    getDailyWorkout(): string {
        return "Run 5 sets of 1000m";
    }
}