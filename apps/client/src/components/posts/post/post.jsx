/**
 * MIT License
 *
 * Copyright (c) 2022 Jerad Rutnam (jeradrutnam.com)
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

import React, { useState } from "react";
import moment from "moment";
import {
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Button,
    Typography,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from "react-redux";
import { useAuthContext } from "@asgardeo/auth-react";

import { deletePost, likePost } from "../../../actions/posts";
import { classes, StyleWrapper } from "./style";
import NO_IMAGE from "../../../images/no-image.jpg";

const Post = ({ post, setCurrentId }) => {
    const { state } = useAuthContext();
    const [ open, setOpen ] = useState(false);
    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const postImage = post.selectedFile || NO_IMAGE;

    return (
        <StyleWrapper>
            <Card className={ classes.card }>
                <CardMedia className={ classes.media } image={ postImage } title={ post.title } />
                <div className={ classes.overlay }>
                    <Typography variant="h6">{ post.creator }</Typography>
                    <Typography variant="body2">{ moment(post.createdAt).fromNow() }</Typography>
                </div>
                <Dialog
                    open={ open }
                    onClose={ handleClose }
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        { "Delete post ?" }
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You are going to delete this post. Are you sure to proceed with the action ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={ handleClose } color="error">Cancel</Button>
                        <Button
                            onClick={ () => dispatch(deletePost(post._id)) }
                            color="error"
                            variant="contained"
                            autoFocus>
                                Delete
                        </Button>
                    </DialogActions>
                </Dialog>
                { state.isAuthenticated &&
                    <div className={ classes.overlay2 }>
                        <IconButton
                            className={ classes.cardAdminActions }
                            size="small"
                            onClick={ () => setCurrentId(post._id)
                        }>
                            <EditIcon fontSize="medium" />
                        </IconButton>
                        <IconButton
                            className={ classes.cardAdminActions }
                            size="small"
                            onClick={ handleClickOpen }>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </div>
                }
                <div className={ classes.details }>
                    <Typography variant="body2" color="textSecondary">{ post.tags.map((tag) => `#${tag} `) }</Typography>
                </div>
                <Typography className={ classes.title } variant="h5" gutterBottom>{ post.title }</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">{ post.message }</Typography>
                </CardContent>
                <CardActions className={ classes.cardActions }>
                    <Button size="small" color="primary" onClick={ () => dispatch(likePost(post._id)) }>
                        <ThumbUpAltIcon fontSize="small" />
                        &nbsp;Like { post.likeCount }
                    </Button>
                </CardActions>
            </Card>
        </StyleWrapper>
    )
};

export default Post;
