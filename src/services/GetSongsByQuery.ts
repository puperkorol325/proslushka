import { TrackItem } from "@/components/FindSongModal";

const SEARCH_COOLDOWN_TIME = 1500;
let debounceTimer: ReturnType<typeof setTimeout> | null = null;
let pendingResolvers: Array<{
    resolve: (v: DeezerResponse) => void;
    reject: (e: unknown) => void;
}> = [];

type DeezerResponse = any | null;

export default async function getSongsByQuery(query: string): Promise<TrackItem[] | null> {

    return new Promise((resolve, reject) => {
        clearTimeout(debounceTimer);

        pendingResolvers.forEach(({ resolve: r }) => r(null));
        pendingResolvers = [{ resolve, reject }];
        debounceTimer = setTimeout(async () => {
            debounceTimer = null;
            const batch = pendingResolvers;

            try {
                const response = await fetch(
                    `https://api.deezer.com/search?q=${encodeURIComponent(query)}&limit=5`
                );
                const data: TrackItem[] | null = mapDeezerResponseToTrackItem(await response.json());
                batch.forEach(({ resolve: r }) => r(data));
            } catch (e) {
                batch.forEach(({ reject: r }) => r(e));
            }
        }, SEARCH_COOLDOWN_TIME);
    })
};


function mapDeezerResponseToTrackItem(response: DeezerResponse): TrackItem[] | null {
    if (response.data) {
        return response.data.map((item: any) => {
            return {
                id: item.id || 0,
                title: item.title || "",
                artist: item.artist.name || "",
                coverURI: `https://e-cdns-images.dzcdn.net/images/cover/${item.md5_image}/1000x1000-000000-80-0-0.jpg`,
                previewUrl: item.preview
            } as TrackItem;
        });
    }else {
        return null;
    }
};