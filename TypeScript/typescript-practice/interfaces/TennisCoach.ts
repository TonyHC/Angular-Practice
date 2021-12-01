import { Coach } from "./Coach";

export class TennisCoach implements Coach {
    getDailyWorkout(): string {
        return "Perform 500 backhand returns";
    }
}