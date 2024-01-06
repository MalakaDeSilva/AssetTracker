import React, { useEffect, useState } from "react";

export default function Overview() {
  const userGuidePath = (
    <>
      <h1 class="code-line" data-line-start="0" data-line-end="1">
        <a id="User_Guide_0"></a>User Guide
      </h1>
      <h2 class="code-line" data-line-start="2" data-line-end="3">
        <a id="Start_Application_2"></a>Start Application
      </h2>
      <p class="has-line-data" data-line-start="3" data-line-end="4">
        Execute <code>run.sh</code> shell script.
      </p>
      <h2 class="code-line" data-line-start="5" data-line-end="6">
        <a id="Components_5"></a>Components
      </h2>
      <ul>
        <li class="has-line-data" data-line-start="6" data-line-end="7">
          Employees, Devices, DeviceTypes, DeviceAllocations
        </li>
        <li class="has-line-data" data-line-start="7" data-line-end="8">
          DeviceAllocations is linked with Devices and Employees components.
        </li>
        <li class="has-line-data" data-line-start="8" data-line-end="10">
          DeviceTypes is linked with Devices.
        </li>
      </ul>
      <h3 class="code-line" data-line-start="10" data-line-end="11">
        <a id="Add_New_Device_10"></a>Add New Device
      </h3>
      <ol>
        <li class="has-line-data" data-line-start="11" data-line-end="12">
          Create a DeviceType*.
        </li>
        <li class="has-line-data" data-line-start="12" data-line-end="13">
          Add New Device.
        </li>
        <li class="has-line-data" data-line-start="13" data-line-end="14">
          Select the created DeviceType from the drop down list.
        </li>
        <li class="has-line-data" data-line-start="14" data-line-end="15">
          Add Device details.
        </li>
        <li class="has-line-data" data-line-start="15" data-line-end="17">
          Click Submit.
        </li>
      </ol>
      <h3 class="code-line" data-line-start="17" data-line-end="18">
        <a id="Allocate_a_Device_17"></a>Allocate a Device
      </h3>
      <ol>
        <li class="has-line-data" data-line-start="18" data-line-end="19">
          Create an Employee* (If the employee does not exist already).
        </li>
        <li class="has-line-data" data-line-start="19" data-line-end="20">
          Create a Device* (If the device does not exist already).
        </li>
        <li class="has-line-data" data-line-start="20" data-line-end="21">
          Select the Created Employee from the employees list.
        </li>
        <li class="has-line-data" data-line-start="21" data-line-end="22">
          Select the Employee and Device.
        </li>
        <li class="has-line-data" data-line-start="22" data-line-end="23">
          Click Submit.
        </li>
      </ol>
    </>
  );

  return (
    <div>
      <article style={{ color: "black", width: "fit-content", margin: "auto" }}>
        {userGuidePath}
      </article>
    </div>
  );
}
