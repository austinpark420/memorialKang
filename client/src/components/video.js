import React from "react";
import { compose } from "recompose";
import { connect } from "react-redux";

import "css/common.scss";

import {
  makeStyles,
  GridList,
  GridListTile,
  Typography,
  withWidth
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  videoWrap: {
    paddingTop: "60px"
  },
  gridList: {
    width: "96%",
    margin: "0 auto !important"
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

const Video = ({ width, videoData }) => {
  const classes = useStyles();

  const getGridListCols = () => {
    if (width === "sm" || width === "xs") {
      return 1;
    } else if (width === "md") {
      return 2;
    } else {
      return 3;
    }
  };

  return (
    <div className={classes.videoWrap}>
      <Typography variant="h6" children="비디오 썸네일" />

      <GridList
        cellHeight="auto"
        cols={getGridListCols()}
        spacing={30}
        className={classes.gridList}
      >
        {videoData.map(video => (
          <GridListTile key={video.url}>
            <iframe
              width={video.width}
              className={classes.ifram}
              title={video.title}
              src={video.url}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

let mapStateToProps = state => ({ videoData: state.videoData });

export default compose(
  withWidth(),
  connect(mapStateToProps)
)(Video);
