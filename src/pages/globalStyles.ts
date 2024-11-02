export function btn(buttonWidth: string) {
    return {
        marginRight: "20px",
        color: "white",
        fontFamily: 'Nunito',
        backgroundColor: "#1976d2",
        height: "30px",
        width: buttonWidth,
        textTransform: 'none',
        borderRadius: '5px',
        "&:hover": {
            backgroundColor: "#915831",
            color: "white",
        },
        "@media (max-width:780px)": {
            fontSize: '13px',
            height: '32px',
            width: buttonWidth,
        },
    };
}
export const navbarTitle = {
    color: "#915831",
    fontWeight: 600,
    fontSize: 20,
    width: "auto",
    ml: 2,
    fontFamily: 'Nunito'
}

export const navToolbar = {
    m: 2,
    backgroundColor: "#FAFAFF",
    borderRadius: "10px",
    py: 0,
    boxShadow: "1px 1px 1px 1px #DADDD8",
}

export const navAppBar = {
    backgroundColor: "transparent",
    height: "auto",
    boxShadow: "none",
}

export function footerHeadings(fontWeight: number, fontSize: number) {
    return {
        fontFamily: 'Nunito',
        fontStyle: 'normal',
        fontWeight: fontWeight,
        fontSize: fontSize,
    };
}

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '5px',
    boxShadow: 24,
    p: 4,
    "@media (max-width:780px)": {
        width: '80%',
    },
};
