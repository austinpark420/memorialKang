import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import "css/common.scss";
// import "../css/image.scss";
import {
  makeStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  Typography,
  IconButton,
  withWidth
} from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  imageWrap: {
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

const Image = ({ tileData, width }) => {
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
    <div className={classes.imageWrap}>
      <Typography variant="h6" children="이미지 썸네일" />
      <GridList
        cellHeight="auto"
        cols={getGridListCols()}
        spacing={30}
        className={classes.gridList}
      >
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${tile.title}`} />
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

let mapStateToProps = state => ({ tileData: state.tileData });

export default compose(
  withWidth(),
  connect(mapStateToProps)
)(Image);
