import {
  Button,
  Card,
  Space,
  Table,
  Tag,
  Tooltip,
  Select,
  Breadcrumb,
} from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";

import AddUpdateDeviceAllocation from "./AddUpdateDeviceAllocation";

export default function Allocations() {
  const { state } = useLocation();
  const [employee, setEmployee] = useState(null);
  const [action, setAction] = useState("");
  const [allocation, setAllocation] = useState({});
  const [items, setItems] = useState([]);

  const { getAllocationsThunk, actionDrawer } = useStoreActions(
    (actions) => actions.allocations
  );
  const { isAllocationsLoading, allocations } = useStoreState(
    (state) => state.allocations
  );
  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);
  const { employees } = useStoreState((state) => state.employees);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });

  useEffect(() => {
    getEmployeesThunk();
    setEmployee(state?.employee);
    if (state?.employee) {
      getAllocationsThunk({ all: "y", employeeId: state?.employee?.coreId });
      setItems([
        {
          title: <Link to={"/"}>Home</Link>,
        },
        {
          title: <Link to={"/employees"}>Employees</Link>,
        },
        {
          title: <Link to={"/allocations"} className="breadcrumb-active">Device Allocations</Link>,
        },
      ]);
    } else {
      getAllocationsThunk({ all: "y" });
      setItems([
        {
          title: <Link to={"/"}>Home</Link>,
        },
        {
          title: <Link to={"/allocations"} className="breadcrumb-active">Device Allocations</Link>,
        },
      ]);
    }
  }, []);

  let columns = [
    {
      title: "Device",
      dataIndex: "deviceId",
      key: "deviceId",
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      render: (data) => (
        <Space size={"middle"}>
          <Tooltip title={data?.firstName + " " + data?.lastName}>
            {data?.coreId}
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Handed On",
      dataIndex: "handedOn",
      key: "handedOn",
      render: (data) => (
        <Space size="middle">{new Date(data).toLocaleDateString()}</Space>
      ),
    },
    {
      title: "Has Returned",
      dataIndex: "hasReturned",
      key: "hasReturned",
      render: (data) => (
        <Tag color={data ? "success" : "error"}>
          {data ? "Returned" : "Not Returned"}
        </Tag>
      ),
    },
    {
      title: "Returned On",
      dataIndex: "returnedOn",
      key: "returnedOn",
      render: (data) => (
        <Space size="middle">
          {data ? new Date(data).toLocaleDateString() : "N/A"}
        </Space>
      ),
    },
    {
      title: "Handed Over By",
      dataIndex: "authorizedBy",
      key: "authorizedBy",
      render: (data) => (
        <Space size={"middle"}>
          <Tooltip title={data?.firstName + " " + data?.lastName}>
            {data?.coreId}
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            shape="circle"
            onClick={() => {
              setAction("UPDATE");
              setAllocation(record);
              actionDrawer();
            }}
          ></Button>
        </Space>
      ),
    },
  ];

  const filter = (value) => {
    if (value)
      getAllocationsThunk({
        all: "y",
        employeeId: value,
      });
    else getAllocationsThunk({ all: "y" });
  };

  return (
    <div>
      <div
        style={{
          margin: "15px 25px 5px 25px",
        }}
      >
        <Breadcrumb items={items} />
      </div>
      <Card
        title={`Device Allocations`}
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <>
            <Select
              allowClear
              showSearch
              style={{
                width: 200,
                marginRight: 10,
              }}
              placeholder="Select Employee"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option?.label ?? "").toLowerCase().includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={[
                ...employees.map((emp) => ({
                  value: `${emp.coreId}`,
                  label: `${emp.firstName} ${emp.lastName}`,
                })),
              ]}
              defaultValue={state?.employee?.coreId}
              onChange={filter}
            />
            <Tooltip title="New Device Allocation">
              <Button
                type="primary"
                onClick={() => {
                  setAction("ADD");
                  actionDrawer();
                }}
              >
                New Device Allocation
              </Button>
            </Tooltip>
          </>
        }
      >
        <AddUpdateDeviceAllocation
          action={action}
          employee={employee}
          allocation={allocation}
        />
        <Table
          columns={columns}
          dataSource={allocations}
          pagination={tableParams.pagination}
        />
      </Card>
    </div>
  );
}
