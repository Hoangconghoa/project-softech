import { axiosClient } from "../../librarys/AxiosClient";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button, Pagination, Popconfirm, Space, Table, message } from "antd";
import type { TableProps } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DeleteOutlined } from "@ant-design/icons";

import moment from "moment";

const OrdersPage = () => {
  interface DataOderdetail {
    product: string;
    quantity: number;
    price: number;
    discount: number;
  }
  interface Dataaction {
    staff: { _id: string; email: string };
    action: string;
    orderStatus: string;
    note: string;
  }
  interface DataType {
    _id: string;
    orderDate: string;
    orderStatus: string;
    paymentType: string;
    customer: string;
    orderItems: DataOderdetail[];
    action: Dataaction[];
    time: string;
    total: number;
  }
  const fmDate = (date: any, format = "DD/MM/YYYY HH:mm:ss") =>
    moment(date).format(format);
  const [messageApi, contextHoder] = message.useMessage();
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
  const queryOders = useQuery({
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
  const tinhtong = () => {
    queryOders.data?.data.data.orders.map((order: DataType) => {
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
  const sum = () => {
    let sumTotal = 0;
    queryOders.data?.data.data.orders.map((order: DataType) => {
      sumTotal += order.total;
    });
    return sumTotal;
  };
  const columns: TableProps<DataType>["columns"] = [
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
      title: "customer",
      dataIndex: "customer",
      key: "customer",
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "Date",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (recod) => {
        return <span>{fmDate(recod.orderDate, "DD/MM/YYYY")}</span>;
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
    {
      title: "total",
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

      render: () => {
        return (
          <button
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
          <Button
            type="dashed"
            onClick={() => {
              navigate(`/orders/${recod._id}`);
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
      <h2>Orders</h2>
      <Button
        type="primary"
        onClick={() => {
          navigate("/orders/add");
        }}
      >
        Create new order
      </Button>
      {queryOders.isSuccess ? (
        <div>
          <Table
            pagination={false}
            columns={columns}
            dataSource={queryOders.data.data.data.orders}
          />
          <div
            style={{
              display: "flex",
              gap: "653px",
              marginLeft: "15px",
            }}
          >
            <p>Sum</p>
            <p>{formatCurrency(sum())}</p>
          </div>
          <div style={{ marginTop: 20 }}>
            <Pagination
              defaultCurrent={int_page}
              total={queryOders.data.data.data.totalItems}
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
