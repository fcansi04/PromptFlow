import Feed from "@components/Feed";

import { loader } from "../public/assets/icons/loader.svg";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share <br className="" />
        <span className="blue_gradient">AI-Powered Prompts</span>
      </h1>
      <p className="text-lg sm:text-xl text-center max-w-[620px] mt-5 text-gray-600">
        PromptFlow is an open source AI prompting tool for modern world to
        discover, create and share creative promts
      </p>
      <Feed />
    </section>
  );
};

export default Home;
