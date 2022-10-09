import { useContext, useEffect } from 'react'
import { context } from './context/Context'
import SearchResults from './SearchResults'

const Search = () => {
	const { setSearch } = useContext(context)
	useEffect(() => {
	  document.querySelector('#search-bar').focus()
	}, [])
	return (
		<div className='p-md-5 p-3 row justify-content-center'>
		<div className="col-md-8">
			<div className='form-floating mx-auto w-md-50'>
				<input
					type='text'
					className='form-control'
					placeholder='Search'
					id='search-bar'
					onChange={(e) => setSearch(e.target.value)}
				/>
				<label htmlFor='search-bar'>
					Search songs, playlists, artists...
				</label>
				<SearchResults />
		</div>
			</div>
		</div>
	)
}

export default Search
