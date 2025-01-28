import { FaLinkedin } from "react-icons/fa";

// import logoWhite from "../assets/logo-croped.gif";
const Footer = () => {
  const logoWhite =
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg";
  return (
    <footer className="footer footer-center text-base-content rounded p-10 bg-gray-300 ">
      <a href="#">
        <div className="flex justify-center items-center rounded-xl px-2">
          <img className="w-[60%]" src="/public/LingoLink_Logo.png" alt="" />
        </div>
      </a>
      <nav>
        <div className="flex gap-4">
          <a>
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by
          <span className="font-bold">Faisal Hasan Emon</span>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
