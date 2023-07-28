import Pagination_Previous_Button from "./Pagination-Previous-Button";
import Pagination_Next_Button from "./Pagination-Next-Button";
import Pagination_Number_Button from "./Pagination-Number-Button";


const Pagination = ({ totalPages, currentPage, handleSearch }) => {

    let pageArray = []

    const fillPageArray = () => {
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
                pageArray.push(i)
            }
        } else {
            const rangeStart = Math.max(1, currentPage - 2);
            const rangeEnd = Math.min(totalPages, currentPage + 2);

            if (rangeStart > 1) {
                pageArray.push(1);
                if (rangeStart === 3) {
                    pageArray.push(2);
                } else if (rangeStart > 3) {
                    pageArray.push('...');
                }
            }

            for (let i = rangeStart; i <= rangeEnd; i++) {
                pageArray.push(i);
            }

            if (rangeEnd < totalPages) {
                if (rangeEnd === totalPages - 2) {
                    pageArray.push(totalPages - 1);
                } else if (rangeEnd < totalPages - 2) {
                    pageArray.push('...');
                }
                pageArray.push(totalPages);
            }

        }
    };

    fillPageArray()


    return (
        <div className="pagination-container">
            <Pagination_Previous_Button currentPage={currentPage} handleSearch={handleSearch} />
            {pageArray.map((element, index) => {
                return (
                    <Pagination_Number_Button key={index} element={element} currentPage={currentPage} handleSearch={handleSearch}/>
                )
            })}
            <Pagination_Next_Button currentPage={currentPage} handleSearch={handleSearch} totalPages={totalPages} />
        </div>
    )
}

export default Pagination