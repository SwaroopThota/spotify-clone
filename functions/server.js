const SpotifyWebApi = require('spotify-web-api-node')

exports.handler = async (event, context) => {
	try {
		if (event.path === '/api/server/login') {
			const code = event.body
			const credentials = {
				clientId: process.env.REACT_APP_CLIENT_ID,
				clientSecret: process.env.REACT_APP_CLIENT_SECRET,
				redirectUri: process.env.REACT_APP_REDIRECT_URI,
			}
			const spotifyApi = new SpotifyWebApi(credentials)
			const data = await spotifyApi.authorizationCodeGrant(code)
			return {
				statusCode: 200,
				body: JSON.stringify({
					accessToken: data.body.access_token,
					refreshToken: data.body.refresh_token,
					expiresIn: data.body.expires_in,
				}),
			}
		} else {
			const refreshToken = event.body
			const credentials = {
				clientId: process.env.REACT_APP_CLIENT_ID,
				clientSecret: process.env.REACT_APP_CLIENT_SECRET,
				redirectUri: process.env.REACT_APP_REDIRECT_URI,
				refreshToken,
			}
			const spotifyApi = new SpotifyWebApi(credentials)
			const data = await spotifyApi.refreshAccessToken()
			return {
				statusCode: 200,
				body: JSON.stringify({
					accessToken: data.body.access_token
				}),
			}
		}
	} catch (err) {
		console.log(err)
		return {
			statusCode: 500,
		}
	}
}
