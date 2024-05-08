import React from "react";
import {
  HomeOutlined,
  UnorderedListOutlined,
  FileOutlined,
  SolutionOutlined,
  UserOutlined,
  SettingFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const items: MenuProps["items"] = [
  getItem("DashBoard", "", <HomeOutlined />),
  getItem("Categories", "Categories", <UnorderedListOutlined />),
  getItem("Brands", "Brands", <UnorderedListOutlined />),
  getItem("Products", "Products", <SolutionOutlined />),
  getItem("Orders", "Orders", <FileOutlined />, [
    getItem("Thông tin đơn hàng", "g1", null),
    getItem("Thanh Toán", "g2", null),
  ]),
  getItem("Staffs", "Staffs", <UserOutlined />),
  getItem("Setting", "Setting", <SettingFilled />),
];

const App: React.FC = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
          onClick={({ key }) => {
            navigate("/" + key.split("-").join("/"));
          }}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content
          style={{
            margin: "16px",
            padding: 16,
            minHeight: 280,
            background: colorBgContainer,
            overflow: "initial",
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
            position: "fixed",
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant DAU
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
