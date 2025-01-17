import { Schema, models, model } from "mongoose";

const PromptScema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "prompt is required"],
  },

  tag: {
    type: String,
    required: [true, "tag is required"],
  },
});

const Prompt = models.prompt || model("Prompt", PromptScema);

export default Prompt;
