import { Layout, Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  BankOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function SideBar(props) {
  const { Content, Sider } = Layout;
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{ height: "100%", position: "fixed" }}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="">Overview</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Management">
            <Menu.Item key="2">
              <Link to="/employees">Employees</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/users">Users</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<BankOutlined />} title="Payroll">
            <Menu.Item key="6">
              <Link to="/employee-salary">Employee Salary</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/salary-slips">Payslips</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Divider />
          <Menu.Item
            key="8"
            icon={<LogoutOutlined />}
            onClick={(e) => {
              navigate("/login");
            }}
          >
            Log out
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ minHeight: "100vh", marginLeft: "200px" }}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default SideBar;
