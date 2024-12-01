import { axiosClient } from "../../librarys/AxiosClient";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Pagination, Popconfirm, Space, Table, message } from "antd";
import type { GetProps, TableProps } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOutlined } from "@ant-design/icons";
import { TypeProduct } from "../../components/data/type";
import moment from "moment";
import { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";
type SearchProps = GetProps<typeof Input.Search>;
import { Input } from "antd";
const { Search } = Input;
const ProductsPage = () => {
  const fmDate = (date: any, format = "DD/MM/YYYY HH:mm:ss") =>
    moment(date).format(format);
  const [messageApi, contextHoder] = message.useMessage();
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const page = param.get("page");
  const limit = param.get("limit");
  //Phân trang
  const [sortType, setSortType] = useState("DESC");
  const [sortBy, setSortBy] = useState("createdAt");
  const [discount, setDiscount] = useState<number>(0);
  const [int_page, setInt_page] = useState(page ? parseInt(page) : 1);
  const [int_limit, setInt_limit] = useState(limit ? parseInt(limit) : 10);
  const [keyword, setKeyword] = useState<string>("");
  const queryClient = useQueryClient();

  const getProducts = async (page = 1, limit = 10) => {
    return axiosClient.get(
      `/v1/products?page=${page}&limit=${limit}&keyword=${keyword}&sortBy=${sortBy}&sortType=${sortType}&discount_min=${discount}&discount_max=99`
    );
  };
  //Lấy tất cả các sản phẩm ra
  const queryProducts = useQuery({
    queryKey: [
      "products",
      int_page,
      int_limit,
      sortBy,
      sortType,
      discount,
      keyword,
    ],
    queryFn: () => getProducts(int_page, int_limit),
  });
  useEffect(() => {
    getProducts(int_page, int_limit);
  }, [int_page, int_limit]);
  //xoa

  //=========================== FETCH DELETE =================================//
  // Mutations Để xóa danh mục
  const fetchDelete = async (id: string) => {
    return axiosClient.delete("/v1/products/" + id);
  };
  const deleteMutation = useMutation({
    mutationFn: fetchDelete,
    onSuccess: () => {
      console.log("Xóa product thành công !");
      messageApi.open({
        type: "success",
        content: "Delete success !",
      });
      // Làm mới lại danh sách danh mục dựa trên key đã định nghĩa
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
  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const columns: TableProps<TypeProduct>["columns"] = [
    {
      title: "STT",
      key: "stt",
      render: (_, __, index) => (int_page - 1) * int_limit + index + 1,
    },
    {
      title: "Name",
      dataIndex: "productName",
      key: "productName",
      render: (text) => (
        <p
          style={{
            width: "150px",
            color: "blue",
            cursor: "pointer",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "2",
          }}
        >
          {text}
        </p>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{formatCurrency(text)}</span>;
      },
    },
    {
      title: "Thumb",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (text) => {
        return <img height={60} src={`http://localhost:8080/${text}`} />;
      },
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
      title: "Active",
      dataIndex: "isActive",
      key: "isActive",
      render: (text) => {
        return <span>{text === true ? "Enable" : "Disable"}</span>;
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return <span>{fmDate(text, "DD/MM/YYYY")}</span>;
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
  if (discount > 0) {
    columns.splice(4, 0, {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (text) => {
        return (
          <span
            style={{
              backgroundColor: "red",
              padding: "2px 3px",
              borderRadius: "5px",
              color: "white",
            }}
          >
            {text}%
          </span>
        );
      },
    });
  }
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, " ok", value);
    setKeyword(value);
  };

  return (
    <div>
      {contextHoder}
      <h2 style={{ textAlign: "center" }}>Danh sách sản phẩm</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            navigate("/products/add");
          }}
        >
          Thêm sản phẩm mới
        </Button>
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <Search
            placeholder="Nhập tên sản phẩm cần tìm"
            onSearch={onSearch}
            enterButton
            onChange={(e) => {
              setKeyword(e.target.value);
            }}
            style={{ width: "250px" }}
          />
          <FilterProduct
            setDiscount={setDiscount}
            setSortBy={setSortBy}
            setSortType={setSortType}
          />
        </div>
      </div>

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
              onChange={(page, limit) => {
                setInt_page(page);
                setInt_limit(limit);
              }}
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
