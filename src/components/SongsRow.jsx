import React from 'react'
import SongCard from './SongCard'

const SongsRow = ({ songs, title }) => {
	return (
		<div>
			<div className='d-flex justify-content-evenly align-items-center p-3'>
				<h5 className='text-muted'>{title}</h5>
				<hr className=' m-auto border-secondary' />
				<div
					className='btn-group d-flex justify-content-center'
					role='group'
				>
					<i className='bi bi-chevron-left h5'></i>
					<i className='bi bi-chevron-right h5'></i>
				</div>
			</div>
			<div className='container-fluid row flex-nowrap overflow-scroll song-container gap-1' style={{scrollSnapType: 'x mandatory'}}>
				{songs &&
					songs.map((song,i) => (
						<SongCard song={song} key={song.albumUrl+i} />
					))}
			</div>
		</div>
	)
}

export default SongsRow
