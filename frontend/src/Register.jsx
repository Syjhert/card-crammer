import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from './redux/authSlice';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        dispatch(registerUser({ username, email, password }))
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

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Registration failed');

            localStorage.setItem('token', data.token);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="w-1/3 bg-section dark:bg-section-dark max-w-lg mt-5 p-10 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
            <form onSubmit={handleSubmit} className="w-full space-y-4 flex flex-col items-center">

                <div className="w-full">
                    <label htmlFor="username" className="block mb-1 text-sm font-medium text-text dark:text-text-dark">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded text-text dark:text-text-dark placeholder-text-placeholder dark:placeholder-text-placeholder-dark
                            focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-text dark:text-text-dark">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded text-text dark:text-text-dark placeholder-text-placeholder dark:placeholder-text-placeholder-dark
                            focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="password" className="block mb-1 text-sm font-medium text-text dark:text-text-dark">
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
                            focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800"
                    />
                </div>

                <div className="w-full">
                    <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-text dark:text-text-dark">
                        Confirm Password
                    </label>
                    <input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded text-text dark:text-text-dark placeholder-text-placeholder dark:placeholder-text-placeholder-dark
                            focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-800"
                    />
                </div>

                <button
                    type="submit"
                    className="w-1/2 py-2 rounded-lg transition duration-200 cursor-pointer
                        text-text-dark dark:text-text bg-secondary dark:bg-secondary-dark hover:bg-secondary-dark dark:hover:bg-secondary hover:text-text dark:hover:text-text-dark"
                >
                    Register
                </button>

                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            </form>
        </div>
    );
};

export default Register;