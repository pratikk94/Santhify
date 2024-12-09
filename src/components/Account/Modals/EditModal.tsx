import React, { Component } from 'react';
import './EditModal.css';

type EditModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave?: (firstName: string, lastName: string) => void; // Optional for password
  firstName?: string;
  lastName?: string;
};

type EditModalState = {
  firstName: string;
  lastName: string;
};

class EditModal extends Component<EditModalProps, EditModalState> {
  constructor(props: EditModalProps) {
    super(props);
    this.state = {
      firstName: props.firstName || '',
      lastName: props.lastName || '',
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.name]: e.target.value } as Pick<
      EditModalState,
      keyof EditModalState
    >);
  };

  handleSave = () => {
    const { firstName, lastName } = this.state;
    if (this.props.onSave) {
      this.props.onSave(firstName, lastName);
    }
  };

  render() {
    const { isOpen, onClose } = this.props;
    const { firstName, lastName } = this.state;

    if (!isOpen) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-container">
          <div className="modal-header">
            <h2>{this.props.onSave ? 'Edit your name' : 'Edit your password'}</h2>
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            {this.props.onSave ? (
              <>
                <label>
                  First name
                  <input
                    type="text"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleChange}
                  />
                </label>
                <label>
                  Last name
                  <input
                    type="text"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleChange}
                  />
                </label>
              </>
            ) : (
              <label>
                New Password
                <input type="password" name="password" />
              </label>
            )}
          </div>
          <div className="modal-footer">
            <button className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button className="save-button" onClick={this.handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EditModal;