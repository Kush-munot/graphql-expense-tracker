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
    fontWeight: 700,
    fontSize: 22,
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

export const editDeleteButtonGrid = {
    marginLeft: '0', marginTop: '0', display: 'flex', justifyContent: 'space-around', alignItems: 'center',
    "@media (max-width:760px)": {
        paddingRight: '0.2rem'
    }
}

export const iconStyles = { cursor: 'pointer', color: '#374151', fontSize: '1.1rem' }
export const chipStyles = {
    width: 'fit-content', padding: '0 0.05rem', fontSize: '0.8rem', fontWeight: '500', height: '25px', borderRadius: '5px', 
    "@media (max-width:600px)": {
        display: 'none'
    },
}

export const expenseMsgStyle = {
    margin: '0 5%', fontSize: '1rem', fontWeight: '500', fontFamily: 'Inter', display: 'flex', alignItems: 'center',
    "@media (max-width:600px)": {
        fontSize: '1.2rem'
    },
}

export const expenseAmountStyle = {height: '25px', width: 'auto', margin: '0 0.5rem',color: '#2563eb', fontFamily: 'Nunito', display: 'flex', justifyContent: 'center', alignItems: 'center' }
export const expenseAmtStack = { backgroundColor: '#dbeafe', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }
export const addExpenseGrid = {
    marginLeft: '0', marginTop: '0', display: 'flex',
    alignItems: 'center',
    justifyContent: 'right',
    padding: '0 2rem',
    "@media (max-width:760px)": { justifyContent: 'right' }
}

export const masterGrid = {
    width: '100%', marginLeft: '0', marginTop: '0', border: '1px solid #1976d2', borderRadius: '10px', fontFamily: 'Inter',
    "@media (max-width:760px)": { padding: '0' }
}