import { useNavigate, Link } from "react-router-dom";
import { Button, Checkbox, Form, type FormProps, Input, Image } from "antd";
import useAuth from "../../hooks/useAuth";
import {} from "../../../public/images/backround-login.jpg";

type FieldType = {
  email: string;
  password: string;
  remember?: string;
};

const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log("Success:", values);
    const response = await login(values.email, values.password);
    console.log(response);
    if (response.isAuthenticated) {
      navigate("/");
    }
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div style={{ position: "absolute", top: "300px", left: "300px" }}>
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
          LOGIN USER
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: false, message: "Please input your password!" }]}
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
        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button
            disabled={isLoading}
            loading={isLoading}
            type="primary"
            htmlType="submit"
          >
            {isLoading ? "Submitting" : "Login"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
