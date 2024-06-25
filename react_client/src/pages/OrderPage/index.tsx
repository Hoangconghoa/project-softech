import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { axiosClient } from "../../librarys/axiosClient";
import useAuth from "../../hooks/useCustomers";
import { Result } from "antd";
const OrderPage = () => {
  const [status, setStatus] = useState<string>("pending");
  const [dataList, setDataList] = useState<any[]>([]);
  const { user } = useAuth();
  const getOrders = async () => {
    return axiosClient.get(`/v1/orders?customer_id=${user?._id}`);
  };
  //lấy danh sách
  const queryOders = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
  });
  useEffect(() => {
    if (queryOders.data) {
      const filteredOrders = queryOders.data.data.data.orders.filter(
        (order: any) => order.orderStatus === status
      );
      setDataList(filteredOrders);
      console.log("Filtered Orders:", filteredOrders);
    }
  }, [status, queryOders.data]);

  const datalength = dataList.length;
  console.log("order", datalength);
  return (
    <div>
      <div className="my-5 ml-3">
        <button>
          <BiArrowBack />
        </button>
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            setStatus("pending");
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Chờ xác nhận
        </button>
        <button
          onClick={() => {
            setStatus("confirmed");
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Chờ lấy hàng
        </button>
        <button
          onClick={() => {
            setStatus("shipping");
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Chờ giao hàng
        </button>
        <button
          onClick={() => {
            setStatus("finished");
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Hoàn thành
        </button>
      </div>
      <div>
        {datalength > 0 ? (
          <div>
            {dataList.map((c: any) => {
              return (
                <div key={c._id}>
                  <a className="text-blue-400" href="#">
                    #{c._id}
                  </a>
                  {c.orderItems.map((product: any) => {
                    return (
                      <div
                        key={product.product}
                        className="flex gap-3 mx-10 mt-10"
                      >
                        <img
                          src={product.thumb}
                          alt="#"
                          width={100}
                          height={100}
                        />
                        <p>{product.name}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <Result
            title="Bạn chưa có đơn hàng nào ở đây"
            // extra={
            //   <Button type="primary" key="console">
            //     Back
            //   </Button>
            // }
          />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
