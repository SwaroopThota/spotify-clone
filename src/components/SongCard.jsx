import React, { useContext } from 'react'
import { context } from './context/Context'

const SongCard = ({ song }) => {
	const { addToQueue } = useContext(context)
	return (
		song.albumUrl && (
			<div className='card col-xl-2 col-lg-3 col-sm-4 col-6 p-1 border-0 rounded-0 pointer text-center' style={{scrollSnapAlign:'start'}}>
				<img
					src={song.albumUrl}
					className='card-img-top rounded d-block m-auto'
					alt='...'
					style={{ maxWidth: '150px' }}
					onClick={() => addToQueue(song)}
				/>
				<div className='card-body d-flex justify-content-between'>
					<div>
						<h6 className='card-title text-muted'>{song.title}</h6>
						<small className='text-muted'>{song.artist}</small>
					</div>
					<i
						className='bi bi-heart h5'
						onClick={(e) =>
							(e.target.className =
								'h5 bi bi-heart-fill text-danger')
						}
					></i>
				</div>
			</div>
		)
	)
}

export default SongCard
