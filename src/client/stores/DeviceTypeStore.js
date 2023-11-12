import { action, computed, thunk } from "easy-peasy";
import {
  getDeviceTypeData,
  getDeviceTypeDataById,
  updateDeviceTypeData,
  deleteDeviceTypeData,
  addDeviceTypeData,
} from "../services/DeviceTypesService";

const DeviceTypeStore = {
  /* states */
  isDeviceTypeLoading: false,
  deviceTypes: [],
  error: "",
  drawerVisible: false,
  deviceTypesCount: computed((state) => state.deviceTypes.length),

  /* actions */
  setIsDeviceTypeLoadingAction: action((state) => {
    state.isDeviceTypeLoading = !state.isDeviceTypeLoading;
  }),
  setErrorAction: action((state, error) => {
    state.error = error;
  }),
  setDeviceTypesAction: action((state, deviceTypes) => {
    state.deviceTypes = deviceTypes;
    state.deviceTypesCount = deviceTypes.length;
  }),
  pushDeviceTypesAction: action((state, deviceType) => {
    state.deviceTypes.push(deviceType);
  }),
  popDeviceTypesAction: action((state, _id) => {
    state.deviceTypes = state.deviceTypes.filter((deviceType) => deviceType.id !== _id);
  }),
  updateDeviceTypeAction: action((state, deviceType) => {
    state.deviceTypes = state.deviceTypes.map((dev) => {
      if (dev["id"] === deviceType["id"]) {
        dev = deviceType;
      }

      return dev;
    });
  }),
  actionDrawer: action((state) => {
    state.drawerVisible = !state.drawerVisible;
  }),

  /* thunks */
  getDeviceTypesThunk: thunk(async (action, scope) => {
    action.setIsDeviceTypeLoadingAction();

    try {
      let { data } = await getDeviceTypeData(scope);

      action.setDeviceTypesAction(
        data.map((v, i) => {
          return { ...v, key: v.id };
        })
      );
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsDeviceTypeLoadingAction();
  }),
  getDeviceTypesByIdThunk: thunk(async (action, scope, id) => {
    action.setIsDeviceTypeLoadingAction();

    try {
      let { data } = await getDeviceTypeDataById(scope, id);
      action.setDeviceTypesAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsDeviceTypeLoadingAction();
  }),
  addDeviceTypeThunk: thunk(async (action, data) => {
    action.setIsDeviceTypeLoadingAction();

    try {
      let result = await addDeviceTypeData(data);
      if (typeof result["data"] != "undefined")
        action.pushDeviceTypesAction(result["data"]);

      action.setIsDeviceTypeLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsDeviceTypeLoadingAction();
  }),
  updateDeviceTypeThunk: thunk(async (action, data) => {
    action.setIsDeviceTypeLoadingAction();

    try {
      let result = await updateDeviceTypeData(data);
      if (typeof result["data"] != "undefined")
        action.updateDeviceTypeAction(result["data"]);

      action.setIsDeviceTypeLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsDeviceTypeLoadingAction();
  }),
  deleteDeviceTypeThunk: thunk(async (action, id) => {
    action.setIsDeviceTypeLoadingAction();

    try {
      let result = await deleteDeviceTypeData(id);
      if (typeof result["data"] != "undefined") action.popDeviceTypesAction(id); // TODO: check result before popping

      action.setIsDeviceTypeLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsDeviceTypeLoadingAction();
  }),
};

export default DeviceTypeStore;
