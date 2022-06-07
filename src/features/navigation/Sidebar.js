import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Button } from "react-bootstrap";
import { Link, Route } from "react-router-dom";

const Sidebar = (props) => {
  const [inactive, setInactive] = useState(false);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="toggle-btn">
          <Button
            variant="outline-light"
            onClick={() => setInactive(!inactive)}
            className="menu-btn"
          >
            <AiOutlineMenu />
          </Button>
        </div>
      </div>
      <div className="main-menu">
      <Link className="menu-item" to={"/home"}>
          Home
        </Link>
        <br />
        <Link className="menu-item" to={"/admins/create"}>
          Create Admin
        </Link>
        <br />
        <Link className="menu-item" to={"/admins/list"}>
          List Admin
        </Link>
        <br />
        <Link className="menu-item" to={"/clients/create"}>
          Create Client
        </Link>
        <br />
        <Link className="menu-item" to={"/clients/list"}>
          List Client
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
