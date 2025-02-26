export class Settings {
    private static instance: Settings;
    aspectRatio: string;

    constructor() {
        this.aspectRatio = '1920x1080';
    }

    static getInstance(): Settings {
        if (!Settings.instance) {
            Settings.instance = new Settings();
        }
        return Settings.instance;
    }

    getAspect(): string {
        return this.aspectRatio;
    }

    setAspect(ratio: string) {
        this.aspectRatio = ratio;
    }
}
