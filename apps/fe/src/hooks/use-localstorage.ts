export const useLocalStorage = () => {
  const set = (key: string, val: string) => {
    localStorage.setItem(key, val);
  };

  const get = (key: string) => {
    const val = localStorage.getItem(key);
    return val;
  };

  const remove = (key: string) => {
    localStorage.removeItem(key);
  };

  return { set, get, remove };
};
