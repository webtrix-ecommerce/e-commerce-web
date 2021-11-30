import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';



const CustomPagination = ({ itemsPerPage }) => {
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);


    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + 12;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(items.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(items.length / 12));
    }, [itemOffset, itemsPerPage]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 12) % items.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };
    return (
        <div className="ps-pagination">
            <ul className="pagination">
                {/* <li className="active">
                    <a href="#">1</a>
                </li>
                <li>
                    <a href="#">2</a>
                </li>
                <li>
                    <a href="#">3</a>
                </li>
                <li>
                    <a href="#">
                        Next Page
                        <i className="icon-chevron-right"></i>
                    </a> 
                </li> */}
                <>
                    {/* <Items currentItems={currentItems} /> */}
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={5}
                        pageCount={12}
                        previousLabel="< previous"
                        renderOnZeroPageCount={null}
                    />
                </>
            </ul>
        </div>
    );
};

export default CustomPagination;
