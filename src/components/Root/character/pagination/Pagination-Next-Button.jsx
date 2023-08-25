const Pagination_Next_Button = ({currentPage, totalPages, handleSearch}) => {
    return (
        <button
            className={`pagination-vector-button`}
            onClick={() => handleSearch(currentPage + 1)}
            disabled={currentPage === totalPages}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="11"
                height="21"
                viewBox="0 0 11 21"
                fill="none">
                <path
                    d="M0.999999 20L10 10.5L1 0.999998"
                    stroke={currentPage === totalPages ? '#3E3E3E' : 'white'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="bevel" />
            </svg>
        </button>
    )
}

export default Pagination_Next_Button