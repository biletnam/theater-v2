import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Poster from "../../components/Poster/Poster";
import Rating from "../../components/Rating/Rating";
import InfoCard from "../../components/InfoCard/InfoCard";
import InfoContent from "../../components/InfoCard/InfoContent/InfoContent";
import Cast from "../../components/Cast/Cast";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import { getMedia } from "../../store/actions";
import styles from "./MovieInfo.scss";

class MovieInfo extends Component {
  state = {
    showModal: false
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return !this.props.media || Object.keys(this.props.media).length === 0 ? (
      <Redirect to="/notfound" />
    ) : (
      <div className={styles.container}>
        <Modal
          closeModal={this.closeModal}
          title="Trailer"
          showModal={this.state.showModal}
          video={
            this.props.media.videos.results[0]
              ? this.props.media.videos.results[0].key
              : null
          }
        />
        <div className={styles.poster}>
          <Poster
            title={this.props.media.title}
            poster={this.props.media.poster_path}
          />
          {this.props.media.videos.results[0] ? (
            <Button
              clicked={this.openModal}
              type="button"
              cursor="pointer"
              color="white"
              backgroundColor="#dd003f"
              border="1px solid #dd003f"
              margin="1rem 0 0 0"
              height="2rem"
              width="10rem"
              borderRadius="3%"
              textTransform="uppercase"
            >
              Watch Trailer
            </Button>
          ) : null}
        </div>
        <div className={styles.header}>
          <div className={styles["area-overlap-main-header"]}>
            <div className={styles["title-container"]}>
              <h1 className={styles.title}>{this.props.media.title}</h1>
            </div>
            <div className={styles["social-container"]}>
              <div className={styles.favorites}>
                <a href="#">
                  <i className={`icon-heart ${styles.icon}`} />{" "}
                  <span className={styles.label}>Add To Favorites</span>
                </a>
              </div>
              <div className={styles.likes}>
                <a href="#">
                  <i className={`icon-thumbs-up-alt ${styles.icon}`} />{" "}
                  <span className={styles.label}>Like</span>
                </a>
              </div>
            </div>
            <Rating
              rating={this.props.media.vote_average}
              votes={this.props.media.vote_count}
            />
          </div>
          <div className={styles["info-header"]} />
        </div>
        <div className={styles["main-content"]}>
          <InfoCard header="Overview">
            <p>{this.props.media.overview}</p>
          </InfoCard>
          <InfoCard header="Cast">
            <Cast
              data={
                this.props.media.credits ? this.props.media.credits.cast : []
              }
            />
          </InfoCard>
        </div>
        <div className={styles["info-content"]}>
          <InfoCard header="Info">
            <InfoContent type="url" url={this.props.media.homepage} />
            <InfoContent
              category="Director"
              data={
                this.props.media.credits
                  ? this.props.media.credits.crew[0].name
                  : []
              }
            />
            <InfoContent
              type="array"
              category="Genres"
              data={this.props.media.genres || []}
            />
            <InfoContent
              category="Release"
              data={this.props.media.release_date}
            />
          </InfoCard>
        </div>
      </div>
    );
  }
}

const loadMovie = (store, path, query, params) => {
  const mediaId = params[0].match(/(\d+)/)[0];
  return store.dispatch(getMedia("movie", mediaId));
};

const mapStateToProps = state => {
  return {
    media: state.media.data,
    loading: state.media.loading,
    success: state.media.success
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovie: (mediaType, mediaId) => dispatch(getMedia(mediaType, mediaId))
  };
};

export { loadMovie };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieInfo);