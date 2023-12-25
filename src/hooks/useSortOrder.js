import { useState } from 'react';

const useSortOrder = () => {
    const [sortOrder, setSortOrder] = useState('desc');

    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return { sortOrder, toggleSortOrder };
};

export default useSortOrder;
