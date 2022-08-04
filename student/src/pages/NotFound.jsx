import { Link } from "react-router-dom";

const NotFound = (props) => {
  return (
    <div className="not-found">
      <div className="not-found__modal">
        <div className="not-found__modal--top">
          <h1>
            404 | <span className="lw">Page Not Found</span>
          </h1>
        </div>
        <div className="not-found__modal--bottom">
          <Link to={"/"}>
            <button>Back Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
