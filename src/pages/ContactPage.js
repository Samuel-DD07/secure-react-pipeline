import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const ContactPage = () => {
  return (
    <div className="flex justify-center items-center bg-gray-800 text-white p-10 h-[calc(100vh-60px)]">
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
        <div className="flex flex-col items-center">
          <a href="mailto:samuel.dorismond@yahoo.com" className="flex items-center mb-4">
            <MdOutlineEmail className="w-6 h-6 mr-2" />
            samuel.dorismond@yahoo.com
          </a>
          <a href="https://www.linkedin.com/in/samuel-dorismond-a5798321b/" target="_blank" rel="noopener noreferrer" className="flex items-center mb-4">
            <FaLinkedin className="w-6 h-6 mr-2" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
