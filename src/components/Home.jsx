import React, { useContext } from 'react'
import { context } from './context/Context'
import SongsRow from './SongsRow'

const Home = () => {
	const { featuredPlaylists } = useContext(context)
	return (
		<>
			<div className='banner'></div>
			<div className='container-fluid p-3'>
				{featuredPlaylists.map(({ title, songs }) => (
					<SongsRow songs={songs} title={title} key={title} />
				))}
			</div>
		</>
	)
}

export default Home
