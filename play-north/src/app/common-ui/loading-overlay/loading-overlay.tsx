import loadingOverlayStyle from './loading-overlay.module.sass'

import {useSelector} from "react-redux";
import {RootState} from '@/redux/store';


const LoadingOverlay = () => {
    const isLoading = useSelector((state: RootState) => state.loading.isLoading);
    // console.log('isLoading', isLoading);
    return (
        <>
            {isLoading && (
                <div className={loadingOverlayStyle['loading-overlay']}>
                    <div className={loadingOverlayStyle['loading-container']}>
                        <div className={loadingOverlayStyle['loading']}></div>
                        <div id={loadingOverlayStyle['loading-text']}>loading</div>
                    </div>
                </div>
            )}
        </>
    )
}

export default LoadingOverlay;