import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";

const cardStyles = theme => ({
  root: {
    background: theme.palette.primary.main
  },
  title: {
    color: "white"
  }
});
const CardHeader = withStyles(cardStyles)(CardHeaderRaw);

const styles = {
  card: {
    margin: "5% 25%"
  }
};

class Measurements extends Component {
  componentDidMount() { 
    this.props.onLoad();
    this.interval = setInterval(this.props.onLoad, 1000);
  }
  render() {
    const {
      classes,
      temperature,
      latitude,
      longitude,
      timestamp
    } = this.props;
    const secondsFetched = (new Date(timestamp)).getSeconds();
    const secondsNow =(new Date()).getSeconds();
    return (
      <Card className={classes.card}>
        <CardHeader title="Dashboard Visualization" />
        <CardContent>
          <List>
            <ListItem>
              <span>Temperature:</span>
              <ListItemText primary={temperature} />
            </ListItem>
            <ListItem>
              <span>Latitude:</span>
              <ListItemText primary={latitude} />
            </ListItem>
            <ListItem>
              <span>Longitude:</span>
              <ListItemText primary={longitude} />
            </ListItem>
            <ListItem>
              <span>Last Received:</span>
              <ListItemText primary={`${secondsFetched - secondsNow} seconds ago`} />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    );
  };
};

const mapState = (state, ownProps) => {
  const {
    temperature,
    latitude,
    longitude,
    timestamp
  } = state.measurements;
  return {
    temperature,
    latitude,
    longitude,
    timestamp
  };
};

const mapdispatch = dispatch => ({
  onLoad: () =>
    dispatch({
      type: actions.FETCH_DRONE_MEASUREMENTS
    }) 
  });


export default connect(
  mapState,
  mapdispatch
)(withStyles(styles)(Measurements));