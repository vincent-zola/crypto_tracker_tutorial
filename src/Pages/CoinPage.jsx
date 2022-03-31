// * ========== IMPORTS ==========

import { makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/Banner/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";


// * ========== VARIABLES & FUNCTIONS ==========

const CoinPage = () => {
  // has now an obj which contains the :id info declared in App.js, if we go to a page the url ending will be stored in it
  const { id } = useParams();
  // stores fetched data for one Coin
  const [coin, setCoin] = useState();
  // use CryptoState to import the State from Context component and extract the values
  const { currency, symbol } = CryptoState();

  // fetching single Coin data
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  

  useEffect(() => {
    fetchCoin();
  }, []);

  console.log(coin);

  // * ========== STYLES ==========
  // "theme" argument comes from MUI
  const useStyles = makeStyles((theme) => ({
    container: {
      // if full-screen
      display: "flex",
      // down("md") if it's less than mid-screen
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
  }));
  // MUI define class obj
  const classes = useStyles();

  // * ========== HTML ==========

  return (
    <div className={classes.container}>
      {/*  ===== Sidebar =====  */}

      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height={"200"}
          style={{
            marginBottom: 20,
          }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          className={classes.description}
        >
          {/* split text at dot-space and return first one */}
          {/* replaced his library with dangerouslySetInnerHTML, it converts HTML in strings to React components */}
          <div dangerouslySetInnerHTML={{__html: coin?.description.en.split(". ")[0]}} ></div>
          
        </Typography>
      </div>

      {/*  ===== Chart ===== */}

      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
