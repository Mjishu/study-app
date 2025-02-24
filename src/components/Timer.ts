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
    newX: number;
    newY: number;
    startX: number;
    startY: number;

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
        this.newX = 0;
        this.newY = 0;
        this.startX = 0;
        this.startY = 0;
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
    }

    Start() {
        this._formatTime();
        this.Itimer = setInterval(() => {
            if (this.duration <= 0 && this.isCountdown) {
                this.Stop();
                this.alertSound('/sounds/lofi-alarm.mp3');
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

    alertSound(src: string) {
        const sound = new Audio(src);
        sound.play();
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

        this.timerParent.addEventListener('mousedown', this.mouseDown);
    }

    mouseDown(e: MouseEvent) {
        this.startX = e.clientX;
        this.startY = e.clientY;

        document.addEventListener('mousemove', this.mouseMove);
        document.addEventListener('mouseup', this.mouseUp);
    }

    mouseMove(e: MouseEvent) {
        this.newX = this.startX - e.clientX;
        this.newY = this.startY - e.clientY;

        this.startX = e.clientX;
        this.startY = e.clientY;

        this.timerParent.style.top = this.timerParent.offsetTop - this.newY + 'px';
        this.timerParent.style.left = this.timerParent.offsetLeft - this.newX + 'px';
    }

    mouseUp(e: MouseEvent) {
        document.removeEventListener('mousemove', this.mouseMove);
    }
}
