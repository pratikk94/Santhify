import { Component } from 'react';
import './Security.css';
import EditModal from '../Modals/EditModal'; // Change Name Modal
import ChangePasswordModal from '../Modals/ChangePasswordModal'; // Change Password Modal

type SecurityState = {
  isModalOpen: boolean;
  modalType: 'name' | 'password' | ''; // Define the type of modal
  firstName: string;
  lastName: string;
};

class Security extends Component<object, SecurityState> {
  constructor(props: object) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalType: '',
      firstName: 'Harsh',
      lastName: 'Agarwal',
    };
  }

  openModal = (modalType: 'name' | 'password') => {
    this.setState({ isModalOpen: true, modalType });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, modalType: '' });
  };

  saveNameChanges = (firstName: string, lastName: string) => {
    this.setState({
      firstName,
      lastName,
      isModalOpen: false,
      modalType: '',
    });
  };

  savePasswordChanges = (currentPassword: string, newPassword: string) => {
    console.log('Current Password:', currentPassword);
    console.log('New Password:', newPassword);
    this.setState({ isModalOpen: false, modalType: '' });
  };

  render() {
    const { isModalOpen, modalType, firstName, lastName } = this.state;

    return (
      <div className="ap-security-section">
        {/* First Card */}
        <section className="ap-security-card">
          <div className="ap-security-card-header">
            <div className="sap-security-avatar">
              <span className="ap-security-icon">👤</span>
            </div>
            <div className="ap-security-details">
              <h3>{firstName} {lastName}</h3>
            </div>
            <button
              className="ap-security-edit-button"
              onClick={() => this.openModal('name')}
            >
              Edit ✏️
            </button>
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
            <button
              className="security-edit-button"
              onClick={() => this.openModal('password')}
            >
              Edit ✏️
            </button>
          </div>
        </section>

        {/* Modals */}
        {modalType === 'name' && (
          <EditModal
            isOpen={isModalOpen}
            onClose={this.closeModal}
            onSave={this.saveNameChanges}
            firstName={firstName}
            lastName={lastName}
          />
        )}

        {modalType === 'password' && (
          <ChangePasswordModal
            isOpen={isModalOpen}
            onClose={this.closeModal}
            onSave={this.savePasswordChanges}
          />
        )}
      </div>
    );
  }
}

export default Security;