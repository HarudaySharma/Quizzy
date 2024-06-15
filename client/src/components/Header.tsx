import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {

    return (
        <Link
            to={'/'}
            className="
                w-fit
                block
                pt-2
                pl-2
                cursor-pointer 
            "
        >
            <img
                src={Logo}
                className="
                    object-cover                    
                    w-16                            
                    rounded-full                    
                    h-16                            
                    z-10                            
                    outline-offset-2                
                    hover:w-20
                    hover:h-20
                "
            />
        </Link>
    )
}

export default Header;
