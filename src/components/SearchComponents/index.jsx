// src/components/SearchComponents.js
import React, {useState} from 'react';
import InputComponents from "../InputComponents";
import ButtonComponents from "../ButtonComponents";

const SearchComponents = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearchClick = () => {
        const searchValue = searchTerm.toLowerCase();
        onSearch(searchValue);
    };

    return (
        <div className="d-flex align-items-center">
            <InputComponents
                type="text"
                name="search"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Tìm kiếm hợp đồng..."
            />
            <ButtonComponents
                type="button"
                className="btn-primary ms-2"
                onClick={handleSearchClick}
            >
                Search
            </ButtonComponents>
        </div>
    );
};

export default SearchComponents;
