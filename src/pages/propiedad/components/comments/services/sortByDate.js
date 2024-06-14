/**
 * Sorts an array of objects by date in ascending or descending order.
 *
 * @param {Array} arr - The array to be sorted.
 * @param {string} [order='asc'] - The order in which to sort the array. Can be 'asc' for ascending or 'desc' for descending.
 * @returns {Array} - The sorted array.
 * @throws {Error} - If the order parameter is neither 'asc' nor 'desc'.
 */
const sortByDate = (arr, order = 'asc') => {
    return arr.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (order === 'asc') {
            return dateA - dateB;
        } else if (order === 'desc') {
            return dateB - dateA;
        } else {
            throw new Error("Order must be 'asc' or 'desc'");
        }
    });
};

export default sortByDate;