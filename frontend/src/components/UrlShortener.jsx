import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
// import { isWebUrl } from "valid-url";
// import OverlayTrigger from "react-bootstrap/OverlayTrigger";
// import Tooltip from "react-bootstrap/Tooltip";

function UrlShortener(props) {
  // const [updateMsg, setUpdateMsg] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [userInputedUrl, setUserInputedUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let newKey = nanoid(5);
    let newUrl = "http://localhost:5001/" + newKey;

    // This is temporarily using the localhost server until I get the site deployed
    fetch("http://localhost:5001/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: userInputedUrl,
        newURL: newUrl,
        key: newKey,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.message);
        // This changes the "newUrl" state to the previously defined "newUrl with the generated key added"
        setNewUrl(newUrl);
        // This will clear the input
        setUserInputedUrl("");
      })
      .catch((err) => {
        console.err("Error:", err);
        setUpdateMsg("Error submitting form");
      });
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen">
        <form
          className="bg-white px-16 py-10 rounded-md"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <header>
            <h1 className="text-3xl font-bold">CondenseClick</h1>
          </header>
          <div className="mt-6 text-left mb-4">
            <label className="font-bold mb-1">Enter URL:</label>
            <br />
            <input
              className="w-full border border-gray-300 h-10 px-2 rounded-lg"
              value={userInputedUrl}
              onChange={(e) => setUserInputedUrl(e.target.value)}
              placeholder="https://www..."
            />
          </div>
          <div className="text-left">
            <label className="font-bold mb-1">Add Custom URL:</label>
            <br />
            <div className="flex items-center">
              <span className="bg-gray-200 h-10 flex items-center px-2 rounded-l-lg">
                danielgoehring.com/
              </span>
              <input className="border border-gray-300 h-10 p-0 px-2 rounded-r-lg" />
            </div>
          </div>
          <div className="text-left">
            <button
              className="mt-6 bg-sky-600 px-4 py-2 rounded-md text-white font-bold"
              type="submit"
            >
              Generate
            </button>
          </div>

          {/* <input value={} /> */}

          {newUrl && (
            <div className="mt-4">
              <div className="font-bold text-left mb-1">
                Here is your newly generated URL:{" "}
              </div>
              <div className="flex items-center">
                <a
                  className="bg-gray-200 h-10 flex items-center px-2 rounded-l-lg"
                  href={newUrl}
                  target="_blank"
                >
                  {newUrl}
                </a>

                <div
                  className="bg-sky-600 text-white font-bold h-10 flex items-center px-2 rounded-l-lg rounded-r-lg border border-gray-400 cursor-pointer hover:bg-sky-800"
                  onClick={() => navigator.clipboard.writeText(newUrl)}
                >
                  Copy
                </div>
              </div>
            </div>
          )}
          {/* Display the server response or error message */}
        </form>
      </section>
    </>
  );
}

export default UrlShortener;
