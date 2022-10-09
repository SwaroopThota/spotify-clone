import React, { useContext } from 'react'
import { context } from './context/Context'
const Favorites = () => {
	const { favoriteTracks, addToQueue } = useContext(context)
	return (
		<div className='p-sm-5 p-3'>
			<h3>Your Favorites:</h3>
			{favoriteTracks.map((track, i) => (
				<div
					className='card m-2 mx-auto pointer'
					key={i}
					onClick={() => addToQueue(track)}
				>
					<div className='row g-0'>
						<div className='col-4 col-md-2'>
							<img
								src={track.albumUrl}
								style={{ maxWidth: '100px' }}
								className='img-fluid rounded-start'
								alt='...'
							/>
						</div>
						<div className='col-8 col-md-10'>
							<div className='card-body'>
								<h5 className='card-title'>{track.title}</h5>
								<p className='card-text'>
									<small className='text-muted'>
										{track.artist}
									</small>
								</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

export default Favorites
