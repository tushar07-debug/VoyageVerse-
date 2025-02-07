import ADD_STORY_IMG from '../assets/images/emptyImg.svg';
import NO_FLITER_DATA_IMG from '../assets/images/noFilter.svg';
import NO_SEARCH_DATA_IMG from '../assets/images/notFound.svg';

export const validateEmail = (email) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
};

export const getInitials = (name) => {
	if (!name) return '';

	const words = name.split(' ');
	let initials = '';

	for (let i = 0; i < Math.min(words.length, 2); i++) {
		initials += words[i][0];
	}

	return initials.toUpperCase();
};

export const getEmptyCardMessage = (filterType) => {
	switch (filterType) {
		case 'search':
			return `Ooops! No Stories found matching your search.`;

		case 'date':
			return `No Stories found in the give date range.`;

		default:
			return `Start creating your first Travel Story! Click the 'Add' button to jot down your thoughts, ideas, and memories. Let's get started!`;
	}
};

export const getEmptyCardImg = (filterType) => {
	switch (filterType) {
		case 'search':
			return NO_SEARCH_DATA_IMG;

		case 'date':
			return NO_FLITER_DATA_IMG;

		default:
			return ADD_STORY_IMG;
	}
};
