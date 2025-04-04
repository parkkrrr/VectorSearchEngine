

# 🧠 Vector-Based Text Search Engine (TF-IDF)

This project allows you to **ingest `.txt` documents or raw text**, vectorize them using **TF-IDF**, and perform **cosine similarity-based search** across them.

## ✨ Features

- Upload `.txt` files or enter plain text
- Add optional metadata for each document
- Full-text search using TF-IDF and cosine similarity
- Simple pagination support
- Pug-based UI for ingest & search
- Secure file upload (only `.txt` allowed)

---

## 🚀 Getting Started

### 📦 Install Dependencies

```bash
npm install
```

Make sure you have:
- `express`
- `mongoose`
- `multer`
- `pug`
- `natural`
- `dotenv`

### 🛠️ Environment Variables

Create a `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/vector_search
```

---

## 🔌 Available Routes

### 📥 `POST /ingest`

Ingest a new document.

#### Request Type: `multipart/form-data`

| Field     | Type        | Description                                     |
|-----------|-------------|-------------------------------------------------|
| `text`    | `string`    | (Optional) Raw text to ingest                   |
| `file`    | `.txt file` | (Optional) Upload a `.txt` file instead         |
| `metadata`| `string`    | (Optional) Metadata for the document            |

> 🔐 Only `.txt` files are allowed. Any other format will be rejected.
>  
> ✅ If both `text` and `file` are provided, file content overrides `text`.

---

### 🔍 `GET /search`

Search for documents based on a query string.

#### Query Parameters:

| Param   | Type     | Description                                  |
|---------|----------|----------------------------------------------|
| `query` | string   | The search query                             |
| `topN`  | number   | Number of results per page (default: `5`)    |
| `page`  | number   | Page number to paginate results (default: `1`) |

#### Example:

```
GET /search?query=machine+learning&topN=10&page=2
```

Returns a rendered HTML view of relevant documents ranked by cosine similarity.

---

### 🌐 `GET /`

Ingest form UI — upload text or file and submit metadata.

### 🌐 `GET /search`

Search form UI — enter query, topN, and view paginated results.

---

## 📝 Notes

- **TF-IDF** vectorization is used behind the scenes.
- File uploads:
  - Must be plain `.txt`
  - Metadata should be passed **inside the file** in first line
- Results are paginated using `topN` and `page` params.
- Cosine similarity scores are shown for each result.

---

## 📁 Project Structure

```
.
├── controller.js         # Ingest & search logic
├── routes.js             # Express route definitions
├── vectorization.js      # TF-IDF vector + similarity
├── Document.model.js
├── views/
│   ├── ingest.pug
│   └── search.pug
│   └── layout.pug
├── uploads/              # Temp storage for file uploads
├── index.js              # Main server file
└── .env
```

---

## 🛡️ Security

- Only `.txt` files are allowed via file uploads
- Max file size is 5MB(configurable via multer)
- File inputs are sanitized


---
