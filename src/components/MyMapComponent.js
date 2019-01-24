import React from "react";
import { connect } from "react-redux";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

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

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <CardContent style={{ height: `400px`}} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={4}
        defaultCenter={{ lat: 29.775717, lng: -95.356919 }}
    >29.775717, -95.356919
    {props.isMarkerShown && <Marker position={{ lat: props.latitude, lng: props.longitude }} onClick={props.onMarkerClick} />}
    </GoogleMap>
)

class MyFancyComponent extends React.PureComponent {
    state = {
        isMarkerShown: false,
    }

    componentDidMount() {
        this.delayedShowMarker()
    }

    delayedShowMarker = () => {
        setTimeout(() => {
            this.setState({ isMarkerShown: true })
        }, 3000)
    }

    handleMarkerClick = () => {
        this.setState({ isMarkerShown: false })
        this.delayedShowMarker()
    }

    render() {
        const {
            classes,
            latitude,
            longitude
        } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader title="Map Visualization" />
                    <MyMapComponent
                        isMarkerShown={this.state.isMarkerShown}
                        onMarkerClick={this.handleMarkerClick}
                        latitude={latitude}
                        longitude={longitude}
                    />
            </Card>
        )
    }
}

const mapState = (state, ownProps) => {
    const {
        latitude,
        longitude
    } = state.measurements;
    return {
        latitude,
        longitude
    };
};

export default connect(
    mapState
)(withStyles(styles)(MyFancyComponent));