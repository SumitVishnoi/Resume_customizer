import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
    apiKey: process.env.PINCONE_API_KEY
});

const index = pc.index("custom-resume")

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 0,
});

export const sendMessage = async (req, res) => {
  console.log(req.file);
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "file is required",
    });
  }

  const data = req.file;
  const fileUint8Array = new Uint8Array(data.buffer);

  const parser = new PDFParse(fileUint8Array);
  const document = await parser.getText();

  const texts = await splitter.splitText(document.text);
  console.log(texts);

  const documents = [];

  for (let i = 0; i < texts.length; i++) {
    documents.push({
      _id: `vec-${Date.now()}-${i}`,
      text: texts[i],
      fileName: data.originalname,
      chunkIndex: String(i),
    });
  }

  if (documents.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No documents available to upload",
    });
  }

  await index.namespace("default").upsertDocuments({
    documents,
  });

  return res.status(201).json({
    success: true,
    fileName: data.originalname,
    chunks: documents.length,
  });
};
