import React, { Component } from 'react';
import { Dialog } from 'material-ui';

class FullSizeImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFullSizeImageOpen: this.props.isFullSizeImageOpen
        };
        this._handleClose = this._handleClose.bind(this);
    }

    render() {
        return (
                <Dialog
                    modal={false}
                    open={this.state.isFullSizeImageOpen}
                    onRequestClose={this._handleClose}
                    >
                    <div>
                        <img src={this.props.image} alt=""/>
                    </div>
                   
                </Dialog>

        );
    }

    _handleClose() {
        this.setState({
            isFullSizeImageOpen: !this.state.isFullSizeImageOpen
        });
        this.props.triggerWindowClose();
    }

}

export default FullSizeImage;