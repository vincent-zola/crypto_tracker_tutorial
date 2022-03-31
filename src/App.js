// * ========== IMPORTS ==========

import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./Pages/Homepage";
import CoinPage from "./Pages/CoinPage";
import "./App.css";
import { makeStyles } from "@material-ui/core";

function App() {

  // * ========== STYLES ==========

  // Material UI
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh',
    },
  }));
  // transfer styles to an obj
  const classes = useStyles();
// * ========== HTML ==========

  return (
    <BrowserRouter>
      {/* Material UI add class */}
      <div className={classes.App}>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
