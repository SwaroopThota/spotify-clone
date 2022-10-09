import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBar = () => {
	return (
		<nav className='col-3 col-lg-2 container-fluid text-white-50 d-none d-sm-flex position-sticky'>
				<NavLink className='py-3 ps-md-5 ps-3 h6' to='/' end>
					<i className='bi bi-house me-4'></i>Home
				</NavLink>
				<NavLink className='py-3 ps-md-5 ps-3 h6' to='/search'>
					<i className='bi bi-search me-4'></i>Search
				</NavLink>
				<NavLink className='py-3 ps-md-5 ps-3 h6' to='/favorites'>
					<i className='bi bi-heart-fill me-4'></i>Favorites
				</NavLink>
				<NavLink className='py-3 ps-md-5 ps-3 h6' to='/playlist'>
					<i className='bi bi-play-circle me-4'></i>Playlist
				</NavLink>
		</nav>
	)
}

export default SideBar
