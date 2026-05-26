import React from "react";
import Header from "./components/Header";
import Portfolio from "./pages/Portfolio";
import HomePage from "./pages/HomePage";
import AboutMePage from "./pages/AboutMePage";
import ContactPage from "./pages/ContactPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import image0 from "./assets/Screenshot 2023-12-27 at 14.27.28.png";
import image1 from "./assets/Screenshot 2023-12-27 at 12.31.02.png";
import image2 from "./assets/Screenshot 2023-12-27 at 12.32.23.png";
import image3 from "./assets/Screenshot 2023-12-27 at 12.32.58.png";
import image4 from "./assets/Screenshot 2023-12-27 at 12.34.31.png";
import image5 from "./assets/Screenshot 2023-12-27 at 14.21.39.png";
import image6 from "./assets/Screenshot 2023-12-27 at 14.22.28.png";
import image7 from "./assets/Screenshot 2023-12-27 at 14.30.56.png";
import image8 from "./assets/Screenshot 2023-12-27 at 14.31.05.png";
import image9 from "./assets/Screenshot 2023-12-27 at 14.31.17.png";
import image10 from "./assets/Screenshot 2023-12-27 at 14.31.33.png";
import image11 from "./assets/Screenshot 2023-12-27 at 14.34.09.png";
import image12 from "./assets/Screenshot 2023-12-27 at 14.35.59.png";
import image13 from "./assets/Screenshot 2023-12-27 at 14.36.17.png";
import image14 from "./assets/Screenshot 2023-12-27 at 14.36.35.png";
import image15 from "./assets/Screenshot 2023-12-27 at 14.36.51.png";
import image16 from "./assets/Screenshot 2023-12-27 at 14.37.09.png";
import image17 from "./assets/Screenshot 2023-12-27 at 14.39.27.png";
import image18 from "./assets/Screenshot 2023-12-27 at 14.42.19.png";
import image19 from "./assets/Screenshot 2023-12-27 at 14.42.25.png";
import image20 from "./assets/Screenshot 2023-12-27 at 14.42.32.png";
import image21 from "./assets/Screenshot 2023-12-27 at 14.45.37.png";
import image22 from "./assets/Screenshot 2023-12-27 at 14.45.43.png";
import image23 from "./assets/Screenshot 2023-12-27 at 14.46.00.png";
import image24 from "./assets/Screenshot 2023-12-27 at 14.46.21.png";
import image25 from "./assets/Screenshot 2023-12-27 at 14.47.34.png";
import image26 from "./assets/Screenshot 2023-12-27 at 14.47.44.png";
import image27 from "./assets/Screenshot 2023-12-27 at 14.47.49.png";
import image28 from "./assets/Screenshot 2023-12-27 at 14.53.24.png";
import image29 from "./assets/Screenshot 2023-12-27 at 14.53.33.png";
import image30 from "./assets/Screenshot 2023-12-27 at 14.53.41.png";
import image31 from "./assets/Screenshot 2023-12-27 at 14.53.47.png";
import image32 from "./assets/Screenshot 2023-12-27 at 14.56.43.png";
import image33 from "./assets/Screenshot 2023-12-27 at 14.57.08.png";
import image34 from "./assets/Screenshot 2023-12-27 at 14.59.00.png";
import image35 from "./assets/Screenshot 2023-12-27 at 14.59.12.png";
import image36 from "./assets/Screenshot 2023-12-27 at 14.59.18.png";
import image37 from "./assets/Screenshot 2023-12-27 at 14.59.22.png";
import image38 from "./assets/Screenshot 2023-12-27 at 15.01.10.png";
import image39 from "./assets/Screenshot 2023-12-27 at 15.01.15.png";
import image40 from "./assets/Screenshot 2023-12-27 at 15.01.19.png";
import image41 from "./assets/Screenshot 2024-03-15 at 7.16.38.png";
import image42 from "./assets/Screenshot 2024-03-15 at 7.16.51.png";
import image43 from "./assets/Screenshot 2024-03-15 at 7.16.57.png";
import image44 from "./assets/Screenshot 2024-03-15 at 7.17.22.png";
import image45 from "./assets/Screenshot 2024-03-15 at 7.17.42.png";
import image46 from "./assets/Screenshot 2024-05-03 at 3.07.09 PM.png";
import image47 from "./assets/Screenshot 2024-05-03 at 3.09.04 PM.png";
import image48 from "./assets/Screenshot 2024-05-03 at 3.09.10 PM.png";
import image49 from "./assets/Screenshot 2024-05-03 at 3.31.00 PM.png";
import image50 from "./assets/Screenshot 2024-05-03 at 3.32.09 PM.png";
import image51 from "./assets/Screenshot 2024-05-03 at 3.41.26 PM.png";
import image52 from "./assets/Screenshot 2024-05-03 at 3.42.03 PM.png";
import image53 from "./assets/Screenshot 2024-05-03 at 3.42.10 PM.png";

