import React, { useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Post } from 'components';
import { connect } from 'react-redux';
import { loadPosts } from '../actions/posts';

import dateFormat from 'dateformat';

import 'css/common.scss';
import 'css/posts.scss';
import {
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  boardWrap: {
    padding: '60px 0',
    backgroundColor: '#f2f3f4'
  },
  list: {
    width: '80%',
    margin: '20px auto 0',
    backgroundColor: '#fff',
    borderRadius: '3px'
  }
}));

const Posts = ({ match, posts: { posts }, loadPosts }) => {
  const classes = useStyles();

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  return (
    <div className={classes.boardWrap}>
      <Typography variant='h6' children='게시판' />
      <List className={classes.list}>
        {posts === null ? (
          <div>Loading</div>
        ) : (
          posts.map((post, index) => (
            <Link to={`${match.url}/${post._id}`}>
              <ListItem
                button
                key={post.index}
                // onClick={() => this.handleSelectBoard(row.brdno)}
              >
                <ListItemText primary={post.title} secondary={post.writer} />

                <ListItemSecondaryAction>
                  <ListItemText primary={dateFormat(post.date, 'yyyy-mm-dd')} />
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          ))
        )}
      </List>
      <Route path={`${match.url}/:id`} component={Post} />
    </div>
  );
};

export default connect(
  null,
  { loadPosts }
)(Posts);
