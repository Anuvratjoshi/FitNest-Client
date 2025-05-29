import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard1, setIsDashboard1] = useState(false);

  const [iscurrentState, setIscurrentState] = useState("Dashboard1");

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard1") {
      setIsDashboard1(false);
    }
  }, [history, iscurrentState, isDashboard1]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "manage-user",
      label: "Manage Users",
      icon: "ri-dashboard-2-line",
      link: "/#",
      allowedRoles: ["admin", "superadmin"],
      stateVariables: isDashboard1,
      click: function (e) {
        e.preventDefault();
        setIsDashboard1(!isDashboard1);
        setIscurrentState("Dashboard1");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "users",
          label: "Users",
          link: "/dashboard-analytics",
          parentId: "manage-user",
        },
        {
          id: "analytics",
          label: "Analytics",
          link: "/analytics",
          parentId: "manage-user",
        },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
