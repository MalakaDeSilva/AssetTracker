import { Button, Card, Space, Table, Tag, Tooltip } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import AddUpdateDeviceAllocation from "./AddUpdateDeviceAllocation";

export default function Allocations() {
  const { state } = useLocation();
  const [employee, setEmployee] = useState({});
  const [scope, setScope] = useState("all");
  const { getAllocationsThunk, actionDrawer } = useStoreActions(
    (actions) => actions.allocations
  );
  const { isAllocationsLoading, allocations } = useStoreState(
    (state) => state.allocations
  );

  useEffect(() => {
    setEmployee(state?.employee);
    getAllocationsThunk(scope);
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
  ];

  return (
    <div>
      <Card
        title={`Device Allocations ${employee?.firstName ? " : "+ employee?.firstName : ""} ${employee?.lastName ? employee?.lastName : ""}`}
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <Tooltip title="New Device Allocation">
            <Button type="primary" onClick={actionDrawer}>
              New Device Allocation
            </Button>
          </Tooltip>
        }
      >
        <AddUpdateDeviceAllocation action={"ADD"} />
        <Table columns={columns} dataSource={allocations} />
      </Card>
    </div>
  );
}
