import { Select, SelectProps } from "antd";
type Props = {
  setSortType: any;

  setDiscount: any;
  setSortBy: any;
};
const FilterProduct = ({ setDiscount, setSortType, setSortBy }: Props) => {
  const onChangeHander = (value: string) => {
    switch (value) {
      case "ASC":
        setSortType("1");
        setSortBy("price");
        setDiscount(0);
        break;
      case "DESC":
        setSortType("DESC");
        setSortBy("price");
        setDiscount(0);
        break;
      case "createdAt":
        setSortBy("createdAt");
        setSortType("DESC");
        setDiscount(0);
        break;
      case "sale":
        setDiscount(1);
        break;
      default:
        break;
    }
  };
  const options: SelectProps["options"] = [
    {
      label: "Giá tăng dần",
      value: "ASC",
    },
    {
      label: "Giá giảm dần",
      value: "DESC",
    },
    {
      label: "Mới nhất",
      value: "createdAt",
    },
    { label: "Sản phẩm Sale", value: "sale" },
  ];
  return (
    <div>
      <Select
        onChange={onChangeHander}
        style={{ width: "150px" }}
        defaultValue="createdAt"
        options={options}
      />
    </div>
  );
};

export default FilterProduct;
