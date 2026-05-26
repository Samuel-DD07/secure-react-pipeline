import React from "react";
import { Link } from "react-router-dom";

const MainSection = () => {
  return (
    <section className="flex-grow text-white bg-gray-900 p-20 h-[calc(100vh-60px)]">
      <div className="mx-auto flex flex-col items-start justify-center h-full">
        <h1 className="title-font md:text-6xl font-bold mb-4 text-4xl">
          I am Samuel Dorismond
        </h1>
        <p className="mb-8 leading-relaxed max-w-md">
          3rd year Computer Science Student at IUT Sorbonne Paris
          Nord and Web Development Lead at{" "}
          <a href="https://www.issho-partners.com/" className="text-white" target="_blank" rel="noreferrer"> 
            issho Partners
          </a>
          .
        </p>
        <div className="flex md:flex-row flex-col items-center md:w-auto w-full gap-4">
          <Link
            to="/projects"
            className="text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded text-lg w-full text-center md:w-auto"
          >
            View my projects
          </Link>
          <Link
            to="/contact"
            className="text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg w-full text-center md:w-auto"
          >
            Contact me
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
