import { useContext } from "react"
import { UserContext } from "../context/UserContext"

const Header = ({ title }) => {
    const [token, setToken] = useContext(UserContext);
    const handleLogout = () => {
        setToken(null);
    };

    return (
        <div className="has-text-centered m-6">
            <img src="logo.png" alt="" width="150px" />
            <p className="title">{title}
            {token && (
                <button
                    className="button mr-2 is-danger is-light"
                    onClick={handleLogout}
                >Logout &#8594;</button>
            )}
            </p>
            
        </div>
    )

};

export default Header;