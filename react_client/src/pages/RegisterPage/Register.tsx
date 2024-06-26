import { useNavigate, Link } from "react-router-dom";
import { Button, Checkbox, Form, type FormProps, Input } from "antd";
import useAuth from "../../hooks/useCustomers";
import {} from "../../../public/images/backround-login.jpg";
import { message } from "antd";
type FieldType = {
  email: string;
  password: string;
  phone: string;
  remember?: string;
};

const LoginPage = () => {
  const { register } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const response = await register(
      values.email,
      values.password,
      values.phone
    );
    console.log(response);
    if (response.isAuthenticated) {
      navigate("/login");
    } else {
      messageApi.open({
        type: "error",
        content: `email hoặc sđt đã tồn tại `,
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
    messageApi.open({
      type: "error",
      content: "email hoặc sđt đã tồn tại",
    });
  };
  return (
    <div className="flex justify-center items-center mt-6">
      {contextHolder}

      <Form
        name="basic"
        className="grid grid-cols-1"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 500,
          minWidth: 400,
          // position: "absolute",
          // top: "15%",
          // right: "50px",
          border: "1px solid black",
          padding: "10px 10px",
        }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          className="font-bold"
          wrapperCol={{ offset: 10, span: 16 }}
        >
          <h1
            style={{
              // backgroundColor: "#33B5E6",
              // padding: "10px 25px",
              // textTransform: "uppercase",
              // display: "inline-block",
              // borderRadius: "15px",
              // color: "white",
              fontSize: "25px",
            }}
          >
            Đăng ký
          </h1>
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your Phone!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 6, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 6, span: 16 }}
        >
          Bạn đã có tài khoản?
          <Link to={"/login"} style={{ color: "blue", font: "italy" }}>
            Đăng nhập
          </Link>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button
            style={{
              backgroundColor: "red",
              width: "100%",
            }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
