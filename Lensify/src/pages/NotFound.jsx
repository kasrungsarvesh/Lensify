import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import "./NotFound.css";

function NotFound() {

    const navigate = useNavigate();

    return (

        <div className="notfound-container">

            <div className="notfound-card">

                <FaExclamationTriangle className="notfound-icon"/>

                <h1>404</h1>

                <h2>Page Not Found</h2>

                <p>
                    The page you are looking for doesn't exist,
                    has been moved, or the URL is incorrect.
                </p>

                <div className="notfound-buttons">

                    <button
                        onClick={()=>navigate(-1)}
                        className="back-btn"
                    >

                        <FaArrowLeft/>

                        Go Back

                    </button>

                    <Link
                        to="/dashboard"
                        className="home-btn"
                    >

                        <FaHome/>

                        Dashboard

                    </Link>

                </div>

                <small>

                    Lensify Optical Management System

                </small>

            </div>

        </div>

    );

}

export default NotFound;