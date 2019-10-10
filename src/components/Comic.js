import React from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
    width: 150,
    height: 80
  }
}));
const theme = createMuiTheme({
  typography: {
    button: {
      fontSize: 11,
      color: "white"
    }
  }
});

export default function Comic(props) {
  const classes = useStyles();

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button
          variant='contained'
          color='primary'
          className={classes.margin}
          onClick={() => window.open(props.item.resourceURI, "_blank")}
        >
          {props.item.name.split("(")[0]}
        </Button>
      </ThemeProvider>
    </div>
  );
}
