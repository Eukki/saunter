import React, { Component } from 'react';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";

class Map extends Component {
	render() {
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
					const DirectionsService = new google.maps.DirectionsService();

					DirectionsService.route({
						origin: new google.maps.LatLng(55.758658, 37.618846),
						destination: new google.maps.LatLng(55.758658, 37.618846),
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
			defaultZoom={14}
			defaultCenter={new google.maps.LatLng(55.758658, 37.618846)}
			>
				<Marker position={{ lat: 55.758658, lng: 37.618846 }} defaultDraggable={true} />
				<Marker position={{ lat: 55.758658, lng: 37.658846 }} defaultDraggable={true} />
				<DirectionsRenderer directions={props.directions} />
			</GoogleMap>
		);
		return (
			<MapComponent />
		)
	}
}

export default Map;