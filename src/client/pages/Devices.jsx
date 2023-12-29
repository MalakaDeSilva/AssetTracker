import {
  Button,
  Card,
  Space,
  Table,
  Tag,
  Tooltip,
  Flex,
  Spin,
  Modal,
  Breadcrumb,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import AddUpdateDevice from "./AddUpdateDevice";
import { Link } from "react-router-dom";

export default function Devices() {
  const [scope, setScope] = useState("all");
  const [action, setAction] = useState("");
  const [device, setDevice] = useState({});

  const { devices, isDeviceLoading } = useStoreState((state) => state.devices);
  const { getDevicesThunk, actionDrawer, deleteDeviceThunk } = useStoreActions(
    (actions) => actions.devices
  );

  const { confirm } = Modal;

  useEffect(() => {
    getDevicesThunk(scope);
  }, []);

  const showConfirm = (record) => {
    confirm({
      title: "Do you Want to delete this item?",
      icon: <ExclamationCircleFilled />,
      content: "",
      async onOk() {
        await deleteDeviceThunk(record?.serialNo);
        getDevicesThunk("all");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

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
      render: (data) => <Space size="small">{data?.type}</Space>,
    },
    {
      title: "Warranty",
      dataIndex: "warranty",
      key: "warranty",
      render: (data) => (
        <Tag color={data ? "success" : "error"}>{data ? "Yes" : "No"}</Tag>
      ),
    },
    {
      title: "Warranty Period",
      dataIndex: "warrantyPeriod",
      key: "warrantyPeriod",
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
              setDevice(record);
              actionDrawer();
            }}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={() => showConfirm(record)}
          ></Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div
        style={{
          margin: "15px 25px 5px 25px",
        }}
      >
        <Breadcrumb
          items={[
            {
              title: <Link to={"/"}>Home</Link>,
            },
            {
              title: <Link to={"/devices"} className="breadcrumb-active">Devices</Link>,
            },
          ]}
        />
      </div>
      <AddUpdateDevice action={action} device={device} />
      <Card
        title="Devices"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <Tooltip title="New Device">
            <Button
              type="primary"
              onClick={() => {
                setAction("ADD");
                setDevice({});
                actionDrawer();
              }}
            >
              New Device
            </Button>
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
