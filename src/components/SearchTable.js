import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MainTable from './common/Table';

function SearchTable() {
    const users = useSelector(state => state.users);
    const [userItems, setUserItems] = useState(users.users);

    useEffect(() => {
        setTimeout(function () {
            setUserItems(users.users);
        }, 500);
    }, [users]);

    const columns = React.useMemo(
        () => [{
            Header: 'No.',
            accessor: '',
            Cell: (row) => {
                return <div>{parseInt(row.row.id) + 1}</div>;
            },
            disableSortBy: true,
            disableFilters: true,
        },
        {
            Header: "Repository Name",
            accessor: "name",
            Cell: ({ row }) => {
                console.log(row.original)
                return (
                    <div className="links-with-icons">
                        <Link
                            style={{ display: "block", margin: "1rem 0" }}
                            to={`/${row.original.full_name}`}
                        >
                            {row.original.name}
                        </Link>
                    </div>
                );
            },
        },
        {
            Header: "Author",
            accessor: "owner.login"
        },
        {
            Header: "Watchers",
            accessor: "watchers"
        },
        {
            Header: "Forks",
            accessor: "forks"
        },
        {
            Header: "Description",
            accessor: "description"
        },
        {
            Header: "Updated On",
            accessor: "updated_at"
        }
        ],
        []
    );


    return (
        <>
            <MainTable
                columns={columns}
                data={userItems}
            />
        </>
    )
}

export default SearchTable;