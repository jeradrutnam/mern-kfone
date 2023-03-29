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
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthContext} from '@asgardeo/auth-react';

import {classes, StyleWrapper} from './style';
import NO_IMAGE from '../../../images/no-image.jpg';

import {
  addFollowingItemToUser,
  removeFollowingItemFromUser,
  addCartItemToUser,
  removeCartItemFromUser,
} from '../../../actions/users';

const Item = ({item, setCurrentId}) => {
  const {state, signIn} = useAuthContext();
  const [following, setFollowing] = useState(false);
  const [inCart, setInCart] = useState(false);
  const user = useSelector(state => state.users);
  const dispatch = useDispatch();

  const handleFollow = postId => {
    if (!following) {
      dispatch(addFollowingItemToUser(state.sub, postId));
    } else {
      dispatch(removeFollowingItemFromUser(state.sub, postId));
    }
  };

  const handleAddToCart = postId => {
    if (!state.isAuthenticated) {
      signIn();
    }
    if (!inCart) {
      dispatch(addCartItemToUser(state.sub, postId));
    } else {
      dispatch(removeCartItemFromUser(state.sub, postId));
    }
  };

  useEffect(() => {
    if (user?.favorited && user.favorited.includes(item._id)) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }

    if (user?.cart && user.cart.includes(item._id)) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [user]);

  const itemImage = item.image || NO_IMAGE;

  return (
    <StyleWrapper>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={itemImage} title={item.name} />
        <div className={classes.overlay}>
          <Typography variant="h6">$ {item.price}</Typography>
          {/* <Typography variant="body2">{moment(item.createdAt).fromNow()}</Typography> */}
        </div>
        {/* TODO: Need to enable with updated feature */}
        {/* <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {item?.tags.map(tag => `#${tag} `)}
          </Typography>
        </div> */}
        <Typography className={classes.title} variant="h5" gutterBottom>
          {item.name}
        </Typography>
        <CardContent className={classes.subText} >
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => handleAddToCart(item._id)}>
            {inCart ? <ShoppingCartIcon fontSize="small" /> : <AddShoppingCartIcon fontSize="small" />}
            &nbsp;{inCart ? 'In Cart' : 'Add to Cart'}
          </Button>
        </CardActions>
        {state.isAuthenticated && (
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" onClick={() => handleFollow(item._id)}>
              {following ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
              &nbsp;{following ? 'Watching' : 'Watch'}
            </Button>
          </CardActions>
        )}
      </Card>
    </StyleWrapper>
  );
};

export default Item;
