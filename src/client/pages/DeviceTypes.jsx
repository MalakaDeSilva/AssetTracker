import { Button, Card, Table, Tooltip, Space, Modal, Breadcrumb } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddUpdateDeviceTypes from "./AddUpdateDeviceTypes";

export default function DeviceTypes() {
  const [scope, setScope] = useState("y");
  const [action, setAction] = useState("");
  const [devType, setDevType] = useState({});

  const { confirm } = Modal;

  const { getDeviceTypesThunk, actionDrawer, deleteDeviceTypeThunk } =
    useStoreActions((actions) => actions.deviceTypes);
  const { isDeviceTypeLoading, deviceTypes } = useStoreState(
    (state) => state.deviceTypes
  );

  useEffect(() => {
    getDeviceTypesThunk(scope);
  }, []);

  const showConfirm = (record) => {
    confirm({
      title: "Do you Want to delete this item?",
      icon: <ExclamationCircleFilled />,
      content: "",
      async onOk() {
        await deleteDeviceTypeThunk(record?.id);
        getDeviceTypesThunk("y");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  let columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {/* <Button
            icon={<EditOutlined />}
            shape="circle"
            onClick={() => {
              setAction("UPDATE");
              setDevType({ ...record, deviceType: record?.type });
              actionDrawer();
            }}
          ></Button> */}
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
              title: <Link to={"/device-types"} className="breadcrumb-active">Device Types</Link>,
            },
          ]}
        />
      </div>
      <AddUpdateDeviceTypes action={action} devType={devType} />
      <Card
        title="Device Types"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <Tooltip title="New Device">
            <Button
              type="primary"
              onClick={() => {
                setAction("ADD");
                setDevType({});
                actionDrawer();
              }}
            >
              New Device Type
            </Button>
          </Tooltip>
        }
      >
        <Table columns={columns} dataSource={deviceTypes} />
      </Card>
    </div>
  );
}
