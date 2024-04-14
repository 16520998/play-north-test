import emptyDataStyle from './empty-data.module.sass';

const emptyData = () => {
    return (
        <div className={emptyDataStyle['empty-data']}>
            <h3> Empty Data</h3>
        </div>
    );
};

export default emptyData;