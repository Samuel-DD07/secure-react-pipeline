import React from "react";
import photo from "../assets/IMG_6751.JPG";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ProfileCard = () => {
  return (
    <div
      className="lg:w-2/4 bg-gray-800 p-10 flex flex-col items-center text-white justify-end md:h-[calc(100vh-60px)] h-screen"
      style={{
        backgroundImage: `url(${photo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        opacity: "0.9",
        filter: "grayscale(100%)", // Ajouter le filtre en noir et blanc
      }}
    >
      <h3 className="font-bold text-2xl mb-2">Samuel Dorismond</h3>
      <p className="text-lg text-center">
        Etudiant et Responsable en développement web
      </p>
      <div className="flex mt-4">
        <a href="mailto:samuel.dorismond@yahoo.com" className="text-white mx-2">
          <MdEmail className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/samuel-dorismond-a5798321b"
          className="text-white mx-2"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin className="w-6 h-6" />
        </a>
        <a href="https://github.com/Samuel-DD07" className="text-white mx-2">
          <FaGithub className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};

export default ProfileCard;
