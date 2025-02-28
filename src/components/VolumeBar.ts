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
        this.updateBarFromVolume();
        this.e.addEventListener('mousedown', (e: MouseEvent) => {
            this.drag = true;
            this.updateBar(e.clientX);
        });
        document.addEventListener('mousemove', (e: MouseEvent) => {
            if (this.drag) {
                this.updateBar(e.clientX);
            }
        });
        document.addEventListener('mouseup', () => {
            console.log('letting go');
            this.drag = false;
        });
    }

    updateBar(x: number) {
        const container = this.e;
        let percentage;

        // Only use this.volume for initialization, not during drag
        if (!this.drag && this.volume !== undefined) {
            percentage = this.volume * 100;
        } else {
            let position = x - container.getBoundingClientRect().left;
            percentage = (100 * position) / container.clientWidth;
        }

        // Clamp percentage between 0 and 100
        percentage = Math.max(0, Math.min(100, percentage));

        this.updateBarFromVolume();
        this.audio.volume = percentage / 100;
        this.volume = this.audio.volume; // Update stored volume
    }

    updateBarFromVolume() {
        if (this.volume) {
            const percentage = this.volume * 100;
            this.eInner.style.width = percentage + '%';
        }
    }
}
