import { action, computed, thunk } from "easy-peasy";
import {
  getDeviceData,
  getDeviceDataById,
  updateDeviceData,
  deleteDeviceData,
  addDeviceData,
  getDevicesUsingFilter,
} from "../services/DeviceService";

const DeviceStore = {
  /* states */
  isDeviceLoading: false,
  devices: [],
  error: "",
  drawerVisible: false,
  deviceCount: computed((state) => state.devices.length),

  /* actions */
  setIsDeviceLoadingAction: action((state) => {
    state.isDeviceLoading = !state.isDeviceLoading;
  }),
  setErrorAction: action((state, error) => {
    state.error = error;
  }),
  setDevicesAction: action((state, devices) => {
    state.devices = devices;
    state.deviceCount = devices.length;
  }),
  pushDevicesAction: action((state, device) => {
    state.devices.push(device);
  }),
  popDevicesAction: action((state, _serialNo) => {
    state.devices = state.devices.filter(
      (device) => device.serialNo !== _serialNo
    );
  }),
  updateDeviceAction: action((state, device) => {
    state.devices = state.devices.map((dev) => {
      if (dev["serialNo"] === device["serialNo"]) {
        dev = device;
      }

      return dev;
    });
  }),
  actionDrawer: action((state) => {
    state.drawerVisible = !state.drawerVisible;
  }),

  /* thunks */
  getDevicesThunk: thunk(async (action, scope) => {
    action.setIsDeviceLoadingAction();

    try {
      let { data } = await getDeviceData(scope);

      action.setDevicesAction(
        data.map((v, i) => {
          return { ...v, key: i };
        })
      );
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsDeviceLoadingAction();
  }),
  getDevicesByIdThunk: thunk(async (action, scope, serialNo) => {
    action.setIsDeviceLoadingAction();

    try {
      let { data } = await getDeviceDataById(scope, serialNo);
      action.setDevicesAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsDeviceLoadingAction();
  }),
  getDevicesUsingFilter: thunk(async (action, filter) => {
    action.setIsDeviceLoadingAction();

    try {
      let { data } = await getDevicesUsingFilter(filter);
      action.setDevicesAction(
        data.map((v, i) => {
          return { ...v, key: i };
        })
      );
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsDeviceLoadingAction();
  }),
  addDeviceThunk: thunk(async (action, data) => {
    action.setIsDeviceLoadingAction();

    try {
      let result = await addDeviceData(data);
      if (typeof result["data"] != "undefined") {
        result["data"]["key"] = result["data"]["serialNo"];
        action.pushDevicesAction(result["data"]);
      }

      action.setIsDeviceLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsDeviceLoadingAction();
  }),
  updateDeviceThunk: thunk(async (action, data) => {
    action.setIsDeviceLoadingAction();

    try {
      let result = await updateDeviceData(data);
      if (typeof result["data"] != "undefined")
        action.updateDeviceAction(result["data"]);

      action.setIsDeviceLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsDeviceLoadingAction();
  }),
  deleteDeviceThunk: thunk(async (action, serialNo) => {
    action.setIsDeviceLoadingAction();

    try {
      let result = await deleteDeviceData(serialNo);
      if (typeof result["data"] != "undefined")
        action.popDevicesAction(serialNo); // TODO: check result before popping

      action.setIsDeviceLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsDeviceLoadingAction();
  }),
};

export default DeviceStore;
