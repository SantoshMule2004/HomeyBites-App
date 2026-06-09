import Toast, { ToastPosition } from "react-native-toast-message";

const ShowToast = ({ text, success = true, position = 'bottom', bottomOffset = 100, topOffset = 50 }: { text: string, success?: boolean, position?: ToastPosition, bottomOffset?: number, topOffset?: number }) => {
  Toast.show({
    type: success ? 'successToast' : 'errorToast',
    text1: text,
    position: position,
    bottomOffset: bottomOffset,
    topOffset: topOffset,
  });
}

export default ShowToast