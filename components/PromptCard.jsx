"use client";

import { useState } from "react";
import Image from "@node_modules/next/image";
import { useSession } from "@node_modules/next-auth/react";
import { usePathname, useRouter } from "@node_modules/next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 2000);
  };

  return (
    <div className="relative flex flex-col xl:gap-4 sm:gap-1 border-2 w-80 min-h-80 p-5 pt-3 rounded-xl">
      <div className=" flex gap-4 items-end ">
        <Image
          src={post.creator?.image}
          width={45}
          height={35}
          alt="user_image"
          className="rounded-[2000px] "
        />
        <div className="font-satoshi">
          <h3 className="font-semibold text-[18px] text-gray-900 cursor-pointer decoration-solid hover:underline">
            {post.creator?.username}
          </h3>
          <p className="text-gray-500 text-[15px]">{post.creator?.email} </p>
        </div>
        <div className="copy_btn " onClick={() => setCopied(post.prompt)}>
          <Image
            className=""
            width={20}
            height={20}
            alt="copy_logo"
            onClick={handleCopy}
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
          />
        </div>
      </div>
      <p className="font-satoshi ">{post.prompt}</p>
      <p
        className="font-satoshi text-gray-600 cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="absolute bottom-2 right-32  flex gap-2 ">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
