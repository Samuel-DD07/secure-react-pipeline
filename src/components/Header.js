import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import CV from "../assets/CV.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="bg-gray-800 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center w-full justify-between">
          <Link to="/" className="text-xl font-bold">
            <h1 className="mr-10">DORISMOND</h1>
          </Link>
          <button
            className="text-white inline-flex items-center justify-center p-2 rounded-md hover:text-gray-400 lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <IoIosClose className="w-8 h-8" />
            ) : (
              <CiMenuFries className="w-8 h-8" />
            )}
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "right-0" : "-right-full"
          } fixed top-12 w-full h-full bg-gray-800 bg-opacity-75 lg:bg-opacity-0 lg:bg-transparent lg:static lg:block transition-all duration-300 ease-in-out lg:w-auto`}
        >
          <nav className="h-full flex flex-col justify-center items-end mr-10 lg:mr-0 lg:flex-row">
            <ul className="flex lg:flex-row gap-7 text-md">
              <li className="my-1 lg:my-0 w-[max-content]">
                <Link to="/about" className="text-white hover:text-gray-300">
                  A PROPOS
                </Link>
              </li>
              <li className="my-1 lg:my-0">
                <Link to="/projets" className="text-white hover:text-gray-300">
                  PROJETS
                </Link>
              </li>
              <li className="my-1 lg:my-0">
                <Link to="/contact" className="text-white hover:text-gray-300">
                  CONTACT
                </Link>
              </li>
              <li className="my-1 lg:my-0">
                <a
                  href="https://www.linkedin.com/in/samuel-dorismond-a5798321b"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-gray-300"
                >
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </li>
              <li className="my-1 lg:my-0">
                <a
                  href="https://github.com/Samuel-DD07"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-gray-300"
                >
                  <FaGithub className="w-6 h-6" />
                </a>
              </li>
              <li className="my-1 lg:my-0">
                <a
                  href={CV}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-gray-300"
                >
                  CV
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
