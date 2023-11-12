import { Button, Card, Space, Table, Tag, Tooltip, Flex, Spin } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";

export default function Devices() {
  const [scope, setScope] = useState("all");

  const { devices, isDeviceLoading } = useStoreState((state) => state.devices);
  const { getDevicesThunk } = useStoreActions((actions) => actions.devices);

  useEffect(() => {
    getDevicesThunk(scope);
  }, []);

  const columns = [
    {
      title: "Serial No",
      dataIndex: "serialNo",
      key: "serialNo",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Power Adapter",
      dataIndex: "powerAdapter",
      key: "powerAdapter",
      render: (data) => (
        <Tag color={data ? "success" : "error"}>
          {data ? "Included" : "Not Included"}
        </Tag>
      ),
    },
    {
      title: "Bag",
      dataIndex: "bag",
      key: "bag",
      render: (data) => (
        <Tag color={data ? "success" : "error"}>
          {data ? "Included" : "Not Included"}
        </Tag>
      ),
    },
    {
      title: "Type",
      dataIndex: "deviceType",
      key: "deviceType",
      render: (data) => <Space size="middle">{data?.type}</Space>,
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
    },
    {
      title: "Invoice",
      dataIndex: "invoiceNo",
      key: "invoiceNo",
    },
    {
      title: "Availabilty",
      dataIndex: "isAvailable",
      key: "isAvailable",
      render: (data) => (
        <Tag color={data ? "success" : "error"}>
          {data ? "Available" : "Not Available"}
        </Tag>
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
        title="Devices"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <Tooltip title="New Device">
            <Button type="primary">New Device</Button>
          </Tooltip>
        }
      >
        {isDeviceLoading ? (
          <Flex align="center" gap="middle" justify="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <Table columns={columns} dataSource={devices} />
        )}
      </Card>
    </div>
  );
}
