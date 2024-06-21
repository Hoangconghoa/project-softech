type TButton = {
  name: string;
  value: string;
  color: string;
  icon: React.ReactNode; //Dấu ? Có thể không cần truyền icon
};

const CardInfomation = ({ icon, name, value, color }: TButton) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          minWidth: "240px",
          backgroundColor: `${color}`,
          borderRadius: "5px",
          padding: "0px 15px",
        }}
      >
        {icon}
        <div>
          <p style={{ fontSize: "16px" }}>{name}</p>
          <p style={{ marginTop: "-15px" }}>{value}</p>
        </div>
      </div>
    </div>
  );
};

export default CardInfomation;
