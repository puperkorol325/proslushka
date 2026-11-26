import { TrackItem } from "@/types/TrackItem";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type currentSongState = TrackItem | null;

const initialState: currentSongState = null;

const currentSongReducer = createSlice({
    name: "currentSong",
    initialState,
    reducers: {
        setCurrentSong(state: currentSongState, action: PayloadAction<TrackItem | null>) {
            state = action.payload;
        }
    }
});

export default currentSongReducer;
export const { setCurrentSong } = currentSongReducer.actions;