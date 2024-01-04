import 'react';
import { useContext, useEffect, useState } from 'react';
import { AdminContext } from './Admin';

function Login() {

  const {context, setContext } = useContext(AdminContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function doLogin () {
    if(email === "" || password === "") {
      return;
    }

    fetch(import.meta.env.VITE_BACKEND_URL + "/Admin/Auth", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
    }).then((res) => {
        if(res.status === 400) {
            return;
        }
        if(res.status === 200) {
          res.text().then((token) => {
            localStorage.setItem('token', token);
            setContext(2);
          })
        }
    })
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token !== null) {
      setContext(2)
    }
  }, [])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="p-10 bg-white rounded-lg shadow-xl">
        <div className="flex flex-col items-center">
          <div className="mb-4 rounded-full bg-gray-300 w-24 h-24 flex items-center justify-center">
            <span className="text-lg font-bold">LOGO</span>
          </div>
          <div className="w-80">
            <label htmlFor="userEmail" className="block text-gray-700">User / Email:</label>
            <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} id="userEmail" name="userEmail" className="w-full px-3 py-2 mb-3 border rounded" />

            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} id="password" name="password" className="w-full px-3 py-2 mb-3 border rounded" />

            <a href="#forgot-password" className="text-sm text-blue-600 hover:underline">Forgotten your password?</a>
            
            <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600" onClick={(e) => { doLogin() }}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login
