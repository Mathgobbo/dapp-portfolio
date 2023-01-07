import { BsGithub, BsLinkedin } from "react-icons/bs";
export const Footer = () => {
  return (
    <footer className="flex flex-col items-center p-4 border-t border-gray-400">
      <p className="font-semibold text-gray-600">
        Developed by{" "}
        <a target="_blank" href="https://github.com/Mathgobbo" className="text-blue-600 underline">
          Mathgobbo
        </a>
      </p>
      <div className="mt-4 flex space-x-4">
        <a className="text-gray-600 hover:text-gray-900 transition" target="_blank" href="https://github.com/Mathgobbo">
          <BsGithub className="h-6 w-6 fill-current" />
        </a>
        <a
          className="text-gray-600 hover:text-gray-900 transition"
          target="_blank"
          href="https://www.linkedin.com/in/matheus-gobbo-bernardi/?locale=en_US"
        >
          <BsLinkedin className="h-6 w-6 fill-current" />
        </a>
      </div>
    </footer>
  );
};
