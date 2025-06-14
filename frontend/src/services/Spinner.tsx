import { FaSpinner } from "react-icons/fa";

const Spinner: React.FC = () => {
  return (
    <FaSpinner
      style={{
        animation: "spin 1s linear infinite",
      }}
    />
  );
};

export default Spinner;
