import React, { Component } from 'react';
import TimePicker from 'material-ui/TimePicker';
import update from 'react-addons-update';
import ServiceTScrollbar from './ServiceTScrollbar';

class WedServices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedkey: -1,
      wedDetails: []
    }
    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleClick(key) {
    this.setState({
      selectedkey: key
    })
  }

  handleCreateClick() {
    const contact = {
      nameService: 'Name of the service lorem ipsum 123',
    }
    this.handleCreate(contact);
  }

  handleCreate(contact) {
    this.setState({
      wedDetails: update(this.state.wedDetails, {
        $push: [contact]
      })
    });
  }
  handleRemove() {
    if (this.state.selectedkey < 0) {
      return;
    }
    this.setState({
      wedDetails: update(this.state.wedDetails, {
        $splice: [[this.state.selectedkey, 1]]
      }),
      selectedkey: -1
    });
  }
  render() {
    const { wedDetails } = this.state;
    const { style } = this.props;
    return (
      <div className="wedServices border2 serviceDays">
        <div className="st-title">
          <p className="red-color">Wednesday Services</p>
          <button className="btn-red" onClick={this.handleCreateClick}>+ Add New Service</button>
        </div>
        <div className="card">
          <ServiceTScrollbar style={{ height: 252 }}>
            <div className="card-header card-white">
              <div className="title">
                <p>Name of the service</p>
              </div>
              <div className="startTime st-border">
                <p>Start Time</p>
              </div>
              <div className="endTime st-border">
                <p>End Time</p>
              </div>
              <div className="action st-border">
                <p>Action</p>
              </div>
            </div>
            <div className="card-block">
              {wedDetails.length < 1 ?
                <p>No service entry available</p> :
                wedDetails.map((wedDetail, i) =>
                  <WedDetail
                    key={i}
                    nameService={wedDetail.nameService}
                    onMouseOver={() => this.handleClick(i)}
                    onRemove={this.handleRemove}
                    style={style}
                  />
                )
              }
            </div>
          </ServiceTScrollbar>
        </div>
      </div>
    );
  }
}

class WedDetail extends Component {
  render() {
    const { nameService, onMouseOver, onRemove, style } = this.props;
    return (
      <div className="mon-detail st-card-detail" onMouseOver={onMouseOver} onClick={onMouseOver}>
        <div className="nameService-detail p20">
          <input className="form-control" type="text" defaultValue={nameService} id="example-text-input" />
        </div>
        <div className="startTime p20">
          <TimePicker
            hintText="00:00AM"
            autoOk={true}
            textFieldStyle={style}
            dialogStyle={style}
            className="TimePicker"
          />
        </div>
        <div className="endTime p20">
          <TimePicker
            hintText="00:00AM"
            autoOk={true}
            textFieldStyle={style}
            className="TimePicker"
          />
        </div>
        <div className="action p20">
          <button onClick={onRemove}><i className="fas fa-trash-alt"></i></button>
        </div>
      </div>
    );
  }
}

export default WedServices;