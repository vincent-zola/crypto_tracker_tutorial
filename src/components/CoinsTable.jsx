// * ========== IMPORTS ==========

import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousel";

// * ========== VARIABLES & FUNCTIONS ==========

const CoinsTable = () => {
  // store fetched data
  const [coins, setCoins] = useState([]);
  // between data loading
  const [loading, setLoading] = useState(false);
  // input form coin search
  const [search, setSearch] = useState("");
  // will redirect to individual coin page
  const history = useHistory();

  // use CryptoState to import the State from Context component and extract the values
  const { currency, symbol } = CryptoState();

  // fetching data with axios library
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  console.log(coins);

  // if currency state changes data fetches
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // Search Fn.
  const handleSearch = () => {
    // keep if it includes search-term (true) , filter if it doesn't (false)
    // includes() returns true, false
    // ! why doesn't he include toLowerCase to search? I included it.
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  // * ========== STYLES ==========

  const useStyles = makeStyles(() => ({
    row: {
      backgroundColor: "#16171a",
      cursor: "pointer",
      fontFamily: "Montserrat",
      "&:hover": {
        backgroundColor: "#131111",
      },
    },
  }));
  // MUI define class obj
  const classes = useStyles();

  // enable dark-theme
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  // * ========== HTML ==========

  return (
    // wrap our Header in dark-theme
    <ThemeProvider theme={darkTheme}>
      {/* Container helps making component responsive */}
      <Container style={{ textAlign: "center" }}>
        {/* Typography: for adding text */}
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        {/* // * ===== Searchbox ===== */}
        {/*  a complete form control including a label, input and help text */}
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* // * ===== Table ===== */}
        <TableContainer>
          {
            //  while data is fetching display loading bar
            loading ? (
              // loading bar from MUI
              <LinearProgress style={{ background: "gold" }} />
            ) : (
              // else display table
              <Table>
                <TableHead style={{ background: "#EEBC1D" }}>
                  {/* the x axis, the head of table, will be always visible */}
                  <TableRow>
                    {/* declare array of table names and for each "head" display TableCell */}
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                          }}
                          key={head}
                          // if element is "Coin" than left for all others align to the right site of table
                          align={head === "Coin" ? "left" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                {/* Rows of Coins */}
                <TableBody>
                  {/* map on coins */}
                  {handleSearch().map((row) => {
                    // price_change... is a key from fetched data
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                      /* the x axis, the rows of coins */
                      <TableRow
                        // id: "bitcoin" for example
                        onClick={() => history.push(`/coins/${row.id}`)}
                        className={classes.row}
                        key={row.name}
                      >
                        {/* ===== Coin ===== */}

                        <TableCell
                          // <th>: The Table Header element
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <span
                              style={{
                                textTransform: "uppercase",
                                fontSize: 22,
                              }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{ color: "darkgray" }}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>

                        {/* ===== Price ===== */}

                        <TableCell align="right">
                          {symbol} {/* fn imported from Carousel.jsx */}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        {/* ===== 24h Change ===== */}

                        <TableCell
                          align="right"
                          style={{
                            color: profit > 0 ? "rgb(14,203,129)" : "red",
                            fontWeight: 500,
                          }}
                        >
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        {/* ===== Market Cap ===== */}

                        <TableCell align="right">
                          {symbol} {/* fn imported from Carousel.jsx */}
                          {numberWithCommas(row.market_cap)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )
          }
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
