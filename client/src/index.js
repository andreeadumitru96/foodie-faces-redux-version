import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvieder from 'material-ui/styles/MuiThemeProvider';
import 'font-awesome/css/font-awesome.min.css';


import AppContainer from './components/individual/AppContainer/AppContainer';
import './index.css';
import {getTheme} from '../src/components/shared/constants'

ReactDOM.render(<MuiThemeProvieder muiTheme={getTheme()}>
                    <AppContainer />
                </MuiThemeProvieder>
, document.getElementById('root'));
registerServiceWorker();
