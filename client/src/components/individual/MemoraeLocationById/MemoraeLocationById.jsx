import React, { Component } from 'react';

import { notificationError } from '../../shared/constants';
import HomeContainer from '../HomeContainer/HomeContainer';

class MemoraeLocationById extends Component {
    constructor(props) {
        super(props);
        this.state = {
            urlLocationData: null
        };
        this._fetchUrlLocationIdData = this._fetchUrlLocationIdData.bind(this);
    }

    render() {
        return (
            <div>
                <HomeContainer
                    urlLocationData = {this.state.urlLocationData}
                    componentMountInBody = 'LocationDetailsComponent'
                />
            </div>  
        );
    }

    _fetchUrlLocationIdData() {
        let locationId = this.props.match.params.locationId;

        fetch(`http://localhost:3001/api/location/getSingleLocation/${locationId}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'get',
        }).then((response) => {
            if(response.status === 200) {
                response.json().then((location) => {
                    console.log(location);
                        this.setState({
                            urlLocationData: location,
                        });
                })
            } else {
                response.json().then((err) => {
                    notificationError(err);
                })
            }
        });
    }

    componentWillMount() {
        this._fetchUrlLocationIdData();
    }
}

export default MemoraeLocationById;