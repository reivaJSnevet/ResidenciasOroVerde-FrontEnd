import { useState, useEffect} from "react";

/**
 * Retrieves a value from the local storage based on the provided key.
 * If the value does not exist in the local storage, it returns the initial value.
 * If the initial value is a function, it executes the function and returns its result.
 *
 * @param {string} key - The key used to retrieve the value from the local storage.
 * @param {*} initValue - The initial value to be returned if the value does not exist in the local storage.
 * @returns {*} The value retrieved from the local storage or the initial value.
 */
const getLocalValue = (key, initValue) => {
    if(typeof window === "undefined") {
        return initValue;
    }

    const localValue = JSON.parse(localStorage.getItem(key));
    if(localValue) {
        return localValue;
    }

    if(initValue instanceof Function) {
        return initValue();
    }

    return initValue;
}

/**
 * Custom hook for managing state in local storage.
 *
 * @param {string} key - The key to use for storing the value in local storage.
 * @param {*} initValue - The initial value to use if no value is found in local storage.
 * @returns {Array} - An array containing the current value and a function to update the value.
 */
const useLocalStorage = (key, initValue) => {
    const [value, setValue] = useState(()=>{
        return getLocalValue(key, initValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;