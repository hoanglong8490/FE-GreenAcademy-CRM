// src/components/SearchComponents.js
import React, {useState} from 'react';
import InputComponents from "../InputComponents";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

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
                icon={<FontAwesomeIcon icon={faSearch}/>}
                onIconClick={handleSearchClick} // truyền hàm xử lý sự kiện nhấp chuột cho biểu tượng
            />
            {/*<ButtonComponents*/}
            {/*    type="button"*/}
            {/*    className="btn-primary ms-2"*/}
            {/*    onClick={handleSearchClick}*/}
            {/*>*/}
            {/*    Search*/}
            {/*</ButtonComponents>*/}
        </div>
    );
};

export default SearchComponents;