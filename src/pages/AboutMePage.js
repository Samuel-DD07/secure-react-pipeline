import React from "react";
import MyPhoto from "../assets/IMG_6751.JPG";

const AboutMePage = () => {
  return (
    <div className="text-white p-10">
      <div className="flex flex-col items-center mb-6 gap-4">
        <img
          src={MyPhoto}
          alt="Samuel Dorismond"
          className="rounded-full w-52 h-52 mb-4 object-cover filter grayscale"
        />
        <h1 className="text-4xl font-bold mb-4">
          My name is Samuel Dorismond.
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Introduction:</h3>
          <p className="mb-2 bg-gray-800 p-4 rounded-lg">
            I am 20 years old. I am a 3rd year Computer Science student in a
            work-study program at Villetaneuse Sorbonne Paris Nord University.
          </p>
          <p className="mb-2 bg-gray-800 p-4 rounded-lg">
            I am passionate about web development and design. I enjoy
            creating websites and web applications.
          </p>
          <p className="mb-2 bg-gray-800 p-4 rounded-lg">
            I am also passionate about graphic design; I love creating logos,
            posters, flyers, business cards, banners, and illustrations.
          </p>
          <p className="mb-2 bg-gray-800 p-4 rounded-lg">
            Additionally, I am the lead developer for the company
            issho Partners. You can visit it
            <a
              href="https://issho-partners.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              {" "}
              here
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col items-center mb-6 justify-center">
          <h3 className="text-2xl font-bold mb-10">Experience & Education:</h3>
          <div className="flex flex-row flex-wrap gap-3 my-2 justify-center">
            <p className="mb-2 bg-gray-800 p-4 rounded-lg lg:w-auto w-full">
              2022 - Present: <br />
              <strong>Lead Web Developer</strong> <br />
              at issho Partners.
            </p>
            <p className="mb-2 bg-gray-800 p-4 rounded-lg lg:w-auto w-full">
              2021 - Present: <br />
              <strong>B.U.T. in Computer Science (Work-Study)</strong> <br />at
              Villetaneuse Sorbonne Paris Nord University.
            </p>
            <p className="mb-2 bg-gray-800 p-4 rounded-lg lg:w-auto w-full">
              2018 - 2021: <br />
              <strong>
                General Baccalaureate <br />
                (Mathematics & Physics-Chemistry Specialization)
              </strong>{" "}
              <br />
              at André Boulloche High School.
            </p>
          </div>
        </div>
        {CompetencesSection()}
      </div>
    </div>
  );
};

const CompetencesSection = () => {
  return (
    <div className="flex flex-col items-center mb-6 justify-center">
      <h3 className="text-2xl font-bold mb-10">Skills:</h3>
      <div className="flex flex-row flex-wrap gap-3 my-2 justify-center">
        <Category
          title="Front-End Development"
          skills={[
            "HTML",
            "CSS",
            "JavaScript",
            "React.js",
            "Next.js",
            "Three.js",
            "Angular js",
            "Vue.js",
            "TypeScript",
            "Tailwind CSS",
            "Bootstrap",
          ]}
        />
        <Category
          title="Design & UX/UI"
          skills={["Figma", "Photoshop", "Illustrator", "Adobe XD"]}
        />
        <Category
          title="Back-End Development"
          skills={[
            "Node.js",
            "Express.js",
            "Solidity",
            "PHP",
            "Laravel",
            "Python",
            "Flask",
            "PostgreSQL",
            "MongoDB",
          ]}
        />
        <Category
          title="Tools & Environment"
          skills={[
            "Git",
            "GitHub",
            "VS Code",
            "Windows",
            "Mac OS",
            "Linux",
            "Azure",
            "Heroku",
            "Vercel",
          ]}
        />
      </div>
    </div>
  );
};

const Category = ({ title, skills }) => {
  return (
    <div className="w-full flex flex-col items-center mb-6 justify-center">
      <h4 className="text-lg font-semibold mb-2 w-full md:w-1/4 bg-gray-700 p-3 rounded-lg text-center">
        {title}
      </h4>
      <div className="flex flex-row flex-wrap gap-3 my-2 justify-center">
        {skills.map((skill) => (
          <p key={skill} className="mb-2 bg-gray-800 p-4 rounded-lg">
            <strong>{skill}</strong>
          </p>
        ))}
      </div>
    </div>
  );
};

export default AboutMePage;
