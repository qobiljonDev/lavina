const storage = {
    get: (key: string) => {
        return (window.localStorage && window.localStorage.getItem(key)) || null;
    },

    set: (key: string, value: any) => {
        if (!value || value.length <= 0) {
            return;
        }
        if (window.localStorage) {
            window.localStorage.setItem(key, value);
        }
    },

    remove: (key: string) => {
        if (window.localStorage && window.localStorage[key]) {
            window.localStorage.removeItem(key);
            return true;
        }
    },
};
export default storage
