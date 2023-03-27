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

import React, { useEffect, useState } from "react";
import { Container, CssBaseline, Button, AppBar, Typography, Grow, Grid, Toolbar } from "@mui/material";
import { useDispatch } from "react-redux";
import { useAuthContext } from "@asgardeo/auth-react";

import { getPosts } from "./actions/posts";
import Posts from "./components/posts/posts";
import Form from "./components/form/form";
import { classes, StyleWrapper } from "./style";

const App = () => {
    const { state, signIn, signOut, on } = useAuthContext();
    const [ currentId, setCurrentId ] = useState(null);
    const dispatch = useDispatch();

    const USER_AUTHENTICATED = "userAuthenticated";

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    useEffect(() => {
        if (localStorage.getItem(USER_AUTHENTICATED) === "true") {
            signIn();
        }
    }, []);

    on("sign-in", () => {
        localStorage.setItem(USER_AUTHENTICATED, "true");
    });

    const handleLogout = () => {
        localStorage.setItem(USER_AUTHENTICATED, "false");
        signOut();
    };

    return (
        <StyleWrapper>
            <CssBaseline />
            <AppBar position="relative" color="default" className={ classes.appBar } >
                <Toolbar sx={{ flexWrap: 'wrap' }}>
                    <Typography variant="h6" color="inherit" className={ classes.heading } noWrap sx={{ flexGrow: 1 }}>
                        My Travel Memories
                    </Typography>
                    { !state.isAuthenticated ? (
                        <Button
                            className={ classes.buttonSubmit }
                            variant="outlined"
                            sx={{ my: 1, mx: 1.5 }}
                            onClick={ () => signIn() }
                        >
                            Sign In
                        </Button>
                    ) : (
                        <>
                            <nav>
                                { state.username }
                            </nav>
                            <Button
                                className={ classes.buttonSubmit }
                                variant="outlined"
                                sx={{ my: 1, mx: 1.5 }}
                                onClick={ () => handleLogout() }
                            >
                                Logout
                            </Button>
                        </>
                    ) }
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg">
                <Grow in>
                    <Grid className={ classes.mainContainer } container justifyContent="space-between" alignItems="stretch" spacing={3}>
                        { state.isAuthenticated ? (
                            <>
                                <Grid item xs={ 12 } sm={ 7 }>
                                    <Posts setCurrentId={ setCurrentId } sm={ 6 } />
                                </Grid>
                                <Grid item xs={ 12 } sm={ 4 }>
                                    <Form currentId={ currentId } setCurrentId={ setCurrentId } />
                                </Grid>
                            </>
                        ) : (
                            <>
                                <Grid item xs={ 12 } sm={ 12 }>
                                    <Posts setCurrentId={ setCurrentId } sm={ 4 } />
                                </Grid>
                            </>
                        ) }
                    </Grid>
                </Grow>
            </Container>
        </StyleWrapper>
    )
};

export default App;
