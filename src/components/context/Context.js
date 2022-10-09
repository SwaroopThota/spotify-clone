import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const context = createContext()

const credentials = {
	clientId: process.env.REACT_APP_CLIENT_ID,
}
const spotifyApi = new SpotifyWebApi(credentials)

const ContextProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [accessToken, setAccessToken] = useState()
	const [refreshToken, setRefreshToken] = useState()
	const [expiresIn, setExpiresIn] = useState()
	const [search, setSearch] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [playingTrack, setPlayingTrack] = useState([])
	const [favoriteTracks, setFavoriteTracks] = useState([])
	const [userPlaylists, setUserPlaylists] = useState([])
	const [featuredPlaylists, setFeaturedPlaylists] = useState([])
	const addToQueue = (track) => {
		setPlayingTrack([track.uri])
	}
	const getUserTopTracks = async () => {
		try {
			const res = await spotifyApi.getMySavedTracks({ limit: 50 })
			setFavoriteTracks(
				res.body.items.map(({ track }) => {
					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: track.album.images[0].url,
					}
				})
			)
		} catch (error) {
			console.log(error)
		}
	}
	const getUserPlaylists = async () => {
		try {
			const res = await spotifyApi.getUserPlaylists()
			const playlists = []
			for (let i = 0; i < res.body.items.length; i++) {
				const playlist = res.body.items[i]
				let songs = await spotifyApi.getPlaylistTracks(playlist.id, {
					limit: 10,
				})
				songs = songs.body.items.map(({ track }) => {
					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: track.album.images[0].url,
					}
				})
				playlists.push({
					title: playlist.name,
					songs,
				})
			}
			setUserPlaylists(playlists)
		} catch (error) {
			console.log(error)
		}
	}
	const getFeaturedPlaylists = async () => {
		try {
			// console.log(
			// 	await spotifyApi.getCategories({
			// 		country: 'IN',
			// 	})
			// )
			const res = await spotifyApi.getPlaylistsForCategory(
				'0JQ5DAqbMKFIdOwkMWR5at',
				{
					country: 'IN',
				}
			)
			// console.log(res)
			const playlists = []
			for (let i = 0; i < 10; i++) {
				const playlist = res.body.playlists.items[i]
				let songs = await spotifyApi.getPlaylistTracks(playlist.id, {
					limit: 10,
				})
				songs = songs.body.items.map(({ track }) => {
					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: track.album.images[0]?.url,
					}
				})
				playlists.push({
					title: playlist.name,
					songs,
				})
				setFeaturedPlaylists(playlists)
			}
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		if (!accessToken) return
		spotifyApi.setAccessToken(accessToken)
		getUserTopTracks()
		getUserPlaylists()
		getFeaturedPlaylists()
	}, [accessToken])

	useEffect(() => {
		if (!accessToken || !search) {
			setSearchResults([])
			return
		}
		let cancel = false
		spotifyApi.searchTracks(search).then((res) => {
			if (cancel) return
			setSearchResults(
				res.body.tracks.items.map((track) => {
					return {
						artist: track.artists[0].name,
						title: track.name,
						uri: track.uri,
						albumUrl: track.album.images[0].url,
					}
				})
			)
		})

		return () => (cancel = true)
	}, [search, accessToken])

	useEffect(() => {
		const code = new URLSearchParams(window.location.search).get('code')
		if (!code) return
		window.history.pushState({}, null, '/')
		axios
			.post('/api/server/login', code)
			.then((response) => {
				const data = response.data
				setAccessToken(data.accessToken)
				setRefreshToken(data.refreshToken)
				setExpiresIn(data.expiresIn)
				setIsLoggedIn(true)
			})
			.catch((err) => {
				console.error(err)
				window.location = '/'
			})
	}, [])

	useEffect(() => {
		if (!refreshToken || !expiresIn) return
		const interval = setInterval(() => {
			axios
				.post('/api/server/refresh', refreshToken)
				.then((response) => {
					const data = response.data
					setAccessToken(data.accessToken)
				})
				.catch((err) => {
					console.error(err)
					window.location = '/'
				})
		}, (expiresIn - 60) * 1000)

		return () => {
			clearInterval(interval)
		}
	}, [expiresIn, refreshToken])

	const value = {
		isLoggedIn,
		setSearch,
		searchResults,
		accessToken,
		playingTrack,
		addToQueue,
		favoriteTracks,
		userPlaylists,
		featuredPlaylists,
	}
	return <context.Provider value={value}>{children}</context.Provider>
}

export { context, ContextProvider }
