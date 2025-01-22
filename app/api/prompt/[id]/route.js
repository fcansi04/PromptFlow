import { connectToDB } from "@utils/database";

import Prompt from "@models/prompt";

export const GET = async (request, context) => {
  try {
    await connectToDB();
    const { id } = await context.params;
    const prompt = await Prompt.findById(id).populate("creator");
    if (!prompt) {
      return new Response("prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
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

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("failed to update a new response", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("prompt deleted succesfully", { staus: 200 });
  } catch (error) {
    return new Response("prompt deleted failed", { status: 500 });
  }
};
