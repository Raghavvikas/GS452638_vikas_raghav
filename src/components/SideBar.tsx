import React from "react";
import { Nav } from "react-bootstrap";
import { FaShapes, FaStoreAlt, FaChartBar } from "react-icons/fa";
import { MdInsertChartOutlined } from "react-icons/md";
import Image from "react-bootstrap/Image";
import { useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside
      className="bg-light text-dark d-flex flex-column vh-100 border-end"
      style={{ width: "250px" }}
    >
      {/* Navigation Links */}
      <Nav className="flex-column mt-2">
        <Nav.Link
          href="/stores"
          className={`d-flex align-items-center text-dark px-4 py-2 ${
            location.pathname === "/stores" ? "bg-secondary bg-opacity-25" : ""
          }`}
        >
          <FaStoreAlt className="me-2" size={18} />
          <span>Store</span>
        </Nav.Link>
        <Nav.Link
          href="/skus"
          className={`d-flex align-items-center text-dark px-4 py-2 ${
            location.pathname === "/skus" ? "bg-secondary bg-opacity-25 rounded" : ""
          }`}
        >
          <FaShapes className="me-2" size={18} />
          <span>SKU</span>
        </Nav.Link>
        <Nav.Link
          href="/planning"
          className={`d-flex align-items-center text-dark px-4 py-2 ${
            location.pathname === "/planning" ? "bg-secondary bg-opacity-25 rounded" : ""
          }`}
        >
          <FaChartBar className="me-2" size={18} />
          <span>Planning</span>
        </Nav.Link>
        <Nav.Link
          href="/chart"
          className={`d-flex align-items-center text-dark px-4 py-2 ${
            location.pathname === "/chart" ? "bg-secondary bg-opacity-25 rounded" : ""
          }`}
        >
          <MdInsertChartOutlined className="me-2" size={18} />
          <span>Charts</span>
        </Nav.Link>
      </Nav>
    </aside>
  );
};

export default Sidebar;
