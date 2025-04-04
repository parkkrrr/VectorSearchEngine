const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

 const vectorizeTFIDF = async (text) => {
  const tfidf = new natural.TfIdf();
  tfidf.addDocument(text);
  const vector = [];
  tfidf.listTerms(0).forEach((item) => vector.push(item.tfidf));
  return vector;
};

 const cosineSimilarity = (vecA, vecB) => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * (vecB[i] || 0), 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return magnitudeA && magnitudeB ? dotProduct / (magnitudeA * magnitudeB) : 0;
};

module.exports={cosineSimilarity,vectorizeTFIDF}