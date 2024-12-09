import React, { Component } from 'react';
import './ChangePasswordModal.css';

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (currentPassword: string, newPassword: string) => void;
};

type ChangePasswordModalState = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  error: string;
};

class ChangePasswordModal extends Component<
  ChangePasswordModalProps,
  ChangePasswordModalState
> {
  constructor(props: ChangePasswordModalProps) {
    super(props);
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      error: '',
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<
      ChangePasswordModalState,
      keyof ChangePasswordModalState
    >);
  };

  handleSave = () => {
    const { currentPassword, newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword) {
      this.setState({ error: 'Passwords do not match' });
    } else {
      this.setState({ error: '' });
      this.props.onSave(currentPassword, newPassword);
    }
  };

  render() {
    const { isOpen, onClose } = this.props;
    const { currentPassword, newPassword, confirmPassword, error } = this.state;

    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <button className="back-button" onClick={onClose}>
            ← Back
          </button>
          <h2>Change Password</h2>
          <p>Create a new password that is at least 8 characters long</p>
          <div className="modal-body">
            <label>
              Type your current password*
              <input
                type="password"
                name="currentPassword"
                placeholder="Current password"
                value={currentPassword}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Type your new password*
              <input
                type="password"
                name="newPassword"
                placeholder="New password"
                value={newPassword}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Retype your new password*
              <input
                type="password"
                name="confirmPassword"
                placeholder="New password"
                value={confirmPassword}
                onChange={this.handleInputChange}
              />
            </label>
            {error && <p className="error-message">{error}</p>}
          </div>
          <div className="modal-footer">
            <button className="save-button" onClick={this.handleSave}>
              Save Password
            </button>
            <p className="forgot-password">Forgot Password?</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePasswordModal;