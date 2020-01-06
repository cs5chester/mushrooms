import {updateData} from './../serverData'
import supercluster from "points-cluster";

export const addMarker =  function (store, payload) {
	const newStore = Object.assign({}, store);
	const lat = Number(payload.latInput.current.value);
	const lng = Number(payload.lngInput.current.value);
	const type = payload.mushroomSelect.current.value;
	const id = `f${(~~(Math.random()*1e8)).toString(8)}f${(+new Date).toString(16)}`
	newStore.state.markers = newStore.state.markers.concat({
		lat,
		lng,
		type,
		id
	});
	
	handleMapChange(newStore, newStore.state.mapOptions)
}

export const setMapCenter =  function (store, map) {
	const newStore = Object.assign({}, store);
	
	newStore.state.mapOptions.center.lat = map.lat;
	newStore.state.mapOptions.center.lng = map.lng;

	store.setState(newStore);
	updateData(newStore.state);
}

export const updateCurrentMarker =  function (store, marker, options) {
	const newStore = Object.assign({}, store);
	const position = options.position;
	const id = marker.id;
	const markerInStore = newStore.state.markers.find(function (item) {
		return item.id === id
	});
	
	markerInStore.position.lat = position.lat();
	markerInStore.position.lng = position.lng();
	
	store.setState(newStore);
	updateData(newStore.state)
}

export const updateState =  function (store, payload) {
	if(!payload){
		return
	}
	payload.isLoaded = true;
	const newStore = Object.assign({}, store);
	newStore.state = {...newStore.state, ...payload};
	console.log(newStore);
	handleMapChange(newStore, newStore.state.mapOptions)
}

const getClusters = (store, mapOptions) => {
	if(store.state.markers.length === 0){
		return []
	}
	const clusters = supercluster(store.state.markers, {
		minZoom: 0,
		maxZoom: 99,
		radius: 60,
	});
	
	return clusters(mapOptions);
};

export const createClusters = function (store, mapOptions) {
	return  mapOptions.bounds
			?
		getClusters(store, mapOptions).map(({ wx, wy, numPoints, points }) => ({
				lat: wy,
				lng: wx,
				numPoints,
				id: `${numPoints}_${points[0].id}`,
				points,
		}))
			: []
	
	
};

export const handleMapChange = ( store, { center, zoom, bounds }) => {
	if(!bounds || !zoom || !center){return}
	const newStore = Object.assign({}, store);
	newStore.state.mapOptions = {
		center,
		zoom,
		bounds,
	}

	newStore.state.clusters = createClusters(newStore, newStore.state.mapOptions);
	store.setState(newStore);
	updateData(newStore.state);
};