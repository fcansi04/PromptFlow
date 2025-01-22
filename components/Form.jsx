import React from "react";
import Link from "@node_modules/next/link";
const Form = ({ type, post, setpost, sumbitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-col flex-start">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} post</span>
      </h1>
      <p className="mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl">
        {type} and share amazing prompts with the world, and let you imagination
        run wild with AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setpost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag <span>(#product,#webdevelopment,#idea)</span>
          </span>
          <input
            value={post.tag}
            onChange={(e) =>
              setpost({ ...post, tag: e.target.value.toLowerCase() })
            }
            placeholder="#tag"
            className="w-full outline-none p-2 rounded-lg mt-2"
            required
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/profile" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            disabled={sumbitting}
            type="submit"
            className="bg-blue-600 py-2 px-3 rounded-full text-white transition-all duration-100 hover:bg-blue-500 active:bg-blue-600 "
          >
            {sumbitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
