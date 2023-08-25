import logo from '../../../Assets/logo.png'
import Search from './Search'

const Header = ({ handleSearch, setSearchName, searchName }) => {

    return (
        <div className='header-container'>
            <img src={logo} alt="Logo of Rick and Morty" />
            <Search handleSearch={handleSearch} setSearchName={setSearchName} searchName={searchName}/>
        </div>
    )
}

export default Header