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
    </div>
  );
};

export default DashBoardPage;
