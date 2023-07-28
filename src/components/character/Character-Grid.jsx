import Character_Card from "./Character-Card"
import Pagination from "./pagination/Pagination"

const Character_Grid = ({ searchResult, handleSearch, openModal }) => {

    return (
        <>
            <div className="grid-container">
                <div className='characters-list'>
                    {searchResult.characters.map(character => (
                        <Character_Card character={character} key={character.id} openModal={openModal}/>
                    ))}
                </div>
            </div>

            <Pagination totalPages={searchResult.pages} currentPage={searchResult.page} handleSearch={handleSearch}/>
        </>
    )
}

export default Character_Grid