// * ========== IMPORTS ==========

import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { numberWithCommas } from "../components/Banner/Carousel";
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

  // ! this needs to be moved inside useEffect, probably
  // fetching single Coin data
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

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
    description: {
      // width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      // textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      // Making it responsive
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
    forMargin: {
      marginRight: 10,
    },
  }));
  // MUI define class obj
  const classes = useStyles();

  // * ========== HTML ==========
  // if statement to create a loading bar while coin-data is loading for the Current Price Element Fn. below
  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

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
        <Typography variant="subtitle1" className={classes.description}>
          {/* split text at dot-space and return first one */}
          {/* replaced his library with dangerouslySetInnerHTML, it converts HTML in strings to React components */}
          <div
            dangerouslySetInnerHTML={{
              __html: coin?.description.en.split(". ")[0],
            }}
          ></div>
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex", flexWrap: "wrap" }}>
            <Typography
              variant="h5"
              className={`${classes.heading}  ${classes.forMargin}`}
            >
              Rank:
            </Typography>
            {/* Added additional class, so that the 2 Typography element separate with marginRight */}
            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {coin?.market_cap_rank}
            </Typography>
          </span>
          <span style={{ display: "flex", flexWrap: "wrap" }}>
            <Typography
              variant="h5"
              className={`${classes.heading}  ${classes.forMargin}`}
            >
              Current&nbsp;Price:
            </Typography>

            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}&nbsp;
              {/* we executing a Fn. here, therefore we created a if statement at the top, so that it displays a loading bar till coin data is fetched and just than the Fn. gets executed */}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex", flexWrap: "wrap" }}>
            <Typography
              variant="h5"
              className={`${classes.heading}  ${classes.forMargin}`}
            >
              Market&nbsp;Cap:
            </Typography>

            <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
              {symbol}&nbsp;
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
              )}
            </Typography>
          </span>
        </div>
      </div>

      {/*  ===== Chart ===== */}

      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
