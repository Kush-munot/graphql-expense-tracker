import React from "react";
import { Grid, Typography } from "@mui/material";
import { footerHeadings } from "../globalStyles";

const Footer = () => {
    return (
        <Grid
            container
            sx={{
                background: "#F8F8F8",
                p: "3%",
            }}
        >
            <Grid xs={12} md={6} lg={6}>
                <Typography sx={footerHeadings(700, 18)}>
                    © 2024 Expense Tracker
                </Typography>
                <Typography sx={footerHeadings(400,14)}>
                    Simple Expense Tracking App Built with Next.js and GraphQL
                </Typography>
            </Grid>
        </Grid >
    );
};

export default Footer;
