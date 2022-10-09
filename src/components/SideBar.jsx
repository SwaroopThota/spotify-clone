import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
	const [navOpen, setNavOpen] = useState(false)
	const toggleNav = () => {
		if (window.innerWidth <= 576) {
			document.getElementById('temp').style.height = navOpen
				? '0'
				: '240px'
			setNavOpen(!navOpen)
		}
	}
	return (
		<aside className='col-sm-3 col-lg-2 col-12 d-flex flex-column justify-content-center'>
			<div className='d-sm-none d-block ms-auto px-3 p-2'>
				<div className='fs-1 fw-bolder pointer' onClick={toggleNav}>
					<i className='bi bi-list'></i>
				</div>
			</div>
			<div className='text-white-50 d-flex flex-column' id='temp'>
				<NavLink
					className='py-3 ps-md-5 ps-4 h6'
					to='/'
					end
					onClick={toggleNav}
				>
					<i className='bi bi-house me-4'></i>Home
				</NavLink>
				<NavLink
					className='py-3 ps-md-5 ps-4 h6'
					to='/search'
					onClick={toggleNav}
				>
					<i className='bi bi-search me-4'></i>Search
				</NavLink>
				<NavLink
					className='py-3 ps-md-5 ps-4 h6'
					to='/favorites'
					onClick={toggleNav}
				>
					<i className='bi bi-heart-fill me-4'></i>Favorites
				</NavLink>
				<NavLink
					className='py-3 ps-md-5 ps-4 h6'
					to='/playlist'
					onClick={toggleNav}
				>
					<i className='bi bi-play-circle me-4'></i>Playlist
				</NavLink>
			</div>
		</aside>
	)
}

export default SideBar
