import { Button } from "antd";
type Props = {
  title: string;
  icon?: any;
  onClick: any;
};

const PrimaryButton = ({ title, onClick, icon }: Props) => {
  return (
    <Button
      className="flex gap-2 items-center focus:text-blue-500"
      onClick={onClick}
    >
      {icon} {title}
    </Button>
  );
};

export default PrimaryButton;
