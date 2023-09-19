const Pagination_Previous_Button = ({currentPage, handleSearch}) => {
    return (
        <button
            className={`pagination-vector-button`}
            onClick={() => handleSearch(currentPage - 1)}
            disabled={currentPage === 1}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="21"
                viewBox="0 0 11 21"
                fill="none">
                <path
                    d="M10 1L1 10.5L10 20"
                    stroke={currentPage === 1 ? '#3E3E3E' : 'white'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="bevel" />
            </svg>
        </button>
    )
}

export default Pagination_Previous_Button