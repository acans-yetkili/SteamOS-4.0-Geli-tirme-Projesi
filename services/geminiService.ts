import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

// Initialize the client safely
const getClient = () => {
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return aiClient;
};

export const generateAssistantResponse = async (
  query: string, 
  history: string[]
): Promise<string> => {
  try {
    const client = getClient();
    
    // Construct a context-aware prompt
    const systemPrompt = `Sen SteamOS Yapay Zeka Asistanısın. 
    Kullanıcılara video oyunları, donanım performansı ve Steam platformu hakkında Türkçe olarak yardımcı ol.
    Cevapların kısa, öz ve yardımsever olsun (aksi istenmedikçe 100 kelimeyi geçme).
    Samimi ve oyuncu dostu bir kişiliğin var.`;
    
    // Combine history for simple context (last 3 turns)
    const context = history.slice(-3).join('\n');
    const fullPrompt = `${systemPrompt}\n\nGeçmiş:\n${context}\n\nKullanıcı: ${query}`;

    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-2.5-flash', // Using the fast model for UI responsiveness
      contents: fullPrompt,
    });

    return response.text || "Şu anda Steam sunucularına bağlanamıyorum.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Bağlantı hatası. Lütfen internetinizi veya API anahtarınızı kontrol edin.";
  }
};

export const suggestGameDescription = async (gameTitle: string): Promise<string> => {
  try {
    const client = getClient();
    const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `"${gameTitle}" video oyunu için Türkçe, 2 cümlelik heyecan verici bir tanıtım yazısı yaz.`,
    });
    return response.text || "Açıklama mevcut değil.";
  } catch (e) {
    return "Açıklama mevcut değil.";
  }
}