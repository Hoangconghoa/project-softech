import { GoSortAsc, GoSortDesc } from "react-icons/go";
import { FaFire } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import PrimaryButton from "../../components/Button/PrimaryButton";
type Props = {
  setSortBy: any;
  setPriceMin: any;
  setPriceMax: any;
  setSortType: any;
};
const Filter = ({
  setSortType,
  setSortBy,
  setPriceMax,
  setPriceMin,
}: Props) => {
  return (
    <div>
      <p className="font-bold mb-3">Mức giá</p>
      <div className="flex gap-3">
        <PrimaryButton
          title="Dưới 15 triệu"
          icon={<GrMoney />}
          onClick={() => {
            setPriceMax(15000000);
            setPriceMin(0);
          }}
        />
        <PrimaryButton
          title="Từ 15 - 30 triệu"
          icon={<GrMoney />}
          onClick={() => {
            setPriceMax(30000000);
            setPriceMin(15000000);
          }}
        />
        <PrimaryButton
          title="Trên 30 triệu"
          icon={<GrMoney />}
          onClick={() => {
            setPriceMax(200000000);
            setPriceMin(30000000);
          }}
        />
        <PrimaryButton
          title="Tất cả"
          onClick={() => {
            setPriceMax(200000000);
            setPriceMin(0);
          }}
        />
      </div>
      <p className="my-3 font-bold">Sắp xếp theo</p>
      <div className="flex gap-3">
        <PrimaryButton
          title="Giá tăng dần"
          icon={<GoSortAsc />}
          onClick={() => {
            setSortType("ASC");
            setSortBy("price");
            setPriceMax(null);
          }}
        />
        <PrimaryButton
          title="Giá giảm dần"
          icon={<GoSortDesc />}
          onClick={() => {
            setSortType("DESC");
            setSortBy("price");
            setPriceMax(null);
          }}
        />
        <PrimaryButton
          title="Khuyến mãi hot"
          icon={<FaFire />}
          onClick={() => {
            setSortBy("discount");
            setSortType("DESC");
            setPriceMax(null);
          }}
        />
      </div>
    </div>
  );
};

export default Filter;
