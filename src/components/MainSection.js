import React from "react";
import { Link } from "react-router-dom";

const MainSection = () => {
  return (
    <section className="flex-grow text-white bg-gray-900 p-20 h-[calc(100vh-60px)]">
      <div className="mx-auto flex flex-col items-start justify-center h-full">
        <h1 className="title-font md:text-6xl font-bold mb-4 text-4xl">
          Je suis Samuel Dorismond
        </h1>
        <p className="mb-8 leading-relaxed max-w-md">
          Etudiant en 3ème année de BUT Informatique à l'IUT de Sorbonne Paris
          Nord et Responsable en développement web chez{" "}
          <a href="https://www.issho-partners.com/" className="text-white" target="_blank" rel="noreferrer"> 
            issho Partners
          </a>
          .
        </p>
        <div className="flex md:flex-row flex-col items-center md:w-auto w-full gap-4">
          <Link
            to="/projets"
            className="text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-lg w-full text-center md:w-auto"
          >
            Voir mes projets
          </Link>
          <Link
            to="/contact"
            className="text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg w-full text-center md:w-auto"
          >
            Me contacter
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
