import React, { useState } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { MdClose, MdSearch } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import LOGO from '../assets/images/logo.svg';
import ProfileInfo from './Cards/ProfileInfo';
import SearchBar from './input/SearchBar';

const Navbar = ({
	userInfo,
	searchQuery,
	setSearchQuery,
	onSearchNote,
	handleClearSearch,
}) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const isToken = localStorage.getItem('token');
	const navigate = useNavigate();

	const onLogout = () => {
		localStorage.clear();
		navigate('/login');
	};

	const handleSearch = () => {
		if (searchQuery) {
			onSearchNote(searchQuery);
		}
	};

	const onClearSearch = () => {
		handleClearSearch();
		setSearchQuery('');
	};

	return (
		<nav className="bg-white sticky top-0 z-50 shadow-xl">
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="relative flex h-16 items-center justify-between">
					{/* Logo Section */}
					<div className="flex items-center">
						<img
							src={LOGO}
							alt="Travel Story"
							className="h-8 sm:h-10 lg:h-12 w-auto"
						/>
					</div>

					{/* Centered Search Bar */}
					{isToken && (
						<div className="absolute inset-0 flex items-center justify-center">
							<SearchBar
								value={searchQuery}
								onChange={({ target }) => setSearchQuery(target.value)}
								handleSearch={handleSearch}
								onClearSearch={onClearSearch}
							/>
						</div>
					)}

					{/* Desktop Navigation */}
					<div className="hidden md:flex md:items-center md:space-x-4">
						<ProfileInfo userInfo={userInfo} onLogout={onLogout} />
					</div>

					{/* Mobile Navigation */}
					<div className="flex items-center md:hidden">
						{/* Search Toggle Button */}
						<button
							className="p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
							onClick={() => setIsSearchOpen(!isSearchOpen)}
						>
							<MdSearch className="h-6 w-6" />
						</button>

						{/* Menu Toggle Button */}
						<button
							className="ml-2 p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
						>
							{isMenuOpen ? (
								<MdClose className="h-6 w-6" />
							) : (
								<FaRegUserCircle className="h-6 w-6" />
							)}
						</button>
					</div>
				</div>

				{/* Mobile Search Bar */}
				{isToken && isSearchOpen && (
					<div className="md:hidden px-2 pb-3">
						<SearchBar
							value={searchQuery}
							onChange={({ target }) => setSearchQuery(target.value)}
							handleSearch={handleSearch}
							onClearSearch={onClearSearch}
						/>
					</div>
				)}

				{/* Mobile Menu */}
				{isToken && isMenuOpen && (
					<div className="md:hidden px-2 pb-3 pt-2">
						<div className="flex justify-center">
							<ProfileInfo
								userInfo={userInfo}
								onLogout={onLogout}
								isMobile={true}
							/>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
