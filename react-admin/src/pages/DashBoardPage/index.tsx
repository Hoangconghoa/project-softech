import { axiosClient } from "../../librarys/AxiosClient";
import { useQuery } from "@tanstack/react-query";
import type { TableProps } from "antd";
import { Button, Space, Table } from "antd";

import { useNavigate, useSearchParams } from "react-router-dom";

interface DataType {
  _id: string;
  categoryName: string;
  description: string;
  slug: string;
  sort: number;
  isActive: boolean;
  productList: [];
  quantity: number;
}

const DashBoardPage = () => {
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const page = param.get("page");
  const limit = param.get("limit");
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 10;
  const getProducts = async (page = 1, limit = 10) => {
    return axiosClient.get(`/v1/products?page=${page}&limit=${limit}`);
  };
  //lấy danh sách
  const queryProducts = useQuery({
    queryKey: ["products", int_page, int_limit],
    queryFn: () => getProducts(int_page, int_limit),
  });
  const fecthCount = async () => {
    return axiosClient.get("/v1/count");
  };
  const queryCategory = useQuery({
    queryKey: ["categories"],
    queryFn: () => fecthCount(),
  });
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      key: "stt",
      render: (_, __, index) => (int_page - 1) * int_limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, recod) => {
        return <span>{recod?.productList.length}</span>;
      },
    },
    {
      title: "Action",
      key: "Action",
      render: (text) => (
        <Space>
          <Button
            type="dashed"
            onClick={() => {
              navigate(`/categories/${text._id}`);
            }}
          >
            Show
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        pagination={false}
        columns={columns}
        dataSource={queryCategory.data?.data.data}
      />
      <div
        style={{
          display: "flex",
          gap: "565px",
          marginLeft: "15px",
        }}
      >
        <p>Sum</p>
        <p>{queryProducts.data?.data.data.totalItems}</p>
      </div>
    </div>
  );
};

export default DashBoardPage;
