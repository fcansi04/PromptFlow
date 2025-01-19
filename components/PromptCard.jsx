"use client";

import { useState } from "react";
import Image from "@node_modules/next/image";
import { useSession } from "@node_modules/next-auth/react";
import { usePathname, useRouter } from "@node_modules/next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  return (
    <div className="flex flex-col gap-4 border-2 w-80 min-h-60 p-5 pt-3 rounded-xl">
      <div className=" flex gap-4 items-end cursor-pointer">
        <Image
          src={post.creator?.image}
          width={45}
          height={35}
          alt="user_image"
          className="rounded-[2000px] "
        />
        <div className="font-satoshi">
          <h3 className="font-semibold text-gray-900">
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
    </div>
  );
};

export default PromptCard;
