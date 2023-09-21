import menuIcon from "../assets/icons/menu-left.png";
import {Timer, AreaChart, Settings } from 'lucide-react';

const Menu = ({ view }) => {
  return (
    <>
      <nav className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer"
            className={
              view === "focus"
                ? "btn btn-primary drawer-button"
                : "btn btn-secondary drawer-button"
            }
          >
            <img src={menuIcon} className="md:h-6" alt="Menu Bar" />
          </label>
        </div>
        <div className="drawer-side z-10">
          
          <label htmlFor="my-drawer" className="drawer-overlay" />
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-lg">
            {/* Sidebar content here */}
            <li className="my-2">
            <a><Timer />POMO</a>
            </li>
            <li className="my-2">
              <a><AreaChart />Stats</a>
            </li>
            <li className="my-2">
              <a><Settings />Settings</a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Menu;
