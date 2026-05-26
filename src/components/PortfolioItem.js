import React from "react";

const PortfolioItem = ({
  title,
  description,
  tags,
  imageUrl,
  link,
  images,
  softSkills,
}) => {
  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-lg m-4 overflow-y-scroll h-[calc(100vh-290px)] md:h-full max-h-[calc(100vh-120px)] custom-scrollbar">
      {/* <img src={imageUrl} alt={title} className="w-full h-72 object-cover object-top rounded-t-lg" /> */}
      <div className="p-4 md:p-10">
        <h3 className="text-xl md:text-3xl font-bold mb-10">{title}</h3>
        <h5 className="text-xl font-semibold text-gray-300 mb-4">
          Description:
        </h5>
        <p className="text-gray-300 text-base mb-10">{description}</p>
        <h5 className="text-xl font-semibold text-gray-300 mb-4 mr-2">
          Hard Skills:
        </h5>
        <div className="flex flex-wrap mb-5">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-sm font-semibold m-1 px-3 py-1 bg-gray-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <h5 className="text-xl font-semibold text-gray-300 mb-4 mr-2">
          Soft Skills:
        </h5>
        <div className="flex flex-wrap mb-5">
          {softSkills.map((softSkill, index) => (
            <span
              key={index}
              className="text-sm font-semibold m-1 px-3 py-1 bg-gray-700 rounded-full"
            >
              {softSkill}
            </span>
          ))}
        </div>
        {images?.length > 0 && (
          <div className="flex mt-10 flex-col">
            <h5 className="text-xl font-semibold text-gray-300 mb-4 mr-2">
              Images and Renderings:
            </h5>
            <div className="flex flex-wrap gap-3">
              {images?.map((image, index) => (
                <div
                  key={index}
                  className="p-2 bg-gray-700 rounded-lg h-64 cursor-pointer w-80"
                  onClick={() => window.open(image, "_blank")}
                >
                  <img
                     src={image}
                     alt={title}
                     className="object-cover rounded-lg w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mt-10 mb-4">
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="text-md font-semibold text-gray-100 hover:text-white bg-gray-700 px-4 py-3 rounded"
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioItem;
