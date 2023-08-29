const utils = require("./utils");
const browser = require("webextension-polyfill");

// Stored data
let data = {};

// Load all data from local storage
async function initialize() {
  try {
    data = JSON.parse(window.localStorage.getItem("data")) || {};
  } catch (e) {}
}

// Save all data to local storage
function save() {
  return window.localStorage.setItem("data", JSON.stringify(data));
}

// Gets the value at the specified key path
function get(...keys) {
  return utils.deepGetProp(data, keys);
}

// Sets the value at the specified key path
function set(...keysAndValue) {
  const value = keysAndValue.pop();
  const keys = keysAndValue;
  utils.deepSetProp(data, keys, value);
  save();
}

// Gets the specified property or all data of the current user
function getForUser(...keys) {
  return get("users", utils.getDomain(), utils.getNeptunCode(), "data", ...keys);
}

// Sets the specified property of the current user
function setForUser(...keysAndValue) {
  return set("users", utils.getDomain(), utils.getNeptunCode(), "data", ...keysAndValue);
}

module.exports = {
  initialize,
  get,
  set,
  getForUser,
  setForUser,
};
