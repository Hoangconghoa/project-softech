import { useNavigate, Link } from "react-router-dom";
import { Button, Checkbox, Form, type FormProps, Input } from "antd";
import useAuth from "../../hooks/useCustomers";
import {} from "../../../public/images/backround-login.jpg";
import { message } from "antd";
type FieldType = {
  phone: string;
  password: string;
  remember?: string;
};

const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const response = await login(values.phone, values.password);
    console.log(response);
    if (response.isAuthenticated) {
      navigate("/");
    } else {
      messageApi.open({
        type: "error",
        content: "sđt hoặc mật khẩu không đúng",
      });
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = () => {
    messageApi.open({
      type: "error",
      content: "sđt hoặc mật khẩu không đúng",
    });
  };

  return (
    <div>
      {contextHolder}

      <Form
        name="basic"
        className="grid grid-cols-1"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{
          maxWidth: 500,
          minWidth: 400,
          position: "absolute",
          top: "15%",
          right: "50px",
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
          LOGIN USER
        </Form.Item>
        <Form.Item<FieldType>
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your phone!" }]}
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
          Bạn chưa có tài khoản?
          <Link to={"/register"} style={{ color: "blue", font: "italy" }}>
            Đăng ký
          </Link>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button
            disabled={isLoading}
            loading={isLoading}
            type="primary"
            htmlType="submit"
            style={{
              backgroundColor: "red",
              width: "100%",
            }}
          >
            {isLoading ? "Submitting" : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
