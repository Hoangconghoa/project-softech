import { axiosClient } from "../../librarys/AxiosClient";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Pagination, Popconfirm, Space, Table, message } from "antd";
import type { TableProps } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOutlined } from "@ant-design/icons";
const ProductsPage = () => {
  interface DataType {
    _id: string;
    productName: string;
    category: string;
    price: number;
    sort: number;
    isActive: boolean;
  }
  const [messageApi, contextHoder] = message.useMessage();
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
  //xoa
  const queryClient = useQueryClient();
  //=========================== FETCH DELETE =================================//
  // Mutations Để xóa danh mục
  const fetchDelete = async (id: string) => {
    return axiosClient.delete("/v1/products/" + id);
  };
  const deleteMutation = useMutation({
    mutationFn: fetchDelete,
    onSuccess: () => {
      console.log("Xóa category thành công !");
      messageApi.open({
        type: "success",
        content: "Delete success !",
      });
      // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({
        queryKey: ["products", int_page, int_limit],
      });
    },
    onError: (err) => {
      console.log("Xóa có lỗi !", err);
      //msgError('Xóa Product không thành công !');
      messageApi.open({
        type: "error",
        content: "Delete fail !",
      });
    },
  });

  const columns: TableProps<DataType>["columns"] = [
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
      render: (text, recod) => {
        return <span>{recod.isActive ? "Enable" : "Disable"}</span>;
      },
    },
    {
      title: "Action",
      key: "Action",
      render: (_, recod) => (
        <Space>
          <Button
            type="dashed"
            onClick={() => {
              navigate(`/products/${recod._id}`);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => {
              console.log("DELETE", recod);
              deleteMutation.mutate(recod._id as string);
            }}
            onCancel={() => {}}
            okText="Đồng ý"
            okType="danger"
            cancelText="Đóng"
          >
            <Button type="dashed">
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {contextHoder}
      <h2>Product List</h2>
      <Button
        type="primary"
        onClick={() => {
          navigate("/products/add");
        }}
      >
        Create new Product
      </Button>
      {queryProducts.isSuccess ? (
        <>
          <Table
            pagination={false}
            columns={columns}
            dataSource={queryProducts.data.data.data.products}
          />
          <div style={{ marginTop: 20 }}>
            <Pagination
              defaultCurrent={int_page}
              total={queryProducts.data.data.data.totalItems}
              showSizeChanger
              defaultPageSize={int_limit}
              showTotal={(total) => `Total ${total} items`}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ProductsPage;
