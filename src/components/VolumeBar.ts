export class volumeBar {
    e: HTMLDivElement;
    eInner: HTMLDivElement;
    audio: HTMLAudioElement;
    drag: boolean;
    volume: number | undefined;
    constructor(audio: { audio: HTMLAudioElement }, parent: HTMLElement, volume?: number) {
        this.e = document.createElement('div');
        this.eInner = document.createElement('div');
        this.audio = audio.audio;
        this.drag = false;
        this.volume = volume;

        this.audio.volume = this.volume ? this.volume : 0;
        this.e.className = 'volume-slider-con';
        this.eInner.className = 'volume-slider';
        this.e.appendChild(this.eInner);
        parent.appendChild(this.e);
    }

    Start() {
        this.e.addEventListener('mousedown', (e: MouseEvent) => {
            console.log('touched');
            this.drag = true;
            this.updateBar(e.clientX);
        });
        document.addEventListener('mousemove', (e: MouseEvent) => {
            if (this.drag) {
                console.log('dragging');
                this.updateBar(e.clientX);
            }
        });
        document.addEventListener('mouseup', (e: MouseEvent) => {
            console.log('letting go');
            this.drag = false;
        });
    }

    updateBar(x: number) {
        let volume = this.e;
        let percentage;

        if (this.volume) {
            percentage = this.volume * 100;
        } else {
            let position = x - volume.offsetLeft;
            percentage = (100 * position) / volume.clientWidth;
        }

        if (percentage > 100) {
            percentage = 100;
        }
        if (percentage < 0) {
            percentage = 0;
        }
        this.eInner.style.width = percentage + '%';
        this.audio.volume = percentage / 100;
        console.log(`new percentage is ${percentage}`);
    }
}
