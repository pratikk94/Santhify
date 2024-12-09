import { Component } from "react";
import './ProfileSidebar.css';

type SidebarProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
};

class Sidebar extends Component<SidebarProps> {
  render() {
    const { activeTab, onTabChange } = this.props;

    return (
      <div className="ap-sidebar">
        <h2>Account</h2>
        <nav>
          <ul>
            <li
              className={activeTab === "Profile" ? "active" : ""}
              onClick={() => onTabChange("Profile")}
            >
              <span>📂</span> Profile
            </li>
            <li
              className={activeTab === "Security" ? "active" : ""}
              onClick={() => onTabChange("Security")}
            >
              <span>🔒</span> Security
            </li>
            <li
              className={activeTab === "Notifications" ? "active" : ""}
              onClick={() => onTabChange("Notifications")}
            >
              <span>🔔</span> Notifications
            </li>
            <li
              className={activeTab === "Users" ? "active" : ""}
              onClick={() => onTabChange("Users")}
            >
              <span>👥</span> Users
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Sidebar;