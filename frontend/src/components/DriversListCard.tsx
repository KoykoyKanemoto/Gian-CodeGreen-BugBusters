import { useNavigate } from "react-router-dom";

interface DriverProps {
  firstname: string;
  lastname: string;
  email: string;
  sex: string;
  driver_type: string;
  license_no: string;
  license_exp: string;
}

const DriverListCard = ({
  firstname,
  lastname,
  email,
  sex,
  driver_type,
  license_no,
  license_exp,
}: DriverProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // navigate(`/detail/${id}`);
  };

  return (
    <div
      className="flex flex-col md:flex-row justify-between items-center active:bg-zinc-600 bg-color5 border transition-all hover:bg-[#c2bbb5] border-black p-4 rounded-lg shadow-md cursor-pointer my-1 w-full lg:text-base md:text-sm sm:text-xs text-xxs relative"
      onClick={handleCardClick}
    >
      <div className="flex-1 text-center p-2">
        <span className="font-medium">{firstname}</span>
      </div>
      <div className="flex-1 text-center p-2">
        <span className="font-medium">{lastname}</span>
      </div>
      <div className="flex-1 text-center p-2">
        <span className="font-medium">{email}</span>
      </div>
      <div className="flex-1 text-center p-2">
        <span className="font-medium">{sex}</span>
      </div>
      <div className="flex-1 text-center p-2">
        <span className="font-medium">{driver_type}</span>
      </div>
      <div className="flex-1 text-center p-2">
        <span className="font-medium">{license_no}</span>
      </div>
      <div className="flex-1 text-center p-2">
        <span className="font-medium">{license_exp}</span>
      </div>
    </div>
  );
};

export default DriverListCard;
