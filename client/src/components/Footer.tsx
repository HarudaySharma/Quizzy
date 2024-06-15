
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer
            role="contentinfo"
            className="
                bg-gray-200
                border-t
                border-gray-300
                w-full 
                text-center 
                py-4
                mx-auto
            "
        >
            <div className="w-fit mx-auto">
                <p className="mx-auto" >
                    Copyright &copy; {currentYear}
                </p>
                <hr className="w-full border-black" />
                <p className="mx-auto" >
                    Created by Haruday
                </p>
            </div>
        </footer>
    );
}

export default Footer;

