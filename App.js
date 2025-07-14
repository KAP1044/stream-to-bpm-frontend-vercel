import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("https://stream-to-bpm-backend.onrender.com/upload", formData, {
      responseType: 'blob'
    });
    const blob = new Blob([response.data]);
    setDownloadUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Stream-to-BPM</h1>
      <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 mt-4">Upload</button>
      {downloadUrl && <a href={downloadUrl} download="library_with_bpm.csv" className="block mt-4 text-blue-500">Download Processed File</a>}
    </div>
  );
}

export default App;
