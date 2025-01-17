"use client";

import { useState } from "react";
import { useSession } from "@node_modules/next-auth/react";
import { useRouter } from "@node_modules/next/navigation";
import Form from "@components/Form";

import { POST } from "@app/api/auth/[...nextauth]/route";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [sumbitting, setSubmittin] = useState(false);
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmittin(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(`${error} ==== createPrompt api error`);
    } finally {
      setSubmittin(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setpost={setpost}
      sumbitting={sumbitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
