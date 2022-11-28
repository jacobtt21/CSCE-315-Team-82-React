import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
	authenticated: false
});

export { setGlobalState, useGlobalState };
