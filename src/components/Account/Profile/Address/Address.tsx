import { Component } from 'react';
import './Address.css';

type AddressProps = object;
type AddressState = object;

class Address extends Component<AddressProps, AddressState> {
  render() {
    return (
      <section className="ap-card">
        <div className="ap-card-header">
          <h2>Address</h2>
          <button className="ap-edit-button">Edit ✏️</button>
        </div>
        <div className="ap-card-content">
          <div>
            <strong>Country</strong>
            <p>India</p>
          </div>
          <div>
            <strong>City</strong>
            <p>Chennai</p>
          </div>
          <div>
            <strong>State</strong>
            <p>Tamil Nadu</p>
          </div>
          <div>
            <strong>Postal Code</strong>
            <p>600016</p>
          </div>
        </div>
      </section>
    );
  }
}

export default Address;