import moment from 'moment';
import React from 'react';
import { GrMapLocation } from 'react-icons/gr';
import { MdClose, MdDeleteOutline, MdUpdate } from 'react-icons/md';

const ViewTravelStory = ({
	storyInfo,
	onClose,
	onEditClick,
	onDeleteClick,
}) => {
	return (
		<div className="relative max-w-full">
			{/* Header Actions */}
			<div className="flex items-center justify-end mb-2">
				<div className="flex flex-wrap items-center gap-2 sm:gap-3 bg-cyan-50/50 p-2 rounded-l-lg">
					<button
						className="btn-small text-xs sm:text-sm flex items-center gap-1"
						onClick={onEditClick}
					>
						<MdUpdate className="text-base sm:text-lg" />
						<span className="hidden sm:inline">UPDATE STORY</span>
						<span className="sm:hidden">UPDATE</span>
					</button>
					<button
						className="btn-small btn-delete text-xs sm:text-sm flex items-center gap-1"
						onClick={onDeleteClick}
					>
						<MdDeleteOutline className="text-base sm:text-lg" />
						<span>DELETE</span>
					</button>
					<button className="p-1" onClick={onClose}>
						<MdClose className="text-lg sm:text-xl text-slate-400" />
					</button>
				</div>
			</div>

			<div>
				{/* Story Header */}
				<div className="flex-1 flex flex-col gap-2 py-2 sm:py-4">
					<h1 className="text-xl sm:text-2xl text-slate-950 font-semibold">
						{storyInfo?.title}
					</h1>

					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
						<span className="text-xs text-slate-500">
							{storyInfo && moment(storyInfo.visitedDate).format('Do MMM YYYY')}
						</span>

						<div className="inline-flex items-center gap-2 text-[12px] sm:text-[13px] text-cyan-600 bg-cyan-200/40 rounded px-2 py-1 max-w-full overflow-x-auto">
							<GrMapLocation className="text-sm flex-shrink-0" />
							<div className="truncate">
								{storyInfo?.visitedLocation.join(', ')}
							</div>
						</div>
					</div>
				</div>

				{/* Story Image */}
				<div className="relative w-full aspect-video sm:h-[300px]">
					<img
						src={storyInfo?.imageUrl}
						alt={storyInfo?.title}
						className="absolute inset-0 w-full h-full object-cover rounded-lg"
					/>
				</div>

				{/* Story Content */}
				<div className="mt-3 sm:mt-4">
					<p className="text-sm text-slate-950 leading-6 text-justify whitespace-pre-line break-words">
						{storyInfo?.story}
					</p>
				</div>
			</div>
		</div>
	);
};

export default ViewTravelStory;
