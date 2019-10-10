import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCharacters } from "../actions/characterActions";
import Character from "./Character";
import Grid from "@material-ui/core/Grid";

class Characters extends Component {
  componentWillMount() {
    this.props.getCharacters();
  }
  render() {
    const characters = this.props.characters.map(character => (
      <Character key={character.id} value={character} />
    ));
    return (
      <div id='container'>
        <Grid container spacing={1}>
          {characters}
        </Grid>
      </div>
    );
  }
}
Characters.defaultProps = {
  characters: []
};
Characters.propTypes = {
  getCharacters: PropTypes.func.isRequired,
  characters: PropTypes.array.isRequired,
  character: PropTypes.object
  //detail: PropTypes.object
};
const mapStateToProps = state => ({
  characters: state.heros.characters,
  character: state.heros.character
});
export default connect(
  mapStateToProps,
  { getCharacters }
)(Characters);
