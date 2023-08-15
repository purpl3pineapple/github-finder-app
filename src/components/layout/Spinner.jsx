import spinner from "../../assets/spinner.gif";

const Spinner = () => {
  return (
    <div className="w-100 mt-20">
        <img 
            alt="Loading..."
            src={spinner}
            className="text-center mx-auto"
            width={180}
        />
    </div>
  );
};

export default Spinner;
