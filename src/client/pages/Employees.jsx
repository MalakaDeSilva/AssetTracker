import { Button, Card, Flex, Spin, Table, Tooltip } from "antd";
import { useStoreActions, useStoreState } from "easy-peasy";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Employees() {
  const [scope, setScope] = useState("all");
  const navigate = useNavigate();

  const { getEmployeesThunk } = useStoreActions((actions) => actions.employees);
  const { employees, isEmpLoading } = useStoreState((state) => state.employees);

  useEffect(() => {
    getEmployeesThunk(scope);
  }, []);

  let columns = [
    {
      title: "Core ID",
      dataIndex: "coreId",
      key: "coreId",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Floor",
      dataIndex: "floor",
      key: "floor",
    },
  ];

  const onRow = (record, rowIndex) => {
    return {
      onClick: (event) => {
        navigate(`/allocations`, { state: { employee: record } });
      },
    };
  };

  return (
    <div>
      <Card
        title="Employees"
        style={{ margin: "20px", borderRadius: "15px" }}
        extra={
          <Tooltip title="New Employee">
            <Button type="primary">New Employee</Button>
          </Tooltip>
        }
      >
        {isEmpLoading ? (
          <Flex align="center" gap="middle" justify="center">
            <Spin size="large" />
          </Flex>
        ) : (
          <>
            <Table columns={columns} dataSource={employees} onRow={onRow} />
          </>
        )}
      </Card>
    </div>
  );
}
