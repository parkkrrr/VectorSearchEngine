const Document = require("./Document.model.js");
const fs = require("fs");
const { vectorizeTFIDF, cosineSimilarity } = require("./vectorization");

 async function getDocument(req, res) {
  try {
    const { id } = req.params;
    const document = await Document.findById(id);

    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }

    res.render("document",{
      id: document._id,
      text: document.text,
      metadata: document.metadata || "No metadata available",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function ingest(req, res) {
  let { text } = req.body;
  let { metadata } = req.body;

  // If a file is uploaded, extract content
  if (req.file) {
    // const filePath = req.file.path;
    // const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    // // Assume file contains metadata in the first line, and rest is text
    // const lines = fileContent.split("\n");
    // metadata = lines[0].trim();
    // text = lines.slice(1).join("\n").trim();

    const fileContent = req.file.buffer.toString("utf-8"); 
    metadata = req.file.originalname;
    text = fileContent.trim();

  }

  if (!text) {
    return res
      .status(400)
      .json({ message: "Text or file content is required" });
  }
  let vector = await vectorizeTFIDF(text);

  const doc = new Document({ text, vector, metadata });
  await doc.save();
  res
    .status(201)
    .json({ message: "Document stored successfully", id: doc._id });
}

async function search(req, res) {
  const { query, topN = 5, page = 1 } = req.query;
  if (!query) return res.render("search");

  const limit = Number(topN);
  const skip = (Number(page) - 1) * limit;

  let queryVector = await vectorizeTFIDF(query);
  const docs = await Document.find();
  const totalResults = docs.length;

  const scoredDocs = docs
    .map((doc) => ({
      id: doc._id,
      text: doc.text,
      metadata: doc.metadata,
      score: cosineSimilarity(queryVector, doc.vector),
    }))
    .sort((a, b) => b.score - a.score);

  const paginatedResults = scoredDocs.slice(skip, skip + limit);

  res.render("search", {
    query,
    topN: limit,
    page: Number(page),
    results: paginatedResults,
    hasNextPage: skip + paginatedResults.length < totalResults,
  });
}

module.exports = { search, ingest,getDocument };