const portfolioProjects = [
  {
    id: 5,
    title: "Leadership and E-Learning Platform",
    description:
      "Development of a complete content management, training, and leadership tools platform using Laravel, React.js, Tailwind CSS, Graph API, Azure, and GitHub.",
    tags: [
      "Laravel",
      "React.js",
      "Tailwind CSS",
      "Graph API",
      "Azure",
      "GitHub",
    ],
    imageUrl: image12,
    link: "https://reset-leadership.com/",
    images: [image12, image13, image14, image15, image16, image17],
    softSkills: [
      "Leadership",
      "Project Management",
      "Communication",
      "Teamwork",
      "Creativity",
      "Responsibility",
      "Problem Solving",
    ],
  },
  {
    id: 9,
    title: "Innovative Redesign of the Organic Muse Africa E-Commerce Website",
    description:
      "Redesign of the Organic Muse Africa e-commerce site to align with the new brand guidelines, using Figma, Shopify, Liquid, HTML, and CSS.",
    tags: ["Figma", "Shopify", "Liquid", "HTML", "CSS"],
    imageUrl: image41,
    link: "https://www.organicmuse.africa/",
    images: [image41, image42, image43, image44, image45],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Responsibility",
      "Design",
      "Understanding Needs",
    ],
  },
  {
    id: 14,
    title:
      "Aloqas, AI Question Answering Chatbot with 3 Models (SqueezeBERT, BERT, and DeBERTa)",
    description:
      "Creation of an AI Question Answering chatbot using 3 models (SqueezeBERT, BERT, and DeBERTa) with Python, TensorFlow, Hugging Face, Streamlit, Google Colabs, and GitHub.",
    tags: [
      "Python",
      "TensorFlow",
      "Hugging Face",
      "Streamlit",
      "Google Colabs",
      "GitHub",
    ],
    imageUrl: image51,
    link: "https://aloqas-aloqas-qa-streamlit.hf.space",
    images: [image51, image52, image53],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Teamwork",
      "Innovation",
      "Responsibility",
      "Artificial Intelligence",
      "Deep Learning",
      "Machine Learning",
    ],
  },
  {
    id: 13,
    title: "Aloqas, Medical AI Chatbot",
    description:
      "Creation of a medical AI chatbot using Python, TensorFlow, Keras, Hugging Face, and Gradio.",
    tags: ["Python", "TensorFlow", "Keras", "Hugging Face", "Gradio"],
    imageUrl: image49,
    link: "https://aloqas-aloqas-gradio.hf.space/",
    images: [image49, image50],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Teamwork",
      "Innovation",
      "Responsibility",
      "Artificial Intelligence",
      "Deep Learning",
      "Machine Learning",
    ],
  },
  {
    id: 0,
    title: "ToDoList on the Ethereum Blockchain",
    description:
      "Creation of a decentralized ToDoList on the Ethereum blockchain, using Solidity, React.js, Hardhat, and Metamask.",
    tags: ["Solidity", "React.js", "Hardhat", "Ethereum", "Metamask"],
    imageUrl: image0,
    link: "https://blockchain-todolist.vercel.app/",
    images: [image0],
    softSkills: [
      "Communication",
      "Problem Solving",
      "Project Management",
      "Innovation",
      "Responsibility",
      "Blockchain",
      "Ethereum",
      "Smart Contracts",
      "Web3",
    ],
  },
  {
    id: 1,
    title: "Website Redesign for Ready for Digital",
    description:
      "Redesign of the Ready for Digital website to align with the new brand guidelines, using WordPress, Canva, and Elementor.",
    tags: ["WordPress", "Canva", "Elementor"],
    imageUrl: image1,
    link: "https://formation.multisite.ready4digital.com/",
    images: [image1, image2, image3],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Responsibility",
      "Design",
      "Understanding Needs",
    ],
  },
  {
    id: 2,
    title: "Blake and Mouton Evaluation Questionnaire",
    description:
      "Development of an interactive questionnaire to evaluate the leadership style of a CEO or executive, using Next.js, React.js, Tailwind CSS, and Vercel.",
    tags: ["Next.js", "React.js", "Tailwind CSS", "Vercel"],
    imageUrl: image4,
    link: "https://blake-and-mouton.vercel.app/",
    images: [image4, image5, image6],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Responsibility",
      "Design",
      "Understanding Needs",
    ],
  },
  {
    id: 3,
    title: "Website Redesign for issho Partners",
    description:
      "Redesign of the issho Partners website to align with the new brand identity while optimizing performances, using WordPress, Canva, and Elementor.",
    tags: ["WordPress", "Canva", "Elementor"],
    imageUrl: image7,
    link: "https://issho-partners.com/",
    images: [image7, image8, image9, image10],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Responsibility",
      "Design",
      "Understanding Needs",
    ],
  },
  {
    id: 4,
    title: "COMEX / CODIR Evaluation Questionnaire",
    description:
      "Creation of an interactive questionnaire to evaluate executive committees (COMEX/CODIR) within a company, using React.js, Express.js, Bootstrap, and Vercel.",
    tags: ["React.js", "Express.js", "Bootstrap", "Vercel"],
    imageUrl: image11,
    link: "https://evaluation-dirigeant.onrender.com/",
    images: [image11, image34, image35, image36, image37],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Responsibility",
      "Design",
      "Understanding Needs",
    ],
  },
  {
    id: 6,
    title: "Interactive Questionnaire for issho Partners",
    description:
      "Development of an interactive questionnaire for issho Partners, allowing users to answer questions and view results in real time, using HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: image18,
    link: "https://samuel-dd07.github.io/questionnaire-issho-partners/",
    images: [image18, image19, image20],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Responsibility",
      "Design",
      "Understanding Needs",
    ],
  },
  {
    id: 7,
    title: "Showcase Website for Elocutio Paris Nord",
    description:
      "Creation of a showcase website to promote a fictional event, Elocutio Paris Nord, using HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: image21,
    link: "https://samuel-dd07.github.io/Elocutio-paris-nord/",
    images: [image21, image22, image23, image24, image25, image26, image27],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Responsibility",
      "Design",
      "Understanding Needs",
    ],
  },
  {
    id: 8,
    title: "Apple Homepage Redesign",
    description:
      "Redesign of the Apple homepage using HTML, CSS, JavaScript, and React.js.",
    tags: ["HTML", "CSS", "JavaScript", "React.js"],
    imageUrl: image28,
    link: "https://samuel-dd07.github.io/Apple-Home-Remake/",
    images: [image28, image29, image30, image31],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Responsibility",
      "Design",
      "Understanding Needs",
      "Web Development",
      "Web Clone",
    ],
  },
  {
    id: 10,
    title: "Decryption Project",
    description:
      "Recreation of the Caesar cipher encryption effect on the web using HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: image32,
    link: "https://samuel-dd07.github.io/Decryption-Project/",
    images: [image32, image33],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Responsibility",
      "Design",
      "Understanding Needs",
    ],
  },
  {
    id: 11,
    title: "3D City Generator",
    description:
      "Creation of a random 3D city generator using HTML, CSS, JavaScript, and Three.js.",
    tags: ["HTML", "CSS", "JavaScript", "Three.js"],
    imageUrl: image38,
    link: "https://samuel-dd07.github.io/City-Generator/",
    images: [image38, image39, image40],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Responsibility",
      "Design",
      "Understanding Needs",
      "WebGL",
      "3D",
    ],
  },
  {
    id: 12,
    title: "Tic Tac Toe",
    description:
      "Creation of a Tic Tac Toe game using Angular, HTML, CSS, and TypeScript.",
    tags: ["Angular", "HTML", "CSS", "TypeScript"],
    imageUrl: image46,
    link: "https://tic-tac-toe-weld-eta.vercel.app/",
    images: [image46, image47, image48],
    softSkills: [
      "Creativity",
      "Communication",
      "Problem Solving",
      "Project Management",
      "Responsibility",
      "Design",
      "Understanding Needs",
    ],
  },
];

const App = () => {
  return (
    <Router>
      <Header />
      <div className="bg-gray-900 min-h-[calc(100vh-60px)]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutMePage />} />
          <Route
            path="/projects"
            element={<Portfolio projects={portfolioProjects} />}
          />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
