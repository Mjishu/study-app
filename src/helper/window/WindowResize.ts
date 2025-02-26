import { Settings } from '../Settings';

export class WindowResizeHandler {
    private static instance: WindowResizeHandler;
    settings: Settings;
    width: number;
    height: number;

    private constructor() {
        this.settings = Settings.getInstance();
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.onResize = this.onResize.bind(this);
        window.addEventListener('resize', this.onResize);
    }

    static getInstance(): WindowResizeHandler {
        if (!WindowResizeHandler.instance) {
            WindowResizeHandler.instance = new WindowResizeHandler();
        }
        return WindowResizeHandler.instance;
    }

    private onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.updateAspectRatio();
    }

    private updateAspectRatio() {
        // find common aspect ratios and update based on that
    }

    stopListening() {
        window.removeEventListener('resize', this.onResize);
    }
}
