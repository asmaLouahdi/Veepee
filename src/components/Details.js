import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { changeModal } from "../actions/characterActions";
import { useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Comic from "./Comic";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: "#333333",
    color: "white"
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

export default function Details() {
  const dispatch = useDispatch();
  const isOpened = useSelector(state => state.heros.isOpened);
  const currentCharacter = useSelector(state => state.heros.character);
  const comics = currentCharacter.comics.items.map(comic => (
    <Comic key={comic.name} item={comic} />
  ));

  const handlePanel = () => {
    dispatch(changeModal(isOpened));
  };
  return (
    <div>
      <Dialog
        onClose={handlePanel}
        aria-labelledby='customized-dialog-title'
        open={isOpened}
      >
        <DialogTitle id='customized-dialog-title' onClose={handlePanel}>
          {currentCharacter.name}
        </DialogTitle>
        <DialogContent dividers>
          <Card>
            <CardMedia
              component='img'
              height='200'
              image={
                currentCharacter.thumbnail.path +
                "/landscape_xlarge." +
                currentCharacter.thumbnail.extension
              }
              title={currentCharacter.name}
            />
            <CardContent>
              <Typography variant='body2' color='textSecondary' component='p'>
                {currentCharacter.description}
              </Typography>
              <Typography gutterBottom variant='h5' component='h2'>
                Comics
              </Typography>
              <div className='comics'>{comics}</div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
