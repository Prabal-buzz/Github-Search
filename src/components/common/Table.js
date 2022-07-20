import React from 'react';
import Table from 'react-bootstrap/Table';
import { useFilters, useGlobalFilter, usePagination, useSortBy, useTable } from 'react-table';

const MainTable = ({
        columns,
        data
}) => {
        const {
                getTableProps,
                getTableBodyProps,
                headerGroups,
                prepareRow,
                page,
                canPreviousPage,
                canNextPage,
                pageOptions,
                getPageCount,
                gotoPage,
                nextPage,
                previousPage,
                setPageSize,
                state,
                pageIndex,
                pageSize,
                preGlobalFilteredRows,
                setGlobalFilter,
        } = useTable(
                {
                        columns,
                        data,
                        initialState: { pageIndex: 0, pageSize: 10 },
                },
                useFilters,
                useGlobalFilter,
                usePagination
        );
        return (
                <div>
                        <div>
                                <div className="table-responsive">

                                        <Table {...getTableProps()} striped bordered hover size="sm" >
                                                <thead>
                                                        {headerGroups.map((headerGroup, index) => (
                                                                <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                                                                        {headerGroup.headers.map((column, index) => {
                                                                                console.log(column)
                                                                                return (
                                                                                        <th key={index} {...column.getHeaderProps()}>
                                                                                                {column.render('Header')}
                                                                                        </th>
                                                                                );
                                                                        })}
                                                                </tr>
                                                        ))}
                                                </thead>
                                                <tbody {...getTableBodyProps()}>
                                                        {page.map((row, i) => {
                                                                prepareRow(row);
                                                                return (
                                                                        <tr key={i} {...row.getRowProps()}>
                                                                                {row.cells.map((cell, index) => {
                                                                                        return (
                                                                                                <td key={index} {...cell.getCellProps()}>
                                                                                                        {cell.render('Cell')}
                                                                                                </td>
                                                                                        );
                                                                                })}
                                                                        </tr>
                                                                );
                                                        })}
                                                </tbody>
                                        </Table>
                                </div>
                                {data.length == 0 ? <h3>No Data Found</h3> : null}
                                <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                                <li className="page-item">
                                                        <button className="page-link" onClick={() => previousPage()} disabled={!canPreviousPage} aria-label="Previous">
                                                                <span aria-hidden="true">&laquo;</span>
                                                        </button>
                                                </li>
                                                {pageOptions.map((number, index) => {
                                                        return (
                                                                <li key={index} className={`page-item ${state.pageIndex == number ? 'active' : ''}`}>
                                                                        <button className="page-link" onClick={() => gotoPage(number)}>
                                                                                {number + 1}
                                                                        </button>
                                                                </li>
                                                        );
                                                })}
                                                <li className="page-item">
                                                        <button className="page-link" onClick={() => nextPage()} disabled={!canNextPage} aria-label="Next">
                                                                <span aria-hidden="true">&raquo;</span>
                                                        </button>
                                                </li>
                                                <select
                                                        value={pageSize}
                                                        onChange={(e) => {
                                                                setPageSize(Number(e.target.value));
                                                        }}
                                                >
                                                        <option value="10">10</option>
                                                        <option value="25">25</option>
                                                        <option value="50">50</option>
                                                        <option value="100">100</option>
                                                </select>
                                        </ul>

                                </nav>
                        </div>
                </div>
        );

}
export default MainTable;