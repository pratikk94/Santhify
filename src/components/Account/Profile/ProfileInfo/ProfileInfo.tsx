import { Component } from 'react';
import './ProfileInfo.css';

type PersonalInfoProps = object;
type PersonalInfoState = object;

class PersonalInfo extends Component<PersonalInfoProps, PersonalInfoState> {
  render() {
    return (
      <section className="ap-personal-info-card">
        <div className="ap-card-header">
          <h2>Personal Information</h2>
          <button className="ap-edit-button">
            Edit <span className="ap-edit-icon">✏️</span>
          </button>
        </div>
        <div className="ap-card-content">
          <div className="ap-info-block">
            <strong>First Name</strong>
            <p>Harsh</p>
          </div>
          <div className="ap-info-block">
            <strong>Last Name</strong>
            <p>Agarwal</p>
          </div>
          <div className="ap-info-block">
            <strong>Email address</strong>
            <p>
              harshagarwal@gmail.com <span className="ap-verified">Verified</span>
            </p>
          </div>
          <div className="ap-info-block">
            <strong>Phone</strong>
            <p>+91 9876 543 321</p>
          </div>
          <div className="ap-info-block">
            <strong>Date of Birth</strong>
            <p>31/12/1999</p>
          </div>
          <div className="ap-info-block">
            <strong>Gender</strong>
            <p>Male</p>
          </div>
        </div>
      </section>
    );
  }
}

export default PersonalInfo;