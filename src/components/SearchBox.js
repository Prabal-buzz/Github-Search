import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { findUsers } from "../redux/actions/userActions";

function SearchBox() {
    const [username, setUsername] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [hideBg, setHideBg] = useState('');
    const [inputError, setInputError] = useState('');
    const dispatch = useDispatch();

    const handleSearch = (value) => {
        value.length > 0 ? setHideBg('bg-none') : setHideBg('');
        setUsername(value);

        if (value.length < 3) {
            setInputError("At least 3 characters must be entered")
        }
        else {
            setInputError("");
            dispatch(findUsers(value, currentPage));
        }
    };
    const handleSearchSubmit = (e) => {
        if (e.key == "Enter") {
            e.target.value.length > 0 ? setHideBg('bg-none') : setHideBg('');
            setUsername(e.target.value);

            if (e.target.value.length < 3) {
                setInputError("At least 3 characters must be entered")
            }
            else {
                setInputError("");
                dispatch(findUsers(e.target.value, currentPage));
            }
        }
    }

    return (
        <>
            <div className="mt-16 mb-12 flex justify-center">
                <div>
                    <div>
                        <h2 className="mb-4 text-center font-roboto font-semibold text-base">Search</h2>
                    </div>
                    {/* <form action="#" method="POST"> */}
                    <div className="container">
                        <div>
                            <input
                                id="username"
                                name="user"
                                type="search"
                                autoComplete="username"
                                required
                                className={hideBg + " px-3 py-2 border-none rounded-sm userSearch"}
                                placeholder="Type name here"
                                value={username}
                                onChange={(e) => handleSearch(e.target.value)}
                                onKeyUp={(e) => handleSearchSubmit(e)}
                            />
                            <div className="mt-1 text-xs" style={{ color: "red" }}>{inputError}</div>
                        </div>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        </>
    )
}

export default SearchBox;