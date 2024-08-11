import { Link, useNavigate } from "react-router-dom";
import { useState, ChangeEvent, FormEvent } from "react";
import { Credentials } from "../../../types/types";
import { loginAccount } from "../../Utility/api";
import { useAuth } from "../context/AuthContext"


const Login: React.FC = () => {
  const registerRoute: string = '/register';
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState<string>('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();


  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await loginAccount(credentials);
      if (response.success) {
        //Redirect user to profile
        navigate('/profile');
        setIsLoggedIn(true);
      }
      setErrorMsg(response.message)
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <>
      <div className="bg-white h-screen flex justify-center items-center p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-xl flex flex-col border border-slate-700 rounded-lg p-8 w-full max-w-md"
        >
          <div className="mb-4">
            <label className="mb-2 text-gray-700" htmlFor="formBasicEmail">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="formBasicEmail"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 text-gray-700" htmlFor="formBasicPassword">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="formBasicPassword"
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-2"
            type="submit"
          >
            Login
          </button>

          {errorMsg && (
            <div className="text-red-500 font-semibold text-center">{errorMsg}</div>
          )}

          <p className="text-gray-600 text-center">
            Don't have an account?{" "}
            <Link to={registerRoute} className="text-blue-500 hover:text-blue-900 underline">
              Register New Account
            </Link>
          </p>
        </form>
      </div>
    </>

  );
}

export default Login;