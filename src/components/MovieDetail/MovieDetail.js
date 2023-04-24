import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAsyncMovieOrShowDetail } from "../../features/movies/movieSlice";
import "./MovieDetail.scss";
import { removeSelectedMovieOrShow } from "../../features/movies/movieSlice";

const MovieDetail = () => {
  const param = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(param.imdbID));

    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, param.imdbID]);

  const data = useSelector((store) => store.slice.selectedMovieOrShow);
  console.log(data);

  return (
    <div className="movie-section">
        {(data === undefined || data === null) ? (
          <div>...Loading</div>
        ) : (
          <>
            <div className="section-left">
              <div className="movie-title">{data?.Title}</div>
              <div className="movie-rating">
                <span>
                  IMDB Rating{" "}
                  <i className="fa fa-star"> : {data?.imdbRating}</i>
                </span>
                <span>
                  IMDB Votes{" "}
                  <i className="fa fa-thumbs-up"> : {data?.imdbVotes}</i>
                </span>
                <span>
                  Runtime <i className="fa fa-film"> : {data?.Runtime}</i>
                </span>
                <span>
                  Year <i className="fa fa-calendar"> : {data?.Year}</i>
                </span>
              </div>
              <div className="movie-plot">{data?.Plot}</div>
              <div className="movie-info">
                <div>
                  <span>Director</span>
                  <span>{data?.Director}</span>
                </div>
                <div>
                  <span>Stars</span>
                  <span>{data?.Actors}</span>
                </div>
                <div>
                  <span>Generes</span>
                  <span>{data?.Genre}</span>
                </div>
                <div>
                  <span>Languages</span>
                  <span>{data?.Language}</span>
                </div>
                <div>
                  <span>Awards</span>
                  <span>{data?.Awards}</span>
                </div>
              </div>
            </div>
            <div className="section-right">
              <img src={data?.Poster} alt={data?.Title} />
            </div>
          </>
        )}
    </div>
  );
};

export default MovieDetail;
