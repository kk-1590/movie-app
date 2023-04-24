import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';
import {APIKey} from '../../common/apis/movieApiKey'

export const fetchAsyncMovies = createAsyncThunk("movies/fetchAsyncMovies",
        async (term) => {
        const response = await movieApi
        .get(
          `?apikey=${APIKey}&s=${term}&type=movie`
        )
        // console.log(response);
        return response.data;
})


export const fetchAsyncShows = createAsyncThunk("movies/fetchAsyncShows",
        async (term) => {
        
        const response = await movieApi
        .get(
          `?apikey=${APIKey}&s=${term}&type=series`
        )
        // console.log(response);
        return response.data;
})


export const fetchAsyncMovieOrShowDetail = createAsyncThunk("movies/fetchAsyncMovieOrShowDetail",
        async (id) => {
        const response = await movieApi
        .get(
          `?apikey=${APIKey}&i=${id}&Plot=full`
        )
        // console.log(response);
        return response.data;
})


const initialState  = {
    movies: {},
    shows:{},
    selectedMovieorShow :{}
}

const movieSlice = createSlice({
    name:"movies",
    initialState: initialState,
    reducers: {
        addMovies: (state,action) => {
            state.movies = action.payload;
        },
        removeSelectedMovieOrShow: (state) => {
            state.selectedMovieorShow = {};
        },
    },
    extraReducers:{
        [fetchAsyncMovies.pending]: () => {
            console.log('Pending');
        },
        [fetchAsyncMovies.fulfilled] : (state,{payload}) => {
            console.log("Fetched successfully");
            return {...state,movies:payload};
        },
        [fetchAsyncMovies.rejected] : () => {
            console.log('Rejected');
        },
        [fetchAsyncShows.fulfilled] : (state,{payload}) => {
            console.log("Fetched successfully");
            return {...state,shows:payload};
        },
        [fetchAsyncMovieOrShowDetail.fulfilled] : (state,{payload}) => {
            console.log("Fetched successfully");
            return {...state,selectedMovieOrShow:payload};
        },
    }
})

export const {addMovies,removeSelectedMovieOrShow} = movieSlice.actions;

export const getAllMovies = (state) => state.movies.movies;

export default movieSlice.reducer;