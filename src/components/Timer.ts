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
    }

    Start() {
        this._formatTime();
        this.Itimer = setInterval(() => {
            if (this.duration <= 0 && this.isCountdown) {
                alert('TIMER OVER');
                this.Stop();
                return;
            }
            this.duration = this.isCountdown ? this.duration - 1 : this.duration + 1;
            this._formatTime();
        }, 1000);
    }

    _formatTime() {
        const minute = Math.floor(this.duration / 60);
        const seconds = this.duration - minute * 60;
        if (this.duration > 6000) {
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
        this.timer.innerText = '00:00';
        this.duration = this.startDuration;
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
    }
}
