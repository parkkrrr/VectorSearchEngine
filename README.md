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

## 🚀 **How to Run**  
1. **Install dependencies**  
   ```bash
   npm install
   ```
2. **Start the server**  
   ```bash
   npm start
   ```
3. **Open in browser**:  
   - Upload documents at **`/`**  
   - Search documents at **`/search`**  
   - View documents via **`/document/:id`**  

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

### 📥 **`POST /ingest`**

#### **Description:**  
Uploads and stores text documents in MongoDB, either via direct text input or a `.txt` file.  

#### Request Type: `multipart/form-data`

| Field     | Type        | Description                                     |
|-----------|-------------|-------------------------------------------------|
| `text`    | `string`    | (Optional) Raw text to ingest                   |
| `file`    | `.txt file` | (Optional) Upload a `.txt` file instead         |
| `metadata`| `string`    | (Optional) Metadata for the document            |

> 🔐 Only `.txt` files are allowed. Any other format will be rejected.
>  
> ✅ If both `text` and `file` are provided, file content overrides `text`.


#### **Request Parameters:**  
- **Body (for text input)**:  
  ```json
  {
    "text": "Your document content here",
    "metadata": "Optional metadata"
  }
  ```
- **Form Data (for file input, `.txt` only)**:  
  - `file`: Upload a `.txt` file (content is stored in MongoDB, not on disk).  
  - Metadata is taken from the file’s **original name**.  

#### **Response:**  
- **Success (201 Created)**:  
  ```json
  {
    "message": "Document stored successfully",
    "id": "67f01708f532dcf218e00fc8"
  }
  ```
- **Error (400 Bad Request)**:  
  ```json
  {
    "error": "No text provided"
  }
  ```


---

###  **`GET /search`**

#### **Description:**  
Searches stored documents using **TF-IDF vectorization** and **cosine similarity**.  

#### **Query Parameters:**  
| Param   | Type     | Description                                  |
|---------|----------|----------------------------------------------|
| `query` | string   | The search query                             |
| `topN`  | number   | Number of results per page (default: `5`)    |
| `page`  | number   | Page number to paginate results (default: `1`) |

#### Example:

```
GET /search?query=machine+learning&topN=10&page=2
```

#### **Response:**  
- **Success (HTML Page Rendered)**:  
  Displays search results with **View** buttons.  
- **Error (400 Bad Request)**:  
  ```json
  {
    "error": "Query parameter is required"
  }
  ```

Returns a rendered HTML view of relevant documents ranked by cosine similarity.

---


### **GET `/document/:id`**  

#### **Description:**  
Retrieves and displays a stored document from MongoDB using its unique ID.  

#### **URL Parameter:**  
- `:id` (required): The document’s MongoDB `_id`.  

#### **Response:**  
- **Success (HTML Page Rendered)**:  
  Displays the document content.  
- **Error (404 Not Found)**:  
  ```json
  {
    "error": "Document not found"
  }
  ```

#### **Example Usage:**  
- **Request:**  
  ```http
  GET /document/67f01708f532dcf218e00fc8
  ```
- **Response (HTML Page)**:  
  ```plaintext
  Document Details
  Metadata: myfile.txt
  Content: This is the text stored in MongoDB.
  ```
---

### 🌐 `GET /`

Ingest form UI — upload text or file and submit metadata.

### 🌐 `GET /search`

Search form UI — enter query, topN, and view paginated results.

---

## **🔗 Navigation & UI Enhancements**  
- The **Search UI** has a "View" button to open documents dynamically.  
- A **Back button** in the document viewer allows users to return to search results.  

---

## **💡 Notes & Limitations** 
✔ **TF-IDF** vectorization is used behind the scenes.
✔ **Files are NOT stored locally**—they are processed in memory and stored in MongoDB.  
✔ **Only `.txt` files** are accepted. Any other format will be rejected.  
✔ **The first line of a file is NOT treated as metadata**—instead, the filename is used.  
✔ **Cosine similarity** scores are shown for each result.
✔ **Results are paginated** using `topN` and `page` params.

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
