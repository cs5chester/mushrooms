import useGlobalHook from "../use-global-hook";

import * as actions from "../actions";

const initialState = {
	markers: []
};

const useGlobal = useGlobalHook(initialState, actions);

export default useGlobal;