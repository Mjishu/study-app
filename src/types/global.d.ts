global {
    interface NotesContent {
        id: number;
        content: string;
        color: string;
        x: number;
        y: number;
    }

    interface Audio {
        audio_src: string;
        icon: string;
    }

    interface AudioLocations {
        title: string;
        position: PositionEntry[];
        audio_src: string;
    }

    type PositionEntry = {
        [resolution: string]: [Coords];
    };

    type Coords = {
        x: number;
        y: number;
    };
}

export {};
