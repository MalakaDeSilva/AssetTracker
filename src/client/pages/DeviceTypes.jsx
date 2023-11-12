import { Button, Card, Table, Tooltip } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";

export default function DeviceTypes() {
  const [scope, setScope] = useState("all");

  const { getDeviceTypesThunk } = useStoreActions(
    (actions) => actions.deviceTypes
  );
  const { isDeviceTypeLoading, deviceTypes } = useStoreState(
    (state) => state.deviceTypes
  );

  useEffect(() => {
    getDeviceTypesThunk(scope);
  }, []);

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
  ];

  return (
    <div>
      <Card
        title="Device Types"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <Tooltip title="New Device">
            <Button type="primary">New Device Type</Button>
          </Tooltip>
        }
      >
        <Table columns={columns} dataSource={deviceTypes} />
      </Card>
    </div>
  );
}
