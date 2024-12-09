import { Component } from 'react';
import './Security.css';

type SecurityProps = object;
type SecurityState = object;

class Security extends Component<SecurityProps, SecurityState> {
  render() {
    return (
      <div className="ap-security-section">
        {/* First Card */}
        <section className="ap-security-card">
          <div className="ap-security-card-header">
            <div className="sap-ecurity-avatar">
              <span className="ap-security-icon">👤</span>
            </div>
            <div className="ap-security-details">
              <h3>Harsh Agarwal</h3>
            </div>
            <button className="ap-security-edit-button">Edit ✏️</button>
          </div>
        </section>

        {/* Second Card */}
        <section className="ap-security-card">
          <div className="ap-security-card-header">
            <div className="ap-security-details">
              <h3>Security</h3>
              <p className="ap-security-password-label">Password</p>
              <p className="ap-security-password">************</p>
            </div>
            <button className="ap-security-edit-button">Edit ✏️</button>
          </div>
        </section>
      </div>
    );
  }
}

export default Security;