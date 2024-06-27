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
import { AiOutlineBell, AiOutlineBars } from "react-icons/ai";

import UserInfo from "../Useinfo";
import Search from "antd/es/input/Search";
const { Header, Footer, Sider, Content } = Layout;
import {} from "../../../public/images/vn.png";
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
  getItem("Orders", "Orders", <FileOutlined />),
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
      <Layout
        style={{
          marginLeft: 200,
        }}
      >
        <Header
          style={{
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AiOutlineBars size={25} />
          <Search placeholder="search" style={{ width: 400 }} enterButton />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "40px",
            }}
          >
            <img
              src="../../../public/images/vn.png"
              width={40}
              height={25}
              alt="vn"
            />
            <AiOutlineBell size={"25px"} />
            <UserInfo />
          </div>
        </Header>

        <Content
          style={{
            margin: "16px",
            padding: 16,
            minHeight: 280,
            background: colorBgContainer,
            overflow: "initial",
            marginBottom: "50px",
          }}
        >
          <Outlet />
        </Content>
        <Footer
        // style={{
        //   textAlign: "center",
        //   position: "fixed",
        //   left: 0,
        //   right: 0,
        //   bottom: 0,
        // }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant DAU
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
