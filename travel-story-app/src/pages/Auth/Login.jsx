import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/input/PasswordInput';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();

		if (!validateEmail(email)) {
			setError('Please enter a valid email address.');
			return;
		}

		if (!password) {
			setError('Please enter the password.');
			return;
		}
		setError('');

		// Login API call
		try {
			const response = await axiosInstance.post('/login', {
				email: email,
				password: password,
			});

			// Handel successfull login response
			if (response.data && response.data.accessToken) {
				localStorage.setItem('token', response.data.accessToken);
				navigate('/dashboard');
			}
		} catch (error) {
			// Handle login error
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				setError(error.response.data.message);
			} else {
				setError('An unexpected error occurred. Please try again');
			}
		}
	};

	return (
		<div className="h-screen bg-cyan-50 overflow-hidden relative">
			<div className="login-ui-box right-10 -top-40 hidden lg:block"></div>
			<div className="login-ui-box bg-cyan-200 -bottom-40 right-1/2 hidden lg:block"></div>

			<div className="container h-screen flex flex-wrap items-center justify-center px-4 sm:px-8 lg:px-48 mx-auto">
				<div className="w-full lg:w-2/4 h-[40vh] lg:h-[90vh] flex items-end bg-login-bg-img bg-cover bg-center rounded-lg p-5 lg:p-10 z-50 mb-4 lg:mb-0">
					<div>
						<h4 className="text-3xl lg:text-5xl text-white font-semibold leading-tight lg:leading-[58px]">
							Capture Your <br /> Journeys
						</h4>
						<p className="text-sm lg:text-[15px] text-white leading-5 lg:leading-6 mt-2 lg:mt-4 pr-3 lg:pr-7">
							Record your travel experiences and memories in your personal
							travel journal.
						</p>
					</div>
				</div>

				<div className="w-full lg:w-2/4 bg-white rounded-lg lg:rounded-r-lg relative p-8 lg:p-16 shadow-lg shadow-cyan-200/20">
					<form onSubmit={handleLogin}>
						<h4 className="text-xl lg:text-2xl font-semibold mb-5 lg:mb-7">
							Login
						</h4>

						<input
							type="text"
							placeholder="Email"
							className="input-box"
							value={email}
							onChange={({ target }) => {
								setEmail(target.value);
							}}
						/>

						<PasswordInput
							value={password}
							onChange={({ target }) => {
								setPassword(target.value);
							}}
						/>

						{error && <p className="text-red-500 text-xs pb-1">{error}</p>}

						<button type="submit" className="btn-primary">
							LOGIN
						</button>

						<p className="text-xs text-slate-500 text-center my-4">Or</p>

						<button
							type="button"
							className="btn-primary btn-light"
							onClick={() => {
								navigate('/signup');
							}}
						>
							CREATE ACCOUNT
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Login;
