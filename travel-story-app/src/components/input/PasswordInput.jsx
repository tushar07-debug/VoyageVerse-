import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const PasswordInput = ({ value, onChange, placeholder }) => {
	const [isShowPassword, setIsShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setIsShowPassword(!isShowPassword);
	};

	return (
		<div className="flex items-center bg-cyan-600/5 px-5 rounded mb-3">
			<input
				value={value}
				onChange={onChange}
				placeholder={placeholder || 'Password'}
				type={isShowPassword ? 'text' : 'password'}
				className="w-full py-3 text-sm bg-transparent mr-3 rounded outline-none"
			/>

			{isShowPassword ? (
				<FaRegEye
					size={22}
					className="text-primary cursor-pointer"
					onClick={() => togglePasswordVisibility()}
				/>
			) : (
				<FaRegEyeSlash
					size={22}
					className="text-slate-400 cursor-pointer"
					onClick={() => togglePasswordVisibility()}
				/>
			)}
		</div>
	);
};

export default PasswordInput;
