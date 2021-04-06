import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline,
} from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider as UrqlProvider, createClient } from "urql";

import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import Dashboard from "./Features/Dashboard/Dashboard";
import createStore from "./store";

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "rgb(39,49,66)",
    },
    secondary: {
      main: "rgb(197,208,222)",
    },
    background: {
      default: "rgb(226,231,238)",
    },
  },
});

const client = createClient({
  url: "https://react.eogresources.com/graphql",
});

const App = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <UrqlProvider value={client}>
        <Wrapper>
          <Header />
          <Dashboard />
          <ToastContainer />
        </Wrapper>
      </UrqlProvider>
    </Provider>
  </MuiThemeProvider>
);

export default App;
