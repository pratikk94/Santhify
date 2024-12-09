import { Component } from "react";
import Sidebar from "./ProfileSidebar/ProfileSidebar";
import ProfileCard from "./Profile/ProfileCard/ProfileCard";
import PersonalInfo from "./Profile/ProfileInfo/ProfileInfo";
import Address from "./Profile/Address/Address";
import Security from "./Security/Security";
import './Account.css';

type AccountCompState = {
  activeTab: string;
};

class AccountComp extends Component<object, AccountCompState> {
  constructor(props: object) {
    super(props);
    this.state = {
      activeTab: "Profile", // Default tab
    };
  }

  handleTabChange = (tab: string) => {
    this.setState({ activeTab: tab });
  };

  renderContent() {
    const { activeTab } = this.state;

    switch (activeTab) {
      case "Profile":
        return (
          <>
            <h1>My Profile</h1>
            <ProfileCard />
            <PersonalInfo />
            <Address />
          </>
        );
      case "Security":
        return (
          <>
            <h1>Security</h1>
            <Security />
          </>
        );
      case "Notifications":
        return (
          <>
            <h1>Notifications</h1>
            <div>Notifications Content</div>
          </>
        );
      case "Users":
        return (
          <>
            <h1>Users</h1>
            <div>Users Content</div>
          </>
        );
      default:
        return <div>Content Not Found</div>;
    }
  }

  render() {
    const { activeTab } = this.state;

    return (
      <div className="ap-app-container">
        <Sidebar activeTab={activeTab} onTabChange={this.handleTabChange} />
        <main className="ap-main-content">{this.renderContent()}</main>
      </div>
    );
  }
}

export default AccountComp;