"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "@node_modules/next/navigation";
import Form from "@components/Form";

const EditPrompt = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [sumbitting, setSubmittin] = useState(false);
  const [post, setpost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDeatils = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setpost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };
    if (promptId) getPromptDeatils();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmittin(true);

    if (!promptId) {
      return alert("prompt id not found");
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,

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
      type="Edit"
      post={post}
      setpost={setpost}
      sumbitting={sumbitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
