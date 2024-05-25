import { axiosClient } from "../librarys/AxiosClient";
import { useQuery } from "@tanstack/react-query";
import type { TableProps } from "antd";
import { Table } from "antd";
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
  const fecthCount = async () => {
    return axiosClient.get("/v1/count");
  };
  const queryCategory = useQuery({
    queryKey: ["categories"],
    queryFn: () => fecthCount(),
  });
  const columns: TableProps<DataType>["columns"] = [
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
