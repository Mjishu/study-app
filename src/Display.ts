import { Timer } from './components/Timer';

export class Display {
    Timer: Timer;
    constructor() {
        this.Timer = new Timer(true, 5);
    }

    Start() {
        this.Timer.InputChecker();
    }
}
