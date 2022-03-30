// * ========== IMPORTS ==========

import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

// * ========== STYLES ==========

// ! why do we have a theme parameter?
const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

// * ========== VARIABLES & FUNCTIONS ==========

// Fn. to display commas between numbers
export function numberWithCommas(x) {
  // regular expression (nobody writes them by themselves, lol)
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  // state where our data of trending coins will be stored
  const [trending, setTrending] = useState([]);
  // MUI define class obj
  const classes = useStyles();
  // use CryptoState to import the State from Context component and extract the values
  const { currency, symbol } = CryptoState();

  // fetching data with axios library
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  // if currency state changes data fetches
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  

  // * ========== ALICE CAROUSEL ==========

  // what is being displayed in the carousel
  const items = trending.map((coin) => {
    // if price changed more than by 0% than true else false
    let profit = coin.price_change_percentage_24h > 0;
    
    return (
      // added draggable="false" so that you can not drag anymore, lol
      <Link
        draggable="false"
        className={classes.carouselItem}
        to={`/coins/${coin.id}`}
      >
        <img
          // The optional chaining operator (?.) enables you to read the value of a property located deep within a chain of connected objects without having to check that each reference in the chain is valid.
          src={coin?.image}
          alt={coin?.name}
          draggable="false"
          height="60"
          style={{ marginBottom: 10 }}
        />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              // profit is true of false, true is bigger than 0, false is smaller
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {/* profit true show "+" and reduce to 2 decimals after dot */}
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  // how many items should be displayed next to each other
  // 0px - 512px = display 2 items, 512px - infinity = 4 items
  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  // * ========== HTML ==========

  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        // how many items do you want to see at one time
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
