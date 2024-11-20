/**
 * Filters columns
 * @param {*} direction
 * @param {*} data
 * @param {*} setData
 * @param {*} setSorted
 * @param {*} filter
 */
export const sort = (direction, data, setData, setSorted, filter) => {
  setData(
    [...data].sort((a, b) => (a[filter] > b[filter] ? 1 : -1) * direction)
  );
  setSorted(direction);
};
