/**
 * MIT License
 *
 * Copyright (c) 2023 Jerad Rutnam (jeradrutnam.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 **/

import React from 'react';
import moment from 'moment';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useDispatch} from 'react-redux';
import {useAuthContext} from '@asgardeo/auth-react';

import {likeItem} from '../../../actions/items';
import {classes, StyleWrapper} from './style';
import NO_IMAGE from '../../../images/no-image.jpg';

const Item = ({item, setCurrentId}) => {
  const {state} = useAuthContext();
  const dispatch = useDispatch();

  const itemImage = item.selectedFile || NO_IMAGE;

  return (
    <StyleWrapper>
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={itemImage} title={item.name} />
        <div className={classes.overlay}>
          <Typography variant="h6">$ {item.price}</Typography>
          <Typography variant="body2">{moment(item.createdAt).fromNow()}</Typography>
        </div>
        {/* <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {item?.tags.map(tag => `#${tag} `)}
          </Typography>
        </div> */}
        <Typography className={classes.title} variant="h5" gutterBottom>
          {item.name}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {item.description}
          </Typography>
        </CardContent>
        {state.isAuthenticated && (
          <CardActions className={classes.cardActions}>
            <Button size="small" color="primary" onClick={() => dispatch(likeItem(item._id))}>
              <FavoriteIcon fontSize="medium" />
              &nbsp;Favorite {item.likeCount}
            </Button>
          </CardActions>
        )}
      </Card>
    </StyleWrapper>
  );
};

export default Item;
