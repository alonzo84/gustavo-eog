import React, { Component } from "react";
import { connect } from "react-redux";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import { withStyles } from "@material-ui/core/styles";
import moment from "moment";

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

function formatXAxis(tickItem) {
	const Dateobj = new Date(tickItem);
	return `${Dateobj.getHours()}:${Dateobj.getMinutes()}`
}

class SimpleLineChart extends Component {
	render() {
		const {
			classes,
			measurements
		} = this.props;
		console.log(measurements);
		return (
			<Card className={classes.card}>
				<CardHeader title="Chart Visualization" />
				<CardContent>
					<LineChart width={600} height={300} data={measurements} margin={{ top: 35, right: 30, left: 20, bottom: 5 }}>
						<XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
						<YAxis />
						<CartesianGrid strokeDasharray="3 3" />
						<Tooltip />
						<Legend />
						<Line type="monotone" dataKey="metric" stroke="#8884d8" activeDot={{ r: 8 }} />
					</LineChart>
					<span>{moment().format("MMM Do YY")}</span>
				</CardContent>
			</Card>
		);
	}
}

const mapState = (state, ownProps) => {
	const {
		measurements
	} = state.measurements;
	return {
		measurements
	};
};

export default connect(
	mapState
)(withStyles(styles)(SimpleLineChart))