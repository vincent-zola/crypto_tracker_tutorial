// * ========== IMPORTS ==========

import {
  AppBar,
  Container,
  createTheme,
  makeStyles,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";



// * ========== STYLES ==========

// Material UI styles for App Bar
const useStyles = makeStyles(() => ({
  title: {
    // flex: 1 so that it is spread to its full width
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

// enable dark-theme
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

// * ========== VARIABLES & FUNCTIONS ==========

const Header = () => {
  // MUI define class obj
  const classes = useStyles();
  // Logo will redirect us to Home
  const history = useHistory();
  // use CryptoState to import the State from Context component and extract the values
  const { currency, setCurrency } = CryptoState();
  

  // * ========== HTML ==========

  return (
    //   wrap our Header in dark-theme
    <ThemeProvider theme={darkTheme}>
      {/* import AppBar form Material UI */}
      <AppBar color="transparent" position="static">
        {/* Container helps making component responsive */}
        <Container>
          <Toolbar>
            {/* Typography: for adding text */}
            <Typography
              // Logo will redirect us to Home
              onClick={() => history.push("/")}
              className={classes.title}
              variant="h5"
            >
              Crypto Tracker
            </Typography>
            {/* Add Selection Menu */}
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              // declare initial value in Select menu
              value={currency}
              // change of selection will change currency
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
