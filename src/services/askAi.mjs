import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyDEoLogwzeEhL2QIWDfbyf8u0zUke5fobk" });

async function ask(myQuestion) {

const response = await ai.models.generateContent({
    model: "gemini-2.0-flash-lite",
    contents: `reponds en 2 lignes tres courte: ${myQuestion}`,
  });

  return response
}

export default ask
