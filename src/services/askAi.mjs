import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "api_key_here" });

async function ask(myQuestion) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-lite",
      contents: `reponds en 2 lignes tres courte: ${myQuestion}`,
    });
    return response;
  } catch (error) {
    return {
      err: "erreur lors du fetch, verifier votre connexion",
      state: true,
    };
  }
}

export default ask;
