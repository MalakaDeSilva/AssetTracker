import { action, computed, thunk } from "easy-peasy";
import {
  getAllocationData,
  getAllocationDataById,
  updateAllocationData,
  deleteAllocationData,
  addAllocationData,
} from "../services/AllocationsService";

const AllocationStore = {
  /* states */
  isAllocationsLoading: false,
  allocations: [],
  error: "",
  drawerVisible: false,
  allocationsCount: computed((state) => state.allocations.length),

  /* actions */
  setIsAllocationsLoadingAction: action((state) => {
    state.isAllocationsLoading = !state.isAllocationsLoading;
  }),
  setErrorAction: action((state, error) => {
    state.error = error;
  }),
  setAllocationsAction: action((state, allocations) => {
    state.allocations = allocations;
    state.allocationsCount = allocations.length;
  }),
  pushAllocationsAction: action((state, allocation) => {
    state.allocations.push(allocation);
  }),
  popAllocationsAction: action((state, _id) => {
    state.allocations = state.allocations.filter(
      (allocation) => allocation.id !== _id
    );
  }),
  updateAllocationAction: action((state, allocation) => {
    state.allocations = state.allocations.map((alloc) => {
      if (alloc["id"] === allocation["id"]) {
        let _allocation = {
          ...alloc,
          ...allocation,
        };
        alloc = _allocation;
      }

      return alloc;
    });
  }),
  actionDrawer: action((state) => {
    state.drawerVisible = !state.drawerVisible;
  }),

  /* thunks */
  getAllocationsThunk: thunk(async (action, filter) => {
    action.setIsAllocationsLoadingAction();

    try {
      let { data } = await getAllocationData(filter.all, filter);

      action.setAllocationsAction(
        data.map((v, i) => {
          return { ...v, key: v.id };
        })
      );
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsAllocationsLoadingAction();
  }),
  getAllocationsByIdThunk: thunk(async (action, scope, id) => {
    action.setIsAllocationsLoadingAction();

    try {
      scope = scope ? scope : "n";
      let { data } = await getAllocationDataById(scope, id);
      action.setAllocationsAction(data);
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsAllocationsLoadingAction();
  }),
  addAllocationThunk: thunk(async (action, data) => {
    action.setIsAllocationsLoadingAction();

    try {
      let result = await addAllocationData(data);
      if (typeof result["data"] != "undefined")
        action.pushAllocationsAction(result["data"]);

      action.setIsAllocationsLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsAllocationsLoadingAction();
  }),
  updateAllocationThunk: thunk(async (action, data) => {
    action.setIsAllocationsLoadingAction();

    try {
      let result = await updateAllocationData(data);
      if (typeof result["data"] != "undefined")
        action.updateAllocationAction(result["data"]);

      action.setIsAllocationsLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsAllocationsLoadingAction();
  }),
  deleteAllocationThunk: thunk(async (action, id) => {
    action.setIsAllocationsLoadingAction();

    try {
      let result = await deleteAllocationData(id);
      if (typeof result["data"] != "undefined") action.popAllocationsAction(id); // TODO: check result before popping

      action.setIsAllocationsLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsAllocationsLoadingAction();
  }),
};

export default AllocationStore;
