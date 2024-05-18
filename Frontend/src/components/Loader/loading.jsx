import HashLoader from "react-spinners/HashLoader";

const loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <HashLoader color="#0067FF" />
    </div>
  );
};
export default loading;
