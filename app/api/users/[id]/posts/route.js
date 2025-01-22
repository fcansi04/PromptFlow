import { connectToDB } from "@utils/database";

import Prompt from "@models/prompt";

export const GET = async (request, context) => {
  try {
    await connectToDB();
    const params = await context.params;

    const { id } = params;
    const prompts = await Prompt.find({
      creator: id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
