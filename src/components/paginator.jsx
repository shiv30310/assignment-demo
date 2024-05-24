
const Paginator = ({current, totalPages, setCurrentPage}) => {
    
    const handleClick = (page) => {
        console.log('Paginator', page)
        setCurrentPage(page)

    }

    return (
        <>
            <div >
                <button className="special page-button">
                    prev
                </button>
            </div>
            <div className="paginator">
                {totalPages.map((page) => 
                        <button
                        key={page}
                        className={page === current ? "page-active" : "page-button"} 
                        onClick={() => handleClick(page)}>
                            {page}
                        </button>
                )}
            </div>
            <div>
                <button className="special page-button">
                    next
                </button>
            </div>
        </>
    )
}

export default Paginator