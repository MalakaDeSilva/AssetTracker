import "./App.css";
import EmployeeStore from "./stores/EmployeeStore";
import { StoreProvider, createStore } from "easy-peasy";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employees from "./pages/Employees";
import SideBar from "./common/SideBar";
import DeviceStore from "./stores/DeviceStore";
import Devices from "./pages/Devices";
import DeviceTypeStore from "./stores/DeviceTypeStore";
import DeviceTypes from "./pages/DeviceTypes";
import AllocationStore from "./stores/AllocationStore";
import Allocations from "./pages/Allocations";

const globalStore = {
  employees: EmployeeStore,
  devices: DeviceStore,
  deviceTypes: DeviceTypeStore,
  allocations: AllocationStore,
};

const store = createStore(globalStore);

function App() {
  return (
    <StoreProvider store={store}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<SideBar />}>
              <Route path="/employees" element={<Employees />} />
              <Route path="/devices" element={<Devices />} />
              <Route path="/device-types" element={<DeviceTypes />} />
              <Route path="/allocations" element={<Allocations />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </StoreProvider>
  );
}

export default App;
