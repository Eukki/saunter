import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

export class GoogleMapRender extends Component {
	constructor(props) {
		super(props);

		this.state = {
			map: this.props.map,
			service: false,
			display: false
		}

		this.addPoint = this.addPoint.bind(this);
		this.computeTotalDistance = this.computeTotalDistance.bind(this);
		this.initDirections = this.initDirections.bind(this);
		this.setDirections = this.setDirections.bind(this);
		this.displayRoute = this.displayRoute.bind(this);
		this.onDrag = this.onDrag.bind(this);
		this.eventListClick = this.eventListClick.bind(this);
	}

	componentDidMount() {
		this.initDirections(this.props.google);
	}

	componentDidUpdate() {
		this.state.display.setOptions({draggable: this.props.isAddPoint})
	}

	componentWillUnmount() {
		const listPaths = document.getElementsByClassName('list-group-item');
	    for (let i = 0; i < listPaths.length; i++) {
		  listPaths[i].removeEventListener('click', this.eventListClick, true);
		}
	}

    initDirections(google) {
    	let service = this.state.service;
		let display = this.state.display;

		if (!service && !display) {
			service = new google.maps.DirectionsService();
			display = new google.maps.DirectionsRenderer();

			this.setState({
				service,
				display
			})
		}
    }

	setDirections(mapProps, map, points) {
		const display = this.state.display;
		const displayPoints = points || this.state.map;

		display.setMap(map);
		display.addListener('directions_changed', (e) => {
          	let response = display.getDirections();
	        let legs = response.routes[0].legs;
	        let updatePoints = [];

          	this.computeTotalDistance(response);

          	// Update all points
	        for (let i = 0; i < legs.length; i++) {
	        	let start = {
		          lat: legs[i].start_location.lat(), 
		          lng: legs[i].start_location.lng()
	        	}
		        updatePoints.push(start);

	        	if (i === legs.length-1) {
			        let end = {
			          lat: legs[i].end_location.lat(), 
			          lng: legs[i].end_location.lng()
		        	}
	        		updatePoints.push(end);
	        	}
	        }
	        
	        if (!this.props.fromFull) this.props.updateMap(updatePoints);
        });

		// When click on list of paths
		if (this.props.fromFull) {
	        const listPaths = document.getElementsByClassName('list-group-item');
		    for (let i = 0; i < listPaths.length; i++) {
			  listPaths[i].addEventListener('click', this.eventListClick, true);
			}
		}

		this.displayRoute(displayPoints);
	}
	
	displayRoute(points) {
		const service = this.state.service;
		const display = this.state.display;
		const google = this.props.google;
		let start, steps, finish;
		try {
			start = points[0];
			steps = points.slice(1, points.length-1);
			finish = points[1] ? points[points.length-1] : '';
		} catch(e) {
			console.log("Length too small");
		}

		const waypts = !steps ? '' : steps.map((step) => {
			return {
				location: new google.maps.LatLng(step.lat, step.lng),
				stopover: true
			}
		});

		if (start && finish) {
			service.route({
				origin: new google.maps.LatLng(start.lat, start.lng),
				destination: new google.maps.LatLng(finish.lat, finish.lng),
				waypoints: waypts,
				optimizeWaypoints: true,
				travelMode: google.maps.TravelMode.DRIVING
			}, (result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					display.setDirections(result);
				} else {
					console.log('error fetching directions');
					console.log(result)
				}
			})
		}
	}

	addPoint(mapProps, map, e) {
		if (this.props.isAddPoint) {
			const points = this.props.map;
			const point = {
				lat: e.latLng.lat(),
				lng: e.latLng.lng()
			}

			points.push(point);

			if (!this.props.fromFull) this.props.updateMap(points);
			this.setDirections(mapProps, map, points);
		}
	}

	computeTotalDistance(result) {
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        total = total / 1000;
        if (!this.props.fromFull) this.props.updateLength(total.toFixed(1));
    }

	onDrag(map, marker) {
		const points = this.state.map;
		const point = {
			lat: marker.position.lat(),
			lng: marker.position.lng()
		}

		points[0] = point;
		this.props.updateMap(points);
	}

	eventListClick(e) {
		const paths = this.props.paths;
		const currentPathId = e.currentTarget.getAttribute('id');
	  	paths.forEach((path) => {
	  		if (currentPathId === path.id) {
	  			this.setState({map: path.map});
	  			this.displayRoute(path.map);
	  		};
	  	})
	}

	render() {
		const points = this.state.map;
		const isOneElement = points[0] && !points[1] ? true : false;
		const isAddPoint = this.props.isAddPoint;
		return (
			<Map 
	            google={this.props.google}
	            initialCenter={{lat: 55.738658, lng: 37.618846}} 
	            zoom={9} 
	            style={{width: '100%', height: '100%'}}
	            onClick={this.addPoint}
	            onReady={this.setDirections}
            >
            	{isOneElement && <Marker draggable={isAddPoint}
            		position={{lat: points[0].lat, lng: points[0].lng}}
            		onDragend={this.onDrag}
            		label={{color: 'white', text: 'A'}} />}
          	</Map> 
		)
	}
};

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDxtiunl1kADOT4ZnUHcO3CTMeE5uVOAJI')
})(GoogleMapRender)