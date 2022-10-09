import React, { useContext } from 'react'
import { context } from './context/Context'
import SongsRow from './SongsRow'

const Playlist = () => {
	const { userPlaylists } = useContext(context)
	return (
		<div className='p-sm-5 p-3'>
			<div className='d-flex justify-content-between'>
				<h3>Playlists</h3>
				<button className='btn btn-outline-primary'>
					+ Add Playlist
				</button>
			</div>
			{userPlaylists.map(({ title, songs }) => (
				<SongsRow songs={songs} title={title} key={title} />
			))}
		</div>
	)
}

export default Playlist
