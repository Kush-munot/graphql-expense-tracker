"use client";
import React from 'react';
import {
    AppBar,
    Grid,
    Typography,
    Toolbar,
    Link,
} from "@mui/material";
import { navAppBar, navbarTitle, navToolbar } from '../globalStyles';

export default function Navbar() {

    return (
        <Grid container>
            <AppBar
                component="nav"
                sx={navAppBar}
            >
                <Toolbar
                    sx={navToolbar}
                >
                    <Grid
                        container
                        sx={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            display: { md: "flex" },
                        }}
                    >
                        <Link href="/" style={{ textDecoration: "none", color: "black" }}>
                            <Grid
                                container
                                xs={12}
                                sx={{
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography sx={navbarTitle}>
                                    Expense Tracker
                                </Typography>
                            </Grid>
                        </Link>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}
