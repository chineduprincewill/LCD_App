import React, { useContext, useEffect, useState } from 'react'
import { HiOutlineOfficeBuilding, HiOutlineUser, HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineDashboard, AiOutlineLogout, AiOutlineWindows } from 'react-icons/ai'
import { FaDonate } from "react-icons/fa";
import { AuthContext } from '../../../context/AuthContex';
import { checkRole } from '../../../Hooks/functions';
import { Link, useLocation } from 'react-router-dom';

const NavDB = () => {

    const loctn = useLocation();
    const { user, role, shownav, logout } = useContext(AuthContext);
    const [navlinks, setNavlinks] = useState(null);

    const system_admin = [
      {
        id: 0,
        title: "Dashboard",
        icon: <AiOutlineDashboard className="nav-icon" />,
        url: '/dashboard',
      },
      {
        id: 1,
        title: "Branches",
        icon: <HiOutlineOfficeBuilding className="nav-icon" />,
        url: '/branches',
      },
      {
        id: 2,
        title: "Events",
        icon: <AiOutlineWindows className="nav-icon" />,
        url: '/events',
      },
      {
        id: 3,
        title: "Members",
        icon: <HiOutlineUser className="nav-icon" />,
        url: '/members',
      },
      {
        id: 4,
        title: "Donations",
        icon: <FaDonate className="nav-icon" />,
        url: '/donations',
      },
      {
        id: 5,
        title: "Users",
        icon: <HiOutlineUserGroup className="nav-icon" />,
        url: '/users',
      },
    ];
    
    const system_auditor = [
      {
        id: 0,
        title: "Dashboard",
        icon: <AiOutlineDashboard className="nav-icon" />,
        url: '/dashboard',
      },
      {
        id: 1,
        title: "Branches",
        icon: <HiOutlineOfficeBuilding className="nav-icon" />,
        url: '/branches',
      },
      {
        id: 2,
        title: "Events",
        icon: <AiOutlineWindows className="nav-icon" />,
        url: '/events',
      },
      {
        id: 3,
        title: "Members",
        icon: <HiOutlineUser className="nav-icon" />,
        url: '/members',
      },
      {
        id: 4,
        title: "Donations",
        icon: <FaDonate className="nav-icon" />,
        url: '/donations',
      },
      {
        id: 5,
        title: "Users",
        icon: <HiOutlineUserGroup className="nav-icon" />,
        url: '/users',
      },
    ];
    
    const admin = [
      {
        id: 0,
        title: "Dashboard",
        icon: <AiOutlineDashboard className="nav-icon" />,
        url: '/dashboard',
      },
      {
        id: 2,
        title: "Events",
        icon: <AiOutlineWindows className="nav-icon" />,
        url: '/events',
      },
      {
        id: 3,
        title: "Members",
        icon: <HiOutlineUser className="nav-icon" />,
        url: '/members',
      },
      {
        id: 4,
        title: "Donations",
        icon: <FaDonate className="nav-icon" />,
        url: '/donations',
      },
      {
        id: 5,
        title: "Users",
        icon: <HiOutlineUserGroup className="nav-icon" />,
        url: '/users',
      },
    ]

    const auditor = [
      {
        id: 0,
        title: "Dashboard",
        icon: <AiOutlineDashboard className="nav-icon" />,
        url: '/dashboard',
      },
      {
        id: 2,
        title: "Events",
        icon: <AiOutlineWindows className="nav-icon" />,
        url: '/events',
      },
      {
        id: 3,
        title: "Members",
        icon: <HiOutlineUser className="nav-icon" />,
        url: '/members',
      },
      {
        id: 4,
        title: "Donations",
        icon: <FaDonate className="nav-icon" />,
        url: '/donations',
      },
      {
        id: 5,
        title: "Users",
        icon: <HiOutlineUserGroup className="nav-icon" />,
        url: '/users',
      },
    ]

    const handleLogout = () => {
      logout();
    }

    const getUserLinks = () => {
      checkRole(user, role, system_admin, system_auditor, admin, auditor, setNavlinks);
      //location.reload();
    };
  
    useEffect(() => {
      getUserLinks();
    }, []);

    return (
      <ul className="w-[80%]">
      {navlinks !== null &&
        navlinks.map((nav) => {
          return (
            <li
              key={nav.id}
              className={`${
                loctn.pathname === nav.url
                  ? "bg-white text-[#0b1425]"
                  : "text-gray-300"
              } p-2 rounded-sm`}
            >
              <Link
                to={nav.url}
                key={nav.id}
                className="flex justify-start items-center space-x-3 my-2"
              >
                {nav.icon}
                <span className={`${shownav ? "block" : "hidden"} lg:block`}>
                  {nav.title}
                </span>
              </Link>
            </li>
          );
        })}

      <li className={`text-white px-2 py-2 rounded-sm`}>
        <div
          className="flex justify-start items-center space-x-3 my-2 cursor-pointer"
          onClick={() => handleLogout()}
        >
          <AiOutlineLogout size={15} />
          <span className={`${shownav ? "block" : "hidden"} lg:block`}>
            Logout
          </span>
        </div>
      </li>
    </ul>
    )
}

export default NavDB