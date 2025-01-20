import { connectToDB } from "@utils/database";

import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) return new Response("prompts not found", { status: 404 });

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(json.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("failed to update a new response", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await prompt.findByIdAndRemove(params.id);

    return new Response("prompt deleted succesfully", { staus: 200 });
  } catch (error) {
    return new Response("prompt deleted failed", { staus: 500 });
  }
};
