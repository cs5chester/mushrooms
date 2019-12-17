import useGlobalHook from "../use-global-hook";

import * as actions from "../actions";

const initialState = {
	markers: [
		{
			position: {
				lat: 49.853191,
				lng: 36.283477
			}
		}
	]
};

const useGlobal = useGlobalHook(initialState, actions);

export default useGlobal;