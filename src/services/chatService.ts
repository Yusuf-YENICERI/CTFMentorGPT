import { ChatMessageType } from "../store/store";
import OpenAI from "openai";
import { encode, decode } from "gpt-tokenizer";

const apiUrl = "https://api.openai.com/v1/chat/completions";

export async function fetchResults(
  messages: Omit<ChatMessageType, "id">[],
  modal: string,
  signal: AbortSignal,
  onData: (data: any) => void,
  onCompletion: () => void
) {
  const new_messages: Omit<ChatMessageType, "id">[] = [
    {
      role: "user",
      content: `
        
CTF text start
${localStorage.getItem("text_to_summarize")}
CTF text end

Do not directly tell all steps. Always one at each time. Just tell the next step. If the person does not provide you information about the next step, for example i have done nmap
now what should i do? Tell him to check services. Let him figure out always.
      `,
      //Use English language when responding.
    },
    ...messages,
  ];
  let chunks;
  try {
    const response = await fetch(apiUrl, {
      method: `POST`,
      signal: signal,
      headers: {
        "content-type": `application/json`,
        accept: `text/event-stream`,
        Authorization: `Bearer ${localStorage.getItem("apikey")}`,
      },
      body: JSON.stringify({
        model: modal,
        temperature: 0.7,
        stream: true,
        messages: new_messages,
      }),
    });

    if (response.status !== 200) {
      throw new Error("Error fetching results");
    }
    const reader: any = response.body?.getReader();
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        onCompletion();
        break;
      }

      let chunk = new TextDecoder("utf-8").decode(value, { stream: true });

      chunks = chunk.split("\n").filter((x: string) => x !== "");

      chunks.forEach((chunk: string) => {
        if (chunk === "data: [DONE]") {
          return;
        }
        if (!chunk.startsWith("data: ")) return;
        chunk = chunk.replace("data: ", "");
        try {
          const data = JSON.parse(chunk);
          if (data.choices[0].finish_reason === "stop") return;
          onData(data.choices[0].delta.content);
        } catch (error) {
          console.log("you got error bro");
        }
      });
    }
  } catch (error) {
    if (error instanceof DOMException || error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function fetchModals() {
  try {
    const response = await fetch("https://api.openai.com/v1/models", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("apikey")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof DOMException || error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function summarize_text(
  original_text: string,
  selected_modal: string
) {
  const openai = new OpenAI({
    apiKey: localStorage.getItem("apikey") || "",
    dangerouslyAllowBrowser: true,
  });
  const tokens = encode(original_text);
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      {
        role: "user",
        content: `
        ${original_text}
        
        Summarize the article considering the critic parts of the CTF. Include technic details and solutions. That will be used by another agent. So be careful. Be smart.
        `,
      },
    ],
    model: "gpt-4-1106-preview",
    max_tokens: 4000 - tokens.length,
    temperature: 0.69,
  });

  return chatCompletion.choices[0].message.content;
}
