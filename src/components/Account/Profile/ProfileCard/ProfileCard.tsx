import { Component } from 'react';
import './ProfileCard.css';

type ProfileCardProps = object;
type ProfileCardState = object;

class ProfileCard extends Component<ProfileCardProps, ProfileCardState> {
  render() {
    return (
      <section className="ap-profile-card">
        <div className="ap-profile-card-container">
          <div className="ap-profile-avatar">
            <span>H</span>
          </div>
          <div className="ap-profile-details">
            <h2>Harsh Agarwal</h2>
          </div>
          <button className="ap-edit-button">
            Edit <span className="ap-edit-icon">✏️</span>
          </button>
        </div>
      </section>
    );
  }
}

export default ProfileCard;