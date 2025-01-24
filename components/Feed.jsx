"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 grid w-screen px-8 lg:px-10 xl:px-20 max-sm:grid-1 md:grid-cols-2  lg:grid-cols-3 place-items-center gap-5">
      {data.map((item) => (
        <PromptCard
          key={item._id}
          post={item}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [initial, setInital] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setInital(data);
      setPosts(data);
    };

    fetchPrompts();
  }, []);

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => {
          e.preventDefault();
          setPosts(
            [...initial].filter((post) =>
              post.tag.toLowerCase().includes(searchText.toLowerCase())
            )
          );
        }}
      >
        <input
          type="text"
          placeholder="search for a tag or a username"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full py-3 px-6 rounded-full outline-none shadow-xl text-gray-500 text-md border-2 border-blue-600"
        />

        <button className="absolute right-[13px]">
          <span className="material-symbols-outlined">search</span>
        </button>
      </form>
      <div className="relative">
        <button
          onClick={() => setPosts(initial)}
          className="absolute right-20 top-[10px] bg-black text-white p-2 px-3 active:bg-gray-700 rounded-full "
        >
          Show All
        </button>
        <PromptCardList
          data={posts}
          handleTagClick={(tag) => {
            setPosts((prevPosts) => {
              setPosts(prevPosts.filter((post) => post.tag == tag));
            });
          }}
        />
      </div>
    </section>
  );
};

export default Feed;
