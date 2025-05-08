import { Github } from "lucide-react";
import Link from "next/link";

const GithubLink = () => {
  return (
    <Link
      href={"https://github.com/devlopersabbir/chrome-extension-icon-generator"}
      className="fixed top-4 right-4"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-sm p-2 bg-gradient-to-br from-purple-500 to-cyan-500">
        <Github size={100} />
      </div>
    </Link>
  );
};
export default GithubLink;
