import React from 'react';

const EmptyCard = ({ imgSrc, message }) => {
	return (
		<div className="flex flex-col items-center justify-center mt-20">
			<img
				src={imgSrc}
				alt=""
				className="w-24 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100"
			/>

			<p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
				{message}
			</p>
		</div>
	);
};

export default EmptyCard;
