import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import EmployeeStore from "./stores/EmployeeStore";
import { StoreProvider, createStore } from "easy-peasy";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Employees from "./pages/Employees";
import SideBar from "./common/SideBar";

const globalStore = {
  employees: EmployeeStore,
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
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </StoreProvider>
  );
}

export default App;
