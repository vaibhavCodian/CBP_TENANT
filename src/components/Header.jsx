import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Header = ({ title }) => {
    const [token, setToken] = useContext(UserContext);
    const handleLogout = () => {
        setToken(null);
    };

    return (
        <div className="has-text-centered m-6">
            <h1 className="title">{title}  &#10162;
            {token && (
                <button
                    className="button mr-2 is-danger is-light"
                    onClick={handleLogout}
                >Logout &#8594;</button>
            )}
            </h1>
            
        </div>
    )

};

export default Header;