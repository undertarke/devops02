import { Link } from "react-router-dom";
import SvgSprite from "./SvgSprite";

const Layout = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-9 col-md-8 col-sm-6">
          <div className="btn-book text-end">
            <Link to="/login" className="btn btn-medium btn-outline-primary btn-pill text-uppercase me-2">Login</Link>
            <Link to="/register" className="btn btn-medium btn-primary btn-pill text-uppercase">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout; 