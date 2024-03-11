export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            console.log('No saved state found in localStorage');
            return undefined;
        }
        console.log('Loaded state from localStorage:', serializedState);
        return JSON.parse(serializedState);
    } catch (err) {
        console.error('Error loading state from localStorage:', err);
        return undefined;
    }
};
