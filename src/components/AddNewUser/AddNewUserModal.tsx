import React from 'react';
import { Modal, Input, Button, Select, DatePicker } from 'antd';
import { UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined } from '@ant-design/icons';
import './AddNewUserModal.css';

const { Option } = Select;

interface AddNewUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  onNext: (formData: any) => void; // Callback for submitting form data
}

const AddNewUserModal: React.FC<AddNewUserModalProps> = ({ isVisible, onClose, onNext }) => {
  const handleNext = () => {
    // Collect form data and pass to the onNext callback
    onNext({
      // Replace with actual form data when handling form submission
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      country: '',
    });
  };

  return (
    <Modal
      visible={isVisible}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      closeIcon={<span style={{ fontSize: '18px' }}>✖</span>}
      className="add-new-user-modal"
    >
      <div className="modal-header">
        <h2>Add new user</h2>
        <p>Welcome to the new user page.</p>
      </div>

      <div className="modal-content">
        <div className="form-row">
          <Input
            placeholder="First Name*"
            prefix={<UserOutlined />}
            className="form-input"
          />
          <Input
            placeholder="Last Name*"
            prefix={<UserOutlined />}
            className="form-input"
          />
        </div>
        <div className="form-row">
          <Input
            placeholder="Enter Email*"
            prefix={<MailOutlined />}
            className="form-input"
          />
          <Input
            placeholder="Phone Number*"
            prefix={<PhoneOutlined />}
            className="form-input"
            addonBefore={<img src="https://flagcdn.com/w40/in.png" alt="India Flag" className="country-flag" />}
          />
        </div>
        <div className="form-row">
          <DatePicker
            placeholder="Date of Birth*"
            className="form-input"
            format="YYYY-MM-DD"
            suffixIcon={<CalendarOutlined />}
          />
          <Select placeholder="Gender" className="form-input">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </div>
        <div className="form-row">
          <Input
            placeholder="Country of residence"
            prefix={
              <img
                src="https://flagcdn.com/w40/in.png"
                alt="India Flag"
                className="country-flag"
              />
            }
            className="form-input"
          />
        </div>
      </div>

      <div className="modal-footer">
        <Button type="primary" className="next-button" onClick={handleNext}>
          Next
        </Button>
      </div>
    </Modal>
  );
};

export default AddNewUserModal;