const Pagination_Number_Button = ({element, currentPage, handleSearch}) => {
    return (
        <button
            className={`pagination-button ${element == currentPage ? 'current-page' : ''}`}
            onClick={() => { element !== '...' ? handleSearch(element) : null }}
            disabled={element === currentPage || element === '...'}
        >{element}</button>
    )
}

export default Pagination_Number_Button