import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
	authenticated: false,
	guest_authenticated: false
});



export { setGlobalState, useGlobalState };
