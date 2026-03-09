'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const history = [];
  let prevState = { ...state };

  for (const action of actions) {
    let newState = { ...prevState };

    switch (action.type) {
      case 'addProperties':
        newState = { ...newState, ...action.extraData };
        history.push(newState);
        break;

      case 'removeProperties':
        for (const key of action.keysToRemove) {
          delete newState[key];
        }
        history.push(newState);
        break;

      case 'clear':
        newState = {};
        history.push(newState);
        break;

      default:
        history.push(newState);
    }

    prevState = newState;
  }

  return history;
}

module.exports = transformStateWithClones;
