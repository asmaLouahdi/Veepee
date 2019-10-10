import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CollectionsBookmarkIcon from "@material-ui/icons/CollectionsBookmark";
import DescriptionIcon from "@material-ui/icons/Description";
import PublicIcon from "@material-ui/icons/Public";
import { useSelector } from "react-redux";
import { getDetails } from "../actions/characterActions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  card: {
    width: 300,
    margin: "auto"
  },
  media: {
    height: 50,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  cardContent: {
    padding: 0
  },
  itemCard: {
    display: "flex"
  },
  cardHeader: {
    height: 80
  },
  collapse: {
    backgroundColor: "red",
    position: "absolute"
  }
}));

export default function Character(props) {
  const character = props.value;
  const classes = useStyles();
  const dispatch = useDispatch();
  const isOpened = useSelector(state => state.heros.isOpened);

  const switchToDetails = () => {
    dispatch(getDetails(character.id, isOpened));
  };

  return (
    <Grid item xs={12} sm={4} md={2} lg={2} className={classes.itemCard}>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={character.name}
          subheader={character.modified.split("T")[0]}
        />
        <CardMedia
          className={classes.media}
          image={
            character.thumbnail.path +
            "/landscape_xlarge." +
            character.thumbnail.extension
          }
          title={character.name}
          onClick={switchToDetails}
        />
        <CardContent className={classes.cardContent}>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
          ></Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            aria-label='Details'
            onClick={() => window.open(character.urls[0].url, "_blank")}
          >
            <DescriptionIcon />
          </IconButton>
          <IconButton
            aria-label='Wiki'
            onClick={() => window.open(character.urls[1].url, "_blank")}
          >
            <PublicIcon />
          </IconButton>
          <IconButton
            aria-label='Comics'
            onClick={() => window.open(character.urls[2].url, "_blank")}
          >
            <CollectionsBookmarkIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
}
