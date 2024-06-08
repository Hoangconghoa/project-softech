import { Form, Input, type FormProps, Button, message } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../../librarys/AxiosClient";
import { useNavigate } from "react-router-dom";

import moment from "moment";
import { useEffect } from "react";

interface DataOderdetail {
  productName: string;
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
  total: string;
  paymentType: string;
  customerName: string;
  customerPhone: string;
  address: string;
  orderItems: DataOderdetail[];
  action: Dataaction[];
}
const OrderAddPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const [updateFormEdit] = Form.useForm();

  const queryClient = useQueryClient();
  const fetchCreate = async (formData: DataType) => {
    console.log(formData);
    return axiosClient.post("/v1/orders", formData);
  };

  const mutationCreate = useMutation({
    mutationFn: fetchCreate,
    onSuccess: () => {
      console.log("Create success !");
      messageApi.open({
        type: "success",
        content: "Create success !",
      });
      // Làm tươi lại danh sách danh mục dựa trên key đã định nghĩa
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      //
      updateFormEdit.resetFields();
    },
    onError: () => {
      //khi gọi API bị lỗi
      messageApi.open({
        type: "error",
        content: "Create error !",
      });
    },
  });

  const onFinish: FormProps<DataType>["onFinish"] = (values) => {
    console.log("Success:", values);
    mutationCreate.mutate(values);
  };

  const onFinishFailed: FormProps<DataType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    updateFormEdit.setFieldsValue({
      orderDate: moment().format("YYYY-MM-DD HH:mm:ss"),
    });
  }, [updateFormEdit]);
  return (
    <div>
      {contextHolder}
      <h1>orderAddPage</h1>
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
            navigate("/orders");
          }}
        >
          orders List
        </Button>
      </div>
      {/* orderDate: string;
    orderStatus: string;
    total: string;
    paymentType: string;
    customerName: string;
    orderItems: DataOderdetail[];
    action: Dataaction[]; */}
      <Form
        form={updateFormEdit}
        name="create-form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<DataType>
          label="order Date"
          style={{ display: "none" }}
          name="orderDate"
        >
          <Input type="hidden" />
        </Form.Item>
        <Form.Item<DataType> label="PaymentType" name="paymentType">
          <Input />
        </Form.Item>
        <Form.Item<DataType> label="Customer Name" name="customerName">
          <Input />
        </Form.Item>
        <Form.Item<DataType> label="Phone" name="customerPhone">
          <Input />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          loading={mutationCreate.isPending}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default OrderAddPage;
