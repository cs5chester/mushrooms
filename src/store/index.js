import useGlobalHook from "../use-global-hook";

import * as actions from "../actions";

const initialState = {
	markers: [],
	clusters: [],
	mapOptions: {
		bounds: {},
		zoom: 15,
		center: {
			lat: 49.852572247902685,
			lng: 36.283212542200516
		}
	},
	isLoaded: false
};

const useGlobal = useGlobalHook(initialState, actions);

export default useGlobal;