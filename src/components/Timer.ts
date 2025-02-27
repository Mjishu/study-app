import { Drag } from '../helper/Drag';
import '../styles/timer.css';

export class Timer {
    startDuration: number;
    isCountdown: boolean;
    duration: number;
    timer: HTMLParagraphElement;
    Itimer: number | null = null;
    timerParent: HTMLDivElement;
    timerStop: HTMLButtonElement;
    timerStart: HTMLButtonElement;
    timerPause: HTMLButtonElement;
    dragItem: Drag;

    constructor(isCountdown: boolean, duration: number) {
        this.startDuration = duration;
        this.timerParent = document.querySelector('#timer-parent') as HTMLDivElement;
        this.timerStop = document.querySelector('#stop-timer') as HTMLButtonElement;
        this.timerStart = document.querySelector('#start-timer') as HTMLButtonElement;
        this.timerPause = document.querySelector('#pause-timer') as HTMLButtonElement;
        this.timer = document.querySelector('#timer') as HTMLParagraphElement;
        this.isCountdown = isCountdown;
        this.duration = duration; // in ms
        this.Itimer = null;
        this.dragItem = new Drag(this.timerParent);
        this.changeTime = this.changeTime.bind(this);
    }

    Start() {
        this.formatTime();
        this.Itimer = setInterval(() => {
            if (this.duration <= 0 && this.isCountdown) {
                this.Stop();
                this.alertSound('/sounds/lofi-alarm.mp3');
                return;
            }
            this.duration = this.isCountdown ? this.duration - 1 : this.duration + 1;
            this.formatTime();
        }, 1000);
    }

    formatTime() {
        const minute = Math.floor(this.duration / 60);
        const seconds = this.duration - minute * 60;
        if (this.duration > 60) {
            this.timer.innerText = `${minute}:${this.duration - minute * 60}`; // minute * 60 - this.duration?
            if (seconds < 10) {
                this.timer.innerText = `${minute}:0${this.duration - minute * 60}`;
            }
        } else {
            this.timer.innerText = `00:${this.duration}`;
            if (seconds < 10) {
                this.timer.innerText = `${minute}:0${this.duration - minute * 60}`;
            }
        }
    }

    Pause() {
        if (this.Itimer) {
            clearInterval(this.Itimer);
            this.Itimer = null;
        }
    }

    Unpause() {
        if (!this.Itimer) {
            this.Start();
        }
    }

    Stop() {
        if (this.Itimer) {
            clearInterval(this.Itimer);
            this.Itimer = null;
        }
        this.duration = this.startDuration;
        this.formatTime();
    }

    alertSound(src: string) {
        const sound = new Audio(src);
        sound.play();
    }

    increaseTime() {
        const div = document.createElement('div');
        div.className = 'change-time-parent';
        const minuteButton = document.createElement('button');
        minuteButton.innerText = '^';
        const secondButton = document.createElement('button');
        secondButton.innerText = '^';
        div.append(minuteButton, secondButton);

        minuteButton.onclick = () => this.changeTime(true, true);
        secondButton.onclick = () => this.changeTime(false, true);
        this.timerParent.append(div);
    }

    decreaseTime() {
        const div = document.createElement('div');
        div.className = 'change-time-parent';
        const minuteButton = document.createElement('button');
        minuteButton.innerText = '⌄';
        const secondButton = document.createElement('button');
        secondButton.innerText = '⌄';
        div.append(minuteButton, secondButton);

        minuteButton.onclick = () => this.changeTime(true, false);
        secondButton.onclick = () => this.changeTime(false, false);
        this.timerParent.append(div);
    }

    changeTime(isMinute: boolean, isIncrease: boolean) {
        if (isMinute) {
            if (isIncrease) {
                this.duration += 60;
            } else if (!isIncrease && this.duration > 0) {
                this.duration -= 60;
            }
        } else {
            if (isIncrease) {
                this.duration += 1;
            } else if (!isIncrease && this.duration > 0) {
                this.duration -= 1;
            }
        }
        this.formatTime();
    }

    InputChecker() {
        this.timerStart.addEventListener('click', () => {
            this.timerPause.disabled = false;
            this.timerStop.disabled = false;
            this.timerStart.disabled = true;
            this.Start();
        });

        this.timerStop.addEventListener('click', () => {
            this.timerStop.disabled = true;
            this.timerPause.disabled = false;
            this.timerStart.disabled = false;
            this.Stop();
        });

        this.timerPause.addEventListener('click', () => {
            this.timerPause.disabled = true;
            this.timerStop.disabled = false;
            this.timerStart.disabled = false;
            this.Pause();
        });

        this.dragItem.Start();
    }
}
