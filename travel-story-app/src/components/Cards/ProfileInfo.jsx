import React from 'react';
import { getInitials } from '../../utils/helper';

const ProfileInfo = ({ userInfo, onLogout, isMobile = false }) => {
	return (
		userInfo && (
			<div className={`flex items-center gap-3 ${isMobile ? 'flex-col' : ''}`}>
				<div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
					{getInitials(userInfo ? userInfo.fullName : '')}
				</div>
				<div className={`${isMobile ? 'text-center' : ''}`}>
					<p className="text-sm font-medium truncate max-w-[150px] sm:max-w-[200px]">
						{userInfo?.fullName || ''}
					</p>
					<button
						className="text-sm text-slate-700 underline hover:text-slate-900"
						onClick={onLogout}
					>
						Logout
					</button>
				</div>
			</div>
		)
	);
};

export default ProfileInfo;
