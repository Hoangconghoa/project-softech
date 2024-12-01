import { axiosClient } from "../../librarys/AxiosClient";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Pagination, Popconfirm, Space, Table } from "antd";
import type { TableProps } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { DeleteOutlined } from "@ant-design/icons";
import { TypeOrder } from "../../components/data/type";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";

const OrdersPage = () => {
  const fmDate = (date: any, format = "DD/MM/YYYY HH:mm:ss") =>
    moment(date).format(format);
  // const [messageApi, contextHoder] = message.useMessage();
  const navigate = useNavigate();
  const [param] = useSearchParams();
  const page = param.get("page");
  const limit = param.get("limit");
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 10;
  const getOrders = async (page = 1, limit = 10) => {
    return axiosClient.get(`/v1/orders?page=${page}&limit=${limit}`);
  };
  //lấy danh sách
  const queryOrders = useQuery({
    queryKey: ["orders", int_page, int_limit],
    queryFn: () => getOrders(int_page, int_limit),
  });

  //xoa
  const queryClient = useQueryClient();
  //=========================== FETCH DELETE =================================//
  // Mutations Để xóa danh mục
  const fetchDelete = async (id: string) => {
    return axiosClient.delete("/v1/orders/" + id);
  };
  const deleteMutation = useMutation({
    mutationFn: fetchDelete,
    onSuccess: () => {
      console.log("Xóa order thành công !");
      // messageApi.open({
      //   type: "success",
      //   content: "Delete success !",
      // });
      // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({
        queryKey: ["orders", int_page, int_limit],
      });
    },
    onError: (err) => {
      console.log("Xóa có lỗi !", err);
    },
  });
  const tinhtong = () => {
    queryOrders.data?.data.data.orders.map((order: TypeOrder) => {
      let totalOrder = 0;
      order.orderItems.map((index) => {
        totalOrder += index.price * index.quantity;
      });
      order.total = totalOrder;
    });
  };
  tinhtong();
  const formatCurrency = (amount: any) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const columns: TableProps<TypeOrder>["columns"] = [
    {
      title: "STT",
      key: "stt",
      render: (_, __, index) => (int_page - 1) * int_limit + index + 1,
    },
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <a>#{text}</a>,
    },
    {
      title: "Phone",
      dataIndex: "customerMobile",
      key: "customerMobile",
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => {
        return <span>{fmDate(text, "DD/MM/YYYY")}</span>;
      },
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (text) => {
        return <span>{formatCurrency(text)}</span>;
      },
    },

    {
      title: "PaymentMethod",
      dataIndex: "paymentType",
      key: "paymentType",
    },
    {
      title: "View Details",

      render: (recod) => {
        return (
          <button
            onClick={() => {
              navigate(`/orders/${recod._id}`);
            }}
            style={{
              alignItems: "flex-start",
              backgroundColor: "#556ee6",
              borderRadius: "30px",
              boxShadow: "#6f84ea80 0px 0px 0px 2.4px",
              color: "#fff",
              padding: "4px 8px",
              borderStyle: "solid",
              borderWidth: "1px",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            View Details
          </button>
        );
      },
    },
    {
      title: "Action",
      key: "Action",
      render: (_, recod) => (
        <Space>
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
            <Button danger>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* {contextHoder} */}
      <h2>Orders</h2>
      <div>
        <Button
          type="primary"
          onClick={() => {
            navigate("/orders/add");
          }}
        >
          Tạo mới đơn hàng
        </Button>
      </div>

      {queryOrders.isSuccess ? (
        <div>
          <Table
            pagination={false}
            columns={columns}
            dataSource={queryOrders.data.data.data.orders}
          />

          <div style={{ marginTop: 20 }}>
            <Pagination
              defaultCurrent={int_page}
              total={queryOrders.data.data.data.totalItems}
              showSizeChanger
              defaultPageSize={int_limit}
              showTotal={(total) => `Total ${total} items`}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrdersPage;
