import { Route, Routes } from 'react-router-dom'
import SideBar from './components/SideBar'
import Home from './components/Home'
import Favorites from './components/Favorites'
import Search from './components/Search'
import Playlist from './components/Playlist.jsx'
import Login from './components/Login'
import { useContext } from 'react'
import { context } from './components/context/Context'
import SongPlayer from './components/SongPlayer'

function App() {
	const { isLoggedIn } = useContext(context)
	return !isLoggedIn ? (
		<Login />
	) : (
		<div className='row'>
			<SideBar />
			<div className='container-fluid col-lg-10 col-sm-9 col-12'>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/search' element={<Search />} />
					<Route path='/playlist' element={<Playlist />} />
				</Routes>
			</div>
			<SongPlayer />
		</div>
	)
}

export default App
