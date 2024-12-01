import {
  CarryOutTwoTone,
  ContactsTwoTone,
  MailTwoTone,
  PhoneTwoTone,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { axiosClient } from "../../librarys/AxiosClient";
import moment from "moment";
import CardInfomation from "../../components/CardInfomation";
import { Form, Table, TableProps, message, Select, Button } from "antd";
import config from "../../constants/config";
import { AnyObject } from "antd/es/_util/type";

interface DataType {
  _id: string;
  product: string;
  total: number;
  price: number;
  name: string;
  thumb: string;
  discount: number;
  quantity: number;
}

const EnumOrderStatus = {
  pending: "pending",
  confirmed: "confirmed",
  canceled: "canceled",
  prepareShipping: "prepareShipping",
  shipping: "shipping",
  cancelShipping: "cancelShipping",
  shipped: "shipped",
  pendingPaid: "pendingPaid",
  paid: "paid",
  refund: "refund",
  finished: "finished",
};

const urlImage = config.urlImage;

const OrderDetailsPage = () => {
  const params = useParams();
  const [param] = useSearchParams();
  const page = param.get("page");
  const limit = param.get("limit");
  const int_page = page ? parseInt(page) : 1;
  const int_limit = limit ? parseInt(limit) : 10;
  const { id } = params;
  const [form] = Form.useForm();
  const navigate = useNavigate();
  console.log(id);
  const getOrder = async () => {
    return axiosClient.get(`/v1/orders/${id}`);
  };

  const queryOrders = useQuery({
    queryKey: ["orders-detail", id],
    queryFn: getOrder,
  });
  const customerId = queryOrders.data?.data.data.customer;
  const getCustomer = async () => {
    return axiosClient.get(`/v1/customers/${customerId}`);
  };
  const currentStatus = queryOrders.data?.data.data.orderStatus;
  const onFinish = async (values: AnyObject) => {
    const formData = {
      orderStatus: values.orderStatus,
      orderNote: values.orderNote,
    };
    console.log("Form", formData);
    try {
      await axiosClient.put(`/v1/orders/${id}`, formData);
      message.success("Order status updated successfully");
      navigate("/orders");
    } catch (error) {
      message.error("Failed to update order status");
    }
  };
  const queryCustomer = useQuery({
    queryKey: ["Customers-detail", id],
    queryFn: getCustomer,
  });
  const fmDate = (date: any, format = "DD/MM/YYYY HH:mm:ss") =>
    moment(date).format(format);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "STT",
      key: "stt",
      render: (_, __, index) => (int_page - 1) * int_limit + index + 1,
    },
    {
      title: "ProductImage",
      dataIndex: "thumb",
      key: "thumb",
      render: (text) => {
        return (
          <img
            width={40}
            height={40}
            src={`${urlImage}${text}`}
            alt="productImg"
          />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (text) => {
        return (
          <span
            style={{
              backgroundColor: "#FFC107",
              textAlign: "center",
              padding: "1px 2px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            {text}%
          </span>
        );
      },
    },
  ];
  return (
    <div>
      <div
        style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "10px" }}
      >
        Oder Details: <a href="">#{id} </a>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardInfomation
          icon={<CarryOutTwoTone style={{ fontSize: "30px" }} />}
          name="Order Create At"
          value={fmDate(queryOrders.data?.data.data.orderDate, "DD/MM/YYYY")}
          color="#D1E7DD"
        />
        <CardInfomation
          icon={<ContactsTwoTone style={{ fontSize: "30px" }} />}
          name="Name"
          value={queryOrders.data?.data.data.customerName}
          color="#F8D7DA"
        />
        <CardInfomation
          icon={<MailTwoTone style={{ fontSize: "30px" }} />}
          name="Email"
          value={queryCustomer.data?.data.data.email}
          color="rgb(255,243,205)"
        />
        <CardInfomation
          icon={<PhoneTwoTone style={{ fontSize: "30px" }} />}
          name="Phone"
          value={queryOrders.data?.data.data.customerMobile}
          color="#CFF4FC"
        />
      </div>
      <div
        className="Address"
        style={{
          backgroundColor: "#fff",
          display: "inline",
          color: "#545454",
          borderRadius: "5px",
        }}
      >
        <h2>Address</h2>

        <div style={{ listStyle: "none" }}>
          <p>Province: {queryCustomer.data?.data.data.province}</p>
          <p>District: {queryCustomer.data?.data.data.district}</p>
          <p>Yard: {queryCustomer.data?.data.data.yard}</p>
          <p>Detail: {queryCustomer.data?.data.data.address}</p>
        </div>
      </div>
      <div
        className="Order Summary"
        style={{
          backgroundColor: "#fff",
          display: "inline",
          color: "#545454",
          borderRadius: "5px",
        }}
      >
        <h2>Order Summary</h2>

        {queryOrders.isSuccess ? (
          <>
            <Table
              pagination={false}
              columns={columns}
              dataSource={queryOrders.data.data.data.orderItems}
            />
          </>
        ) : null}
      </div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Status Orders</h2>
          <span
            style={{
              textTransform: "uppercase",
              backgroundColor: "#82B440",
              padding: "5px 10px",
              color: "#fff",
              borderRadius: "10px",
            }}
          >
            {currentStatus}
          </span>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="orderStatus"
            label="Order Status"
            rules={[
              { required: true, message: "Please select an order status" },
            ]}
          >
            <Select
              placeholder="OrderStatus to select"
              options={Object.entries(EnumOrderStatus).map(([key, value]) => {
                return {
                  value: key,
                  label: value,
                };
              })}
            />
          </Form.Item>
          <Form.Item name="orderNote" label="Order Note">
            <textarea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
