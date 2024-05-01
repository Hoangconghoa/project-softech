import { FaGoogle, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
export const Register = () => {
  return (
    <div className="text-center bg-[#3C424E]  w-full h-full ">
      <form
        action=""
        className=" bg-slate-400 w-[400px] h-[500px] p-2 z-1 border-[1px] rounded-md fixed top-[80px] left-[500px]"
      >
        <div className="font-bold text-[30px]">Đăng ký</div>
        <div className="flex flex-col m-5 ">
          <input
            type="text"
            id="Username"
            placeholder="Email or PhoneNumber"
            className="block w-[350px] rounded-md border-0 m-2 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <input
            type="text"
            placeholder="Password"
            className="block w-[350px] rounded-md m-2 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />

          <input
            type="text"
            placeholder="Enter the password"
            className="block w-[350px] m-2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
        <div className="flex gap-2  mx-3 text-[13px]">
          <input type="checkbox" />
          Remember Me
        </div>
        <input
          type="submit"
          className="rounded-md w-full bg-blue-700 text-white font-bold py-2 px-5 mt-10"
          value={"Đăng ký"}
        />
        <div className="mt-8">
          <p>Tiếp tục với </p>
          <div className="flex gap-5 justify-center items-center mt-2">
            <Link
              to={"https://www.facebook.com/profile.php?id=100010200660293"}
            >
              <FaGoogle />
            </Link>
            <Link
              to={"https://www.facebook.com/profile.php?id=100010200660293"}
            >
              {" "}
              <FaFacebook />
            </Link>
            <Link
              to={"https://www.facebook.com/profile.php?id=100010200660293"}
            >
              {" "}
              <FaInstagram />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Register;
