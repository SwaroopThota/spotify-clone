import React, { useContext, useEffect, useState } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import { context } from './context/Context'

const SongPlayer = () => {
	const { accessToken, playingTrack } = useContext(context)
	const [play, setPlay] = useState(false)
	useEffect(() => setPlay(true), [playingTrack])
	return (
		<div
			className='position-fixed col-lg-10 col-sm-9 col-12 pointer'
			style={{ bottom: 0, right: 0 }}
		>
			<SpotifyPlayer
				token={accessToken}
				callback={(state) => {
					if (!state.isPlaying) {
						setPlay(false)
					}
				}}

				uris={playingTrack}
				play={play}
				magnifySliderOnHover
				showSaveIcon
				initialVolume={0.8}
			/>
		</div>
	)
}

export default SongPlayer
