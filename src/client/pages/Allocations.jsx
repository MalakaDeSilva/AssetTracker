import { Button, Card, Space, Table, Tag, Tooltip } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";

export default function Allocations() {
  const [scope, setScope] = useState("all");
  const { getAllocationsThunk } = useStoreActions(
    (actions) => actions.allocations
  );
  const { isAllocationsLoading, allocations } = useStoreState(
    (state) => state.allocations
  );

  useEffect(() => {
    getAllocationsThunk(scope);
  }, []);

  let columns = [
    {
      title: "Device",
      dataIndex: "device",
      key: "device",
      render: (data) => (
        <Space size={"middle"}>
          <Tooltip title={data?.serialNo}>{data?.id}</Tooltip>
        </Space>
      ),
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
          {data ? new Date(data).toLocaleDateString() : ""}
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
        title="Device Allocations"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <Tooltip title="New Device Allocation">
            <Button type="primary">New Device Allocation</Button>
          </Tooltip>
        }
      >
        <Table columns={columns} dataSource={allocations} />
      </Card>
    </div>
  );
}
