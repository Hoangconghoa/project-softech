import { Button, Result } from "antd";
import { Link } from "react-router-dom";

const Successfully = () => {
  return (
    <div>
      {" "}
      <Result
        status="success"
        title="Đơn hàng của bạn đã được đặt và đang chờ xác nhận!"
        subTitle="Order number: 2017182818828182881 ."
        extra={[
          <Button type="primary" key="console">
            <Link to={"/"}>Quay lại trang chủ</Link>
          </Button>,
          <Button key="buy">
            <Link to={"/order"}>Xem đơn hàng của bạn</Link>{" "}
          </Button>,
        ]}
      />
    </div>
  );
};

export default Successfully;
