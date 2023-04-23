import { MeiliSearch } from "meilisearch";
import { ulid } from "ulid";

const extractKeywords = async (note) => {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer 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`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Đưa ra cho tôi 7 keyword cho câu này:"${note}" dưới dạng array json với mỗi item là một keyword`,
          },
        ],
        temperature: 0.7,
      }),
    });

    const body = await res.json();
    console.log({ body });
    return JSON.parse(body.choices[0].message.content).join("; ");
  } catch (error) {
    console.log({ error });
    return "";
  }
};

const addNote = async (key, index, note) => {
  const client = new MeiliSearch({
    host: import.meta.env.SEARCH_API_ENDPOINT,
    apiKey: key,
  });

  const noteId = ulid();
  const rs = await client.index(index).addDocuments([
    {
      note,
      createdAt: Date.now(),
      id: noteId,
      keywords: "",
    },
  ]);
};

const searchNote = async (key, index, search, params) => {
  const client = new MeiliSearch({
    host: import.meta.env.SEARCH_API_ENDPOINT,
    apiKey: key,
  });
  return await client.index(index).search(search, {
    matchingStrategy: "last",
    attributesToHighlight: ["note"],
    limit: params.limit,
    offset: params.offset,
    sort: [`${params.order}:${params.sort}`, `time:${params.sort}`],
    highlightPreTag: '<span class="note-highlight">',
    highlightPostTag: "</span>",
  });
};

export { addNote, searchNote };
