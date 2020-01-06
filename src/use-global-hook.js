import  {useState, useEffect} from 'react';

function setState(newState) {
	this.state = { ...this.state, ...newState.state };
	this.listeners.forEach((listener) => {
		listener(this.state);
	});
}

function useCustom() {
	const newListener = useState()[1];
	useEffect(() => {
		this.listeners.push(newListener);
		return () => {
			this.listeners = this.listeners.filter(listener => listener !== newListener);
		};
	}, []);
	return [this.state, this.actions];
}

function associateActions(store, actions) {
	const associatedActions = {};
	Object.keys(actions).forEach((key) => {
		if (typeof actions[key] === 'function') {
			associatedActions[key] = actions[key].bind(null, store);
		}
		if (typeof actions[key] === 'object') {
			associatedActions[key] = associateActions(store, actions[key]);
		}
	});
	return associatedActions;
}

const useGlobalHook = (initialState, actions) => {
	const store = { state: initialState, listeners: [] };
	
	store.setState = setState.bind(store);
	store.actions = associateActions(store, actions);
	return useCustom.bind(store);
};

export default useGlobalHook;