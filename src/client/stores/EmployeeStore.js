import { action, computed, thunk } from "easy-peasy";
import {
  getEmployeeData,
  addEmployeeData,
  updateEmployeeData,
  deleteEmployeeData,
  getEmployeeDataById,
} from "../services/EmployeeService";

const EmployeeStore = {
  /* states */
  isEmpLoading: false,
  employees: [],
  error: "",
  drawerVisible: false,
  employeeCount: computed((state) => state.employees.length),

  /* actions */
  setIsEmpLoadingAction: action((state) => {
    state.isEmpLoading = !state.isEmpLoading;
  }),
  setErrorAction: action((state, error) => {
    state.error = error;
  }),
  setEmployeesAction: action((state, employees) => {
    state.employees = employees;
    state.employeeCount = employees.length;
  }),
  pushEmployeesAction: action((state, employee) => {
    state.employees.push(employee);
  }),
  popEmployeesAction: action((state, _id) => {
    state.employees = state.employees.filter(
      (employee) => employee._id !== _id
    );
  }),
  updateEmployeeAction: action((state, employee) => {
    state.employees = state.employees.map((emp) => {
      if (emp["id"] === employee["id"]) {
        emp = employee;
      }

      return emp;
    });
  }),
  actionDrawer: action((state) => {
    state.drawerVisible = !state.drawerVisible;
  }),

  /* thunks */
  getEmployeesThunk: thunk(async (action, scope) => {
    action.setIsEmpLoadingAction();

    try {
      scope = scope ? scope : "n";
      let { data } = await getEmployeeData(scope);
      action.setEmployeesAction(
        data.map((v, i) => {
          return {
            ...v,
            key: v.coreId,
          };
        })
      );
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsEmpLoadingAction();
  }),
  getEmployeesByIdThunk: thunk(async (action, id, scope) => {
    action.setIsEmpLoadingAction();

    try {
      scope = scope ? scope : "n";
      let { data } = await getEmployeeDataById(id, scope);
      action.setEmployeesAction(
        data.map((v, i) => {
          return {
            ...v,
            key: v.id,
          };
        })
      );
    } catch (e) {
      action.setErrorAction(e.message);
    }

    action.setIsEmpLoadingAction();
  }),
  addEmployeeThunk: thunk(async (action, data) => {
    action.setIsEmpLoadingAction();

    try {
      let result = await addEmployeeData(data);
      if (typeof result["data"]["createdEmployee"] != "undefined")
        action.pushEmployeesAction(result["data"]["createdEmployee"]);

      action.setIsEmpLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsEmpLoadingAction();
  }),
  updateEmployeeThunk: thunk(async (action, data) => {
    action.setIsEmpLoadingAction();

    try {
      let result = await updateEmployeeData(data);
      if (typeof result["data"]["updatedEmployee"] != "undefined")
        action.updateEmployeeAction(result["data"]["updatedEmployee"]);

      action.setIsEmpLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsEmpLoadingAction();
  }),
  deleteEmployeeThunk: thunk(async (action, id) => {
    action.setIsEmpLoadingAction();

    try {
      let result = await deleteEmployeeData(id);
      if (typeof result["data"]["deletedEmployee"] != "undefined")
        action.popEmployeesAction(id); // TODO: check result before popping

      action.setIsEmpLoadingAction();
      return result;
    } catch (e) {
      action.setErrorAction(e.message);
    }
    action.setIsEmpLoadingAction();
  }),
};

export default EmployeeStore;
