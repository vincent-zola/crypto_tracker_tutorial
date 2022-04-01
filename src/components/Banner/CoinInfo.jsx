// * ========== IMPORTS ==========

import {
  CircularProgress,
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { HistoricalChart } from "../../config/api";
import { chartDays } from "../../config/data";
import { CryptoState } from "../../CryptoContext";
import SelectButton from "../SelectButton";

// * ========== VARIABLES & FUNCTIONS ==========

const CoinInfo = ({ coin }) => {
  // stores fetched data for Chart
  const [historicData, setHistoricData] = useState();
  // allows us to select data-ranges on Chart
  const [days, setDays] = useState(1);
  // use CryptoState to import the State from Context component and extract the values
  const { currency } = CryptoState();

  // ! this needs to be moved inside useEffect, probably
  // fetching Chart data
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    // we just want the prices
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  // * ========== STYLES ==========

  const useStyles = makeStyles((theme) => ({
    container: {
      // it's 75% because we declared the sidebar to be 25% for the coin description
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
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

  // MUI define class obj
  const classes = useStyles();

  // * ========== HTML ==========
  return (
    // wrap our Header in dark-theme
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ? (
          // circular loading screen from MUI
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            {/* line chart from "react-chartjs-2" */}
            <Line
              data={{
                // X axis
                labels: historicData.map((coin) => {
                  // converting the index[0] which is the Date, to actual Date
                  let date = new Date(coin[0]);
                  // if days is 1 than we get h and min back and we convert it into 00:00
                  let time = `${String(date.getHours()).padStart(
                    2,
                    "0"
                  )}:${String(date.getMinutes()).padStart(2, "0")}`;
                  // if days = 1 than h and min else days
                  // en-GB = dd/mm/yyyy
                  return days === 1 ? time : date.toLocaleDateString("en-GB");
                }),
                // Y axis
                datasets: [
                  {
                    // coin[1] is the price
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
                // y axis on the right
                scale: {
                  position: "right",
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
              // chartDays from data.jsx
            >
              {" "}
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  // onClick set how many days will be displayed on the chart 1,30,90,365
                  onClick={() => {
                    setDays(day.value);
                  }}
                  // if day.value = days than true
                  selected={day.value === days}
                >
                  {/* innerText of button */}
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
