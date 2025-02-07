import moment from 'moment';
import React, { useState } from 'react';
import { MdAdd, MdClose, MdDeleteOutline, MdUpdate } from 'react-icons/md';
import { toast } from 'react-toastify';
import DateSelector from '../../components/input/DateSelector';
import ImageSelector from '../../components/input/ImageSelector';
import TagInput from '../../components/input/TagInput';
import axiosInstance from '../../utils/axiosInstance';
import uploadImage from '../../utils/uploadImage';

const AddEditTravelStory = ({
	storyInfo,
	type,
	onClose,
	getAllTravelStories,
}) => {
	const [title, setTitle] = useState(storyInfo?.title || '');
	const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
	const [story, setStory] = useState(storyInfo?.story || '');
	const [visitedLocation, setVisitedLocation] = useState(
		storyInfo?.visitedLocation || []
	);
	const [visitedDate, setVisitedDate] = useState(
		storyInfo?.visitedDate || null
	);

	const [error, setError] = useState('');

	// Add new travel story
	const addNewTravelStory = async () => {
		try {
			let imageUrl = '';
			if (storyImg) {
				const imgUploadRes = await uploadImage(storyImg);
				// Get image url
				imageUrl = imgUploadRes.imageUrl || '';
			}

			const response = await axiosInstance.post('/add-travel-story', {
				title,
				story,
				imageUrl: imageUrl || '',
				visitedLocation,
				visitedDate: visitedDate
					? moment(visitedDate).valueOf()
					: moment().valueOf(),
			});

			if (response.data && response.data.story) {
				toast.success('Story added successfully');
				// Refresh stories
				getAllTravelStories();
				// Close modal or form
				onClose();
			}
		} catch (error) {
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				setError(error.response.data.message);
			} else {
				// Handle unexpected error
				setError('An unexpected error occurred. Please try again');
			}
		}
	};

	// Update Travel Story
	const updateTravelStory = async () => {
		const storyId = storyInfo._id;

		try {
			let imageUrl = '';

			let postData = {
				title,
				story,
				imageUrl: storyInfo.imageUrl || '',
				visitedLocation,
				visitedDate: visitedDate
					? moment(visitedDate).valueOf()
					: moment().valueOf(),
			};

			if (typeof storyImg === 'object') {
				// Upload New Image
				const imgUploadRes = await uploadImage(storyImg);
				// Get image url
				imageUrl = imgUploadRes.imageUrl || '';
				postData = { ...postData, imageUrl: imageUrl };
			}

			const response = await axiosInstance.put(
				'/edit-story/' + storyId,
				postData
			);

			if (response.data && response.data.story) {
				toast.success('Story updated successfully');
				// Refresh stories
				getAllTravelStories();
				// Close modal or form
				onClose();
			}
		} catch (error) {
			if (
				error.response &&
				error.response.data &&
				error.response.data.message
			) {
				setError(error.response.data.message);
			} else {
				// Handle unexpected error
				setError('An unexpected error occurred. Please try again');
			}
		}
	};

	const handleAddOrUpdateClick = () => {
		console.log('Input Data:', {
			title,
			storyImg,
			story,
			visitedLocation,
			visitedDate,
		});

		if (!title) {
			setError('Please enter a title');
			return;
		}

		if (!story) {
			setError('Please enter a story');
			return;
		}

		setError('');

		if (type === 'edit') {
			updateTravelStory();
		} else {
			addNewTravelStory();
		}
	};

	// Delete story image and update the story
	const handleDeleteStoryImg = async () => {
		// Deleting the Image
		const deleteImgRes = await axiosInstance.delete('/delete-image', {
			params: {
				imageUrl: storyInfo.imageUrl,
			},
		});

		if (deleteImgRes.data) {
			const storyId = storyInfo._id;

			let postData = {
				title,
				story,
				visitedLocation,
				visitedDate: moment().valueOf(),
				imageUrl: '',
			};

			// Updating story
			const response = await axiosInstance.put(
				'/edit-story/' + storyId,
				postData
			);
			setStoryImg(null);
		}
	};

	return (
		<div className="relative w-full max-w-4xl mx-auto p-4">
			<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
				<h5 className="text-xl font-medium text-slate-700">
					{type === 'add' ? 'Add Story' : 'Update Story'}
				</h5>

				<button
					className="absolute top-2 right-2 text-slate-700 p-2 rounded-full sm:block xl:hidden"
					onClick={onClose}
				>
					<MdClose className="text-2xl" />
				</button>

				<div className="w-full sm:w-auto">
					<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-cyan-50/50 p-2 rounded-lg">
						{type === 'add' ? (
							<button
								className="btn-small w-full sm:w-auto flex items-center justify-center gap-2"
								onClick={handleAddOrUpdateClick}
							>
								<MdAdd className="text-lg" /> ADD STORY
							</button>
						) : (
							<>
								<button
									className="btn-small w-full sm:w-auto flex items-center justify-center gap-2"
									onClick={handleAddOrUpdateClick}
								>
									<MdUpdate className="text-lg" /> UPDATE STORY
								</button>
								<button
									className="btn-small btn-delete w-full sm:w-auto flex items-center justify-center gap-2"
									onClick={onClose}
								>
									<MdDeleteOutline className="text-lg" /> DELETE
								</button>
							</>
						)}
						<button className="hidden sm:block" onClick={onClose}>
							<MdClose className="text-xl text-slate-400" />
						</button>
					</div>

					{error && (
						<p className="text-red-500 text-xs pt-2 text-left sm:text-right">
							{error}
						</p>
					)}
				</div>
			</div>

			<div className="space-y-6">
				<div className="flex flex-col gap-2">
					<label className="input-label">TITLE</label>
					<input
						type="text"
						className="text-xl sm:text-2xl text-slate-950 outline-none w-full p-2 bg-slate-50 rounded"
						placeholder="A Day at Great Wall"
						value={title}
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>

				<div>
					<DateSelector date={visitedDate} setDate={setVisitedDate} />
				</div>

				<ImageSelector
					image={storyImg}
					setImage={setStoryImg}
					handleDeleteImg={handleDeleteStoryImg}
				/>

				<div className="flex flex-col gap-2">
					<label className="input-label">STORY</label>
					<textarea
						className="text-sm text-slate-950 outline-none bg-slate-50 p-4 rounded min-h-[200px] w-full"
						placeholder="Your Story"
						rows={10}
						value={story}
						onChange={({ target }) => setStory(target.value)}
					/>
				</div>

				<div>
					<label className="input-label block mb-2">VISITED LOCATIONS</label>
					<TagInput tags={visitedLocation} setTags={setVisitedLocation} />
				</div>
			</div>
		</div>
	);
};

export default AddEditTravelStory;
