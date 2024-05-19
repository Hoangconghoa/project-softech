import { useNavigate, Link } from "react-router-dom";
import { Button, Checkbox, Form, type FormProps, Input, Image } from "antd";
import useAuth from "../../hooks/useCustomers";
import {} from "../../../public/images/backround-login.jpg";
type FieldType = {
  email: string;
  password: string;
  phone: string;
  address: string;
  remember?: string;
};

const LoginPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const response = await register(
      values.email,
      values.password,
      values.phone,
      values.address
    );
    console.log(response);
    if (response.isAuthenticated) {
      navigate("/login");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <div className="absolute top-[40%] left-[20%]">
        <img src="../../../public/images/backround-login.jpg" alt="" />
      </div>
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
          className="items-center"
          wrapperCol={{ offset: 11, span: 16 }}
        >
          <Image
            src="../../../public/images/Logo_dhktdn.png"
            width={40}
            height={40}
          />
        </Form.Item>
        <Form.Item<FieldType>
          className="font-bold"
          wrapperCol={{ offset: 10, span: 16 }}
        >
          REGISTER USER
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
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your Address!" }]}
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
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
