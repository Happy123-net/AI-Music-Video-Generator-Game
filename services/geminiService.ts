
import { GoogleGenAI } from "@google/genai";
import type { AspectRatio } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const pollOperation = async <T,>(operation: any): Promise<T> => {
  let currentOperation = operation;
  while (!currentOperation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
    try {
        currentOperation = await ai.operations.getVideosOperation({ operation: currentOperation });
    } catch(e) {
        console.error("Polling failed", e);
        // Continue polling even if one check fails
    }
  }
  return currentOperation.response as T;
};


export const generateVideo = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  try {
    let operation = await ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: prompt,
      config: {
        numberOfVideos: 1,
        aspectRatio: aspectRatio,
      }
    });

    const response = await pollOperation<{ generatedVideos?: { video: { uri: string } }[] }>(operation);

    const downloadLink = response.generatedVideos?.[0]?.video?.uri;
    if (!downloadLink) {
      throw new Error("Video generation succeeded but no download link was provided.");
    }
    
    // Fetch the video blob to create a local URL for display and download
    const videoResponse = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
    if (!videoResponse.ok) {
        throw new Error(`Failed to fetch video file: ${videoResponse.statusText}`);
    }

    const videoBlob = await videoResponse.blob();
    const videoUrl = URL.createObjectURL(videoBlob);
    
    return videoUrl;

  } catch (error) {
    console.error("Error generating video:", error);
    if (error instanceof Error && error.message.includes('API_KEY')) {
        throw new Error("Failed to generate video. Please ensure your API key is valid and has permissions.");
    }
    throw new Error("Failed to generate video. The AI director is taking a break. Please try again later.");
  }
};
