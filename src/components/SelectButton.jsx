// * ========== IMPORTS ==========

import { makeStyles } from "@material-ui/core";

// * ========== STYLES ==========

// everything that is inside the SelectButton component in another file can be used as prop
const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({
    selectbutton: {
      border: "1px solid gold",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      //   if selected is true background gold else default
      backgroundColor: selected ? "gold" : "",
      //   if selected is true text-color black
      color: selected ? "black" : "white",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "gold",
        color: "black",
      },
      width: "22%",
      //   margin: 5,
    },
  });

  const classes = useStyles();

  // * ========== VARIABLES & FUNCTIONS ==========

  return (
    //   onClick from CoinInfo.jsx
    <span onClick={onClick} className={classes.selectbutton}>
        {/* what's between the SelectButton component in CoinInfo.jsx */}
      {children}
    </span>
  );
};

export default SelectButton;
