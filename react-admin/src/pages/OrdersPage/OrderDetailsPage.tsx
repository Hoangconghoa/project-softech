import { CarryOutTwoTone } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosClient } from "../../librarys/AxiosClient";
import moment from "moment";
import CardInfomation from "../../components/CardInfomation";

const OrderDetailsPage = () => {
  const params = useParams();

  const { id } = params;
  console.log(id);
  const getOrder = async () => {
    return axiosClient.get(`/v1/orders/${id}`);
  };

  const queryOrders = useQuery({
    queryKey: ["orders-detail", id],
    queryFn: getOrder,
  });
  const fmDate = (date: any, format = "DD/MM/YYYY HH:mm:ss") =>
    moment(date).format(format);
  console.log(queryOrders.data?.data.data);
  return (
    <div>
      <div>Oder Details: #{id} </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CardInfomation
          icon={<CarryOutTwoTone />}
          name="Order Create At"
          value={fmDate(queryOrders.data?.data.data.orderDate, "DD/MM/YYYY")}
        />
        <CardInfomation
          icon={<CarryOutTwoTone />}
          name="Order Create At"
          value={fmDate(queryOrders.data?.data.data.orderDate, "DD/MM/YYYY")}
        />
        <CardInfomation
          icon={<CarryOutTwoTone />}
          name="Order Create At"
          value={fmDate(queryOrders.data?.data.data.orderDate, "DD/MM/YYYY")}
        />
        <CardInfomation
          icon={<CarryOutTwoTone />}
          name="Order Create At"
          value={fmDate(queryOrders.data?.data.data.orderDate, "DD/MM/YYYY")}
        />
      </div>
    </div>
  );
};

export default OrderDetailsPage;
