export const getLocalStorageValue = (key: string) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      console.log(`No saved item found in localStorage for key: ${key}`);
      return undefined;
    }
    console.log(`Loaded item from localStorage for key: ${key}`, item);
    return JSON.parse(item);
  } catch (err) {
    console.error(`Error loading item from localStorage for key: ${key}`, err);
    return undefined;
  }
};
