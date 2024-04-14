import React from 'react';
// import './game-collection-navigation.sass';
import SelectInput from "@/app/common-ui/select-input/select-input";
import gameNavigationStyle from './game-collection-navigation.module.sass';

interface ListGameNavigationProps {
    searchText: string,
    pageNumber: number,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>,
    pageSize: number,
    setPageSize: React.Dispatch<React.SetStateAction<number>>,
    category: string,
    getListGame: (category: string, newPageNumber: number, pageSize: number) => void;
    getListGamesSearch: (searchText: string, newPageNumber: number, pageSize: number) => void;
    prevPageApiUri: string,
    nextPageApiUri: string,
}

const GameCollectionNavigation = ({
                                      searchText,
                                      pageNumber,
                                      setPageNumber,
                                      pageSize,
                                      setPageSize,
                                      category,
                                      getListGame,
                                      getListGamesSearch,
                                      prevPageApiUri,
                                      nextPageApiUri,
                                  }: ListGameNavigationProps) => {
    const pageSizeOptions = [
        {value: 12, label: '12'},
        {value: 24, label: '24'},
        {value: 48, label: '48'},
    ]

    const nextPage = async () => {
        const newPageNumber = pageNumber + 1;
        setPageNumber(newPageNumber);
        await getListGamesBase(category, newPageNumber, pageSize);
    }

    const prevPage = async () => {
        const newPageNumber = pageNumber - 1;
        setPageNumber(newPageNumber);
        await getListGamesBase(category, newPageNumber, pageSize);
    }

    const changePageSize = async (event: any) => {
        const newPageSize = event.target.value;
        setPageSize(newPageSize);
        await getListGamesBase(category, pageNumber, newPageSize);
    }

    const getListGamesBase = async (category: string, pageNumber: number, pageSize: number) => {
        !searchText
            ? await getListGame(category, pageNumber, pageSize)
            : await getListGamesSearch(searchText, pageNumber, pageSize);
    }

    return (
        <div className={gameNavigationStyle.gameCollectionNavigation}>
            <button
                className={gameNavigationStyle.gameCollectionNavigationButtonPrev}
                disabled={pageNumber === 1 || !prevPageApiUri}
                onClick={prevPage}
            >
                &lt;
            </button>

            <SelectInput value={pageSize} options={pageSizeOptions} onchange={changePageSize}/>

            <button
                className={gameNavigationStyle.gameCollectionNavigationButtonNext}
                disabled={!nextPageApiUri}
                onClick={nextPage}
            >
                &gt;
            </button>
        </div>
    );
};

export default GameCollectionNavigation;