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
          Je m'appelle Samuel Dorismond.
        </h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-2">Présentation :</h3>
          <p className="mb-2 bg-gray-800 p-4 rounded-lg">
            J'ai 20 ans. Etudiant en 3ème année de B.U.T informatique en
            alternance à l'Université Villetaneuse Sorbonne Paris Nord.
          </p>
          <p className="mb-2 bg-gray-800 p-4 rounded-lg">
            Je suis passionné par le développement web et le design. J'aime
            créer des sites web et des applications web.
          </p>
          <p className="mb-2 bg-gray-800 p-4 rounded-lg">
            Je suis également passionné par le design, j'aime créer des logos,
            des affiches, des flyers, des cartes de visite, des bannières et des
            illustrations.
          </p>
          <p className="mb-2 bg-gray-800 p-4 rounded-lg">
            De plus, je suis responsable de développement de la plateforme de
            l'entreprise issho. Vous pouvez la visiter
            <a
              href="https://issho-partners.com"
              target="_blank"
              rel="noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              {" "}
              ici
            </a>
            .
          </p>
        </div>
        <div className="flex flex-col items-center mb-6 justify-center">
          <h3 className="text-2xl font-bold mb-10">Parcours :</h3>
          <div className="flex flex-row flex-wrap gap-3 my-2 justify-center">
            <p className="mb-2 bg-gray-800 p-4 rounded-lg lg:w-auto w-full">
              2022 - En cours : <br />
              <strong>Responsable du développement web</strong> <br />
              dans l'entreprise issho.
            </p>
            <p className="mb-2 bg-gray-800 p-4 rounded-lg lg:w-auto w-full">
              2021 - En cours : <br />
              <strong>B.U.T informatique en alternance</strong> <br />à
              l'Université Villetaneuse Sorbonne Paris Nord.
            </p>
            <p className="mb-2 bg-gray-800 p-4 rounded-lg lg:w-auto w-full">
              2018 - 2021 : <br />
              <strong>
                BAC GENERAL <br />
                (Option Mathématique et Physique-Chimie)
              </strong>{" "}
              <br />
              au lycée André Boulloche.
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
      <h3 className="text-2xl font-bold mb-10">Compétences :</h3>
      <div className="flex flex-row flex-wrap gap-3 my-2 justify-center">
        <Category
          title="Développement Front-End"
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
          title="Développement Back-End"
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
          title="Environnement de travail"
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
