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

import React, { useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";

import { createPost, updatePost } from "../../actions/posts";
import { classes, StyleWrapper } from "./style";

const emptyPost = {
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: ""
};

const Form = ({ currentId, setCurrentId }) => {
    const [ postData, setPostData ] = useState(emptyPost);
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (post) setPostData(post)
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, postData));
        }
        else {
            dispatch(createPost(postData));
        }

        clear();
    }

    const clear = () => {
        setCurrentId(null);
        setPostData(emptyPost);
    }

    return (
        <StyleWrapper>
            <Paper className={ classes.paper }>
                <form autoComplete="off" noValidate className={ `${classes.root} ${classes.form}` }
                    onSubmit={ handleSubmit }>
                    <Typography variant="h6">{ currentId ? "Updating" : "Creating" } a Memory</Typography>
                    <TextField
                        name="creator"
                        variant="outlined"
                        label="Creator"
                        fullWidth
                        value={ postData.creator }
                        onChange={ (e) => setPostData({ ...postData, creator: e.target.value }) } />
                    <TextField
                        name="title"
                        variant="outlined"
                        label="Title"
                        fullWidth
                        value={ postData.title }
                        onChange={ (e) => setPostData({ ...postData, title: e.target.value }) } />
                    <TextField
                        name="message"
                        variant="outlined"
                        label="Message"
                        fullWidth
                        value={ postData.message }
                        onChange={ (e) => setPostData({ ...postData, message: e.target.value }) } />
                    <TextField
                        name="tags"
                        variant="outlined"
                        label="Tags"
                        fullWidth
                        value={ postData.tags }
                        onChange={ (e) => setPostData({ ...postData, tags: e.target.value.split(",") }) } />

                    <div className={ classes.fileInput }>
                        <FileBase
                            type="file"
                            multiple={false}
                            onDone={ ({ base64 }) => setPostData({ ...postData, selectedFile: base64 }) } />
                    </div>
                    <Button
                        className={ classes.buttonSubmit }
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        fullWidth
                    >
                        Submit
                    </Button>
                    <Button
                        className={ classes.buttonClear }
                        variant="contained"
                        color="secondary"
                        size="small"
                        fullWidth
                        onClick={ clear }
                    >
                        Clear
                    </Button>
                </form>
            </Paper>
        </StyleWrapper>
    )
};

export default Form;
