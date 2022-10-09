import React from 'react'

function Login() {
	const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=6c998c004bf8492c8dc42733b6783086&response_type=code&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-read-private%20user-top-read`
	return (
		<div
			className='d-flex justify-content-center align-items-center'
			style={{ minHeight: '100vh' }}
		>
			<a
				href={AUTH_URL}
				className='btn btn-lg fw-semibold'
				style={{ backgroundColor: '#1DB954', color: '#191414' }}
			>
				<i class='bi bi-spotify text-black'></i> Login with Spotify
			</a>
		</div>
	)
}

export default Login
