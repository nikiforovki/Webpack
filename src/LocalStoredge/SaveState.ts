export const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state);
        console.log('Saving state to localStorage:', serializedState);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        console.error('Error saving state to localStorage:', err);
    }
};
