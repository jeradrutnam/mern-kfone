/**
 * Copyright (c) 2023, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */


import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthContext} from '@asgardeo/auth-react';

import {classes, StyleWrapper} from './style';
import NO_IMAGE from '../../../images/no-image.jpg';
import { addFollowingItemToUser, removeFollowingItemFromUser, addCartItemToUser, removeCartItemFromUser } from '../../../actions/users';


const Post = ({post, setCurrentId}) => {
  const {state, signIn} = useAuthContext();
  const [open, setOpen] = useState(false);
  const [following, setFollowing] = useState(false);
  const [inCart, setInCart] = useState(false);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFollow = (postId) => {
    if (!following) {
      dispatch(addFollowingItemToUser(state.sub, postId));
    } else {
      dispatch(removeFollowingItemFromUser(state.sub, postId));
    }
  }

  const handleAddToCart = (postId) => {
    if (!state.isAuthenticated) {
      signIn();
    }
    if (!inCart) {
      dispatch(addCartItemToUser(state.sub, postId));
    } else {
      dispatch(removeCartItemFromUser(state.sub, postId));
    }
  }

  useEffect(() => {
    if (user?.favorited && user.favorited.includes(post._id)) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }

    if (user?.cart && user.cart.includes(post._id)) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [user]);

  const postImage = post.image || NO_IMAGE;

  return (
    <StyleWrapper>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={postImage} title={post.name} />
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.name}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.description}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            $ {post.price}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" onClick={() => handleAddToCart(post._id)}>
              {
                inCart ? <ShoppingCartIcon fontSize="small" /> : <AddShoppingCartIcon fontSize="small" />
              }
              &nbsp;{inCart ? 'In Cart' : 'Add to Cart'}
            </Button>
          </CardActions>
        {state.isAuthenticated && (
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" onClick={() => handleFollow(post._id)}>
              &nbsp;{following ? 'Following' : 'Follow'}
              {
                following ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />
              }
              
            </Button>
          </CardActions>
        )}
      </Card>
    </StyleWrapper>
  );
};

export default Post;
