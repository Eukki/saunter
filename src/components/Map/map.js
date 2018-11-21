import React, { Component } from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";

class Map extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let lat, lng;
		const LatLng = this.props.LatLng;

		if (!LatLng.lenght) {
		}
		const MapComponent = compose(
			withProps({
				googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDxtiunl1kADOT4ZnUHcO3CTMeE5uVOAJI&v=3.exp&libraries=geometry,drawing,places",
				loadingElement: <div style={{ height: `100%` }} />,
				containerElement: <div style={{ height: `100%` }} />,
				mapElement: <div style={{ height: `100%` }} />
			}),
			withScriptjs,
			withGoogleMap,
			lifecycle({
				componentDidMount() {
					const google = window.google;
					const DirectionsService = new google.maps.DirectionsService();

					DirectionsService.route({
						origin: new google.maps.LatLng(lat, lng),
						destination: new google.maps.LatLng(lat, lng),
						travelMode: google.maps.TravelMode.DRIVING
					}, (result, status) => {
						if (status === google.maps.DirectionsStatus.OK) {
							this.setState({
								directions: result
							});
						} else {
							console.log('error fetching directions ${result}');
						}
					})
				}
			})
		)(props => 

			<GoogleMap
			defaultZoom={8}
			defaultCenter={{lat: 55.738658, lng: 37.618846}}
			>
				{props.directions && <DirectionsRenderer directions={props.directions} />}
			</GoogleMap>
		);
		return (
			<MapComponent />
		)
	}
}

export default Map;