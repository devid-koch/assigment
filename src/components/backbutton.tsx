import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function BackButton({ link }: { link?: string }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (link) {
      navigate(link);
    } else {
      navigate(-1);
    }
  };

  return (
    <button onClick={ handleBack }>
      <IoIosArrowBack />
      Back
    </button>
  );
}
