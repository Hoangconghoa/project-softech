import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../librarys/AxiosClient";
import { useParams, useSearchParams } from "react-router-dom";
import { Table, TableProps } from "antd";
import { format } from "date-fns";
interface DataType {
  _id: string;
  productName: string;
  category: { _id: string; categoryName: string };
  price: number;
  sort: number;
  isActive: boolean;
  createdAt: string;
  time: string;
}

const ProductWithCategories = () => {
  const params = useParams();
  const { id } = params;
  console.log(id);
  const [param] = useSearchParams();
  const page = param.get("page");
  const limit = param.get("limit");
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 10;
  const getProduct = async () => {
    return axiosClient.get(`/v1/products?cat_id=${id}`);
  };

  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getProduct,
  });
  let productData = {};
  if (queryProduct.isSuccess) {
    productData = queryProduct.data.data.data;
    //productData.category = productData.category?._id;
    console.log("productData", productData);
  }
  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      key: "stt",
      render: (_, __, index) => (int_page - 1) * int_limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>{formatCurrency(text)}</span>,
    },
    {
      title: "Categories",
      dataIndex: "category",
      key: "category",
      render: (_, recod) => {
        return <span>{recod?.category?.categoryName}</span>;
      },
    },
    {
      title: "Sort",
      dataIndex: "sort",
      key: "sort",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (recod) => {
        return <span>{recod.isActive ? "Enable" : "Disable"}</span>;
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{format(text, "dd-MM-yyyy")}</span>;
      },
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => {
        return <span>{text}</span>;
      },
    },
  ];

  return (
    <div>
      {queryProduct.isSuccess ? (
        <>
          <Table
            pagination={false}
            columns={columns}
            dataSource={queryProduct.data.data.data.products}
          />
        </>
      ) : null}
    </div>
  );
};

export default ProductWithCategories;
