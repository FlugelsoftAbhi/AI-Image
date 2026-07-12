export interface GenerateImageRequest {
  prompt: string;
  negativePrompt?: string;
  style?: string;
  width: number;
  height: number;
  seed?: number;
  cfg?: number;
  steps?: number;
  count?: number;
}

export interface GenerateImageResponse {
  images: string[];
}

export async function generateImage(request: GenerateImageRequest): Promise<GenerateImageResponse> {
  // TODO:
  // Replace this implementation with Gemini API
  // Return generated image URLs.

  // The application must be fully prepared for plugging in the real Google Gemini Image Generation API later.
  // Gemini API implementation goes here
  throw new Error("Gemini API not connected.");
}
