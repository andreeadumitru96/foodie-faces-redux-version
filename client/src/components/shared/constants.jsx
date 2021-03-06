import Alert from 'react-s-alert';
import Cookies from 'universal-cookie';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import * as Colors from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator'

export const cookies = new Cookies();
export const API_URL = 'localhost:3001';

export const HOST_URL = window.location.hostname ? window.location.hostname : 'localhost';  
export const API_PORT_URL = '3001';

export const notificationError = (message) => {
	Alert.error(message, {
		position: 'bottom-right',
		effect: 'jelly',
		timeout: 3000
	});
}

export const successNotification = (message) => {
    Alert.success(message, {
		position: 'bottom-right',
		effect: 'jelly',
		timeout: 3000
	});
}

export const getTheme = () => {
  let overwrites = {
    "palette": {
        "primary1Color": Colors.green800,
        "accent1Color": fade(Colors.green900, 0.9)
    }
};
  return getMuiTheme(baseTheme, overwrites);
}

export const CLOUDINARY_UPLOAD_PRESET = 'nnumnwkm'

export const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dvmrkblwv/upload';

