import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './redux/authSlice.js';

const Login = () => {
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(loginUser({ emailOrUsername, password }))
            .unwrap()
            .then((res) => {
                localStorage.setItem('token', res.token);
                navigate('/');
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
                setError(err);
            });
    };

    return (
        <div className="w-1/3 bg-section dark:bg-section-dark max-w-lg mt-5 p-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4 flex flex-col items-center">
                <div className="w-full">
                    <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email or Username
                    </label>
                    <input
                        id="emailOrUsername"
                        type="email | text"
                        placeholder="Enter your email or username"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-placeholder rounded text-text dark:text-text-dark placeholder-text-placeholder dark:placeholder-text-placeholder-dark
                            focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-secondary-dark placeholder-text-placeholder"
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded text-text dark:text-text-dark placeholder-text-placeholder dark:placeholder-text-placeholder-dark 
                            focus:outline-none focus:ring-2 focus:ring-secondary dark:focus:ring-secondary-dark placeholder-text-placeholder"
                    />
                </div>
                <button
                    type="submit"
                    className="w-1/2 py-2 rounded-lg transition duration-200 cursor-pointer
                        text-text-dark dark:text-text bg-secondary dark:bg-secondary-dark hover:bg-secondary-dark dark:hover:bg-secondary hover:text-text dark:hover:text-text-dark"
                >
                    Login
                </button>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    );
};

export default Login;