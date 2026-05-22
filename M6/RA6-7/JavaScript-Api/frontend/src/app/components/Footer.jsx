const Footer = () => {
    return (
        <footer className="w-full h-16 md:h-14 sm:h-12 mt-auto flex items-center justify-center text-sm md:text-xs sm:text-xs text-gray-600 border-orange-500 border-2 bg-orange-300 px-4">
            <p className="text-center">© {new Date().getFullYear()} LEGO API. All rights reserved.</p>
        </footer>
    );
}

export default Footer;
