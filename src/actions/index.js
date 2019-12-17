export const addMarker =  function (store, payload) {
	const newStore = Object.assign({}, store);
	const lat = payload.latInput.current.value;
	const lng = payload.lngInput.current.value;
	
	newStore.state.markers = newStore.state.markers.concat({
		position : {lat, lng}
	});
	
	store.setState(newStore);
}