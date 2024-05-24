
function generateArr(end) {
    let arr = []
    for(let i=0; i<=end; i++){
        arr.push(i+1)
    }
    return arr
}

const Pagination = ({totalRows, current, setCurrent}) => {

    const renderPage = generateArr(totalRows-2)

    const  handlePageChange = (page) => {
        setCurrent(page)
    }

    const handlePrevNext = (type) => {
    
        if(type==='prev' && (current-1 > 0)) {
            setCurrent(current-1)
        }

        if(type === 'next' && (current+1 <= renderPage.length)){
            setCurrent(current+1)
        }
    }

    

    return (
        <div className="pagination-container">
            
            <div >
                <button className="special page-button" onClick={() => handlePrevNext('prev')}>
                    prev
                </button>
            </div>
            <div className="paginator">
                {renderPage.map((page) => 
                        <button
                        key={page}
                        className={page === current ? "page-active" : "page-button"} 
                        onClick={() => handlePageChange(page)}>
                            {page}
                        </button>
                )}
            </div>
            <div>
                <button className="special page-button" onClick={() => handlePrevNext('next')}>
                    next
                </button>
            </div>
        </div>
    )
}

export default Pagination