import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadPost } from '../actions/posts';

import 'css/common.scss';
import 'css/post.scss';

const Post = ({ match, posts: { post }, loadPost }) => {
  useEffect(() => {
    loadPost(match.params.id);
  }, [loadPost, match.params.id]);

  return (
    <div>
      {!!post && (
        <div className='post-wrap'>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      )}
    </div>
  );
};

let mapStateToProps = state => ({ posts: state.posts });

export default connect(
  mapStateToProps,
  { loadPost }
)(Post);
