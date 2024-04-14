import {useDispatch} from "react-redux";
import {hideLoadingOverlay, showLoadingOverlay} from "@/redux/slices/loading-overlay-slice";

const LoadingOverlayUtil = () => {
    const dispatch = useDispatch();

    const showLoading = () => dispatch(showLoadingOverlay());

    const hideLoading = () => dispatch(hideLoadingOverlay());

    return {
        showLoading,
        hideLoading
    }
}

export default LoadingOverlayUtil;