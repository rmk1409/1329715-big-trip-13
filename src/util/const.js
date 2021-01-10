const ActionType = {
  ADD: `Add`,
  UPDATE: `Update`,
  DELETE: `Delete`,
};

/**
 * `Patch` is used to update only point
 * `Minor` is used to update point, trip info(cost & start-middle-final point), filter view
 * `Major` is used to switch filter to update point, trip info, filter & `point board`
 * @type {{MAJOR: string, MINOR: string, PATCH: string}}
 */
const UpdateType = {
  PATCH: `Patch`,
  MINOR: `Minor`,
  MAJOR: `Major`,
};

const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
  NEW_EVENT: `New event`
};

export {ActionType, UpdateType, MenuItem};
