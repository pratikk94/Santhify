import { Component } from "react";
import UserGrid from "./UserGrid/UserGrid";


type UserManagementState = {
  activeTab: string;
};

class UserManagement extends Component<object, UserManagementState> {
  constructor(props: object) {
    super(props);
    this.state = {
      activeTab: "Profile", // Default tab
    };
  }

  handleTabChange = (tab: string) => {
    this.setState({ activeTab: tab });
  };

  
  render() {
    
    return (
      <div className="ap-app-container">
        <main className="ap-main-content">
            <UserGrid/>
        </main>
      </div>
    );
  }
}

export default UserManagement;