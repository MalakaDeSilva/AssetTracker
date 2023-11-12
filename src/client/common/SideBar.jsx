import { Layout, Menu } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  LaptopOutlined,
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
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
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
          <SubMenu key="sub2" icon={<LaptopOutlined />} title="Payroll">
            <Menu.Item key="6">
              <Link to="/devices">Devices</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/allocations">Device Allocations</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/device-types">Device Types</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout style={{ minHeight: "100vh" }}>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default SideBar;
