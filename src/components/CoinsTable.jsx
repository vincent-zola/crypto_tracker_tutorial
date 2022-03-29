// * ========== IMPORTS ==========

import {
  Container,
  createTheme,
  LinearProgress,
  Table,
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
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";

// * ========== VARIABLES & FUNCTIONS ==========

const CoinsTable = () => {
  // store fetched data
  const [coins, setCoins] = useState([]);
  // between data loading
  const [loading, setLoading] = useState(false);
  // input form coin search
  const [search, setSearch] = useState();

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

  // * ========== STYLES ==========

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
        {/*  a complete form control including a label, input and help text */}
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ marginBottom: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {
            //  while data is fetching display loading bar
            loading ? (
              // loading bar from MUI
              <LinearProgress style={{ background: "gold" }} />
              // else display table
            ) : (
              <Table>
                <TableHead style={{ background: "#EEBC1D" }}>
                  {/* the x axis, the head of table */}
                  <TableRow>
                    {/* for each "head" display TableCell */}
                    {["Coin", "Price", "24h Change", "Market Cap"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontFamily: "Montserrat",
                          }}
                          key={head}
                          // if element is "Coin" do nothing for all others align to the right site of table
                          align={head === "Coin" ? "" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
              </Table>
            )
          }
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
