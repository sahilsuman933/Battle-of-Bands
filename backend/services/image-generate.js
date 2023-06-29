import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "../config";

const ImageGenerate = {
  async generateImage(prompt) {
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);

    try {
      const response = await openai.createImage({
        prompt: prompt,
        n: 4,
        size: "1024x1024",
      });

      return {
        images: response.data,
      };
    } catch (err) {
      return {
        error: true,
        error_message: err.response,
      };
    }
  },
};

export default ImageGenerate;
