import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function App() {
  const [loading, setloading] = useState(false);
  const [url, setUrl] = useState("");
  const [data, setData] = useState(
    localStorage.getItem("data")
      ? JSON.parse(localStorage.getItem("data"))
      : null
  );

  const submitHandler = async (e) => {
    localStorage.removeItem("data");
    e.preventDefault();
    setloading(true);
    const reqPayload = {
      websiteLink: url,
    };
    try {
      const { data } = await axios.post(
        "https://snap-site-server.onrender.com/api/v1/capture-screenshot",
        reqPayload
      );
      setData(data.payload);
      localStorage.setItem("data", JSON.stringify(data.payload));
      toast.success(data.message);
      setUrl("");
      scrollTo(0, 500);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setloading(false);
  };

  const removeStoredData = () => {
    localStorage.removeItem("data");
    setData(null);
    scrollTo(0, 0);
    toast.success("Data Removed");
  };

  useEffect(() => {
    if (data) {
      scrollTo(0, 500);
    }
  }, []);

  return (
    <>
      <div className="w-full min-h-screen font-sans flex flex-col gap-5">
        <div className="w-full shadow-md">
          <header className="w-full max-w-[1260px] mx-auto p-5 text-[#6050DC] flex items-center justify-center">
            <h1 className="text-4xl font-extrabold flex items-center justify-center gap-1 text-center">
              <div className="h-[30px] w-[30px] p-7 text-5xl flex items-center justify-center rounded-full bg-[#6050DC] text-white">
                S
              </div>
              nap Site
            </h1>
          </header>
        </div>
        <div className="w-full min-h-screen ">
          <main className="w-full max-w-[1260px] mx-auto p-5 text-[#6050DC] flex items-center justify-center flex-col gap-10">
            <h1 className="text-xl font-extrabold capitalize tracking-wider text-center">
              An easy way to capture websites screenshot.
            </h1>
            <form
              className="p-5 rounded-md w-full md:w-[60%] lg:w-[50%] flex items-center justify-between gap-10 flex-col c-shadow"
              onSubmit={submitHandler}
            >
              <div className="w-full flex flex-col gap-5">
                <label htmlFor="url" className="font-bold">
                  Enter Website URL
                </label>
                <input
                  autoComplete="off"
                  required
                  type="text"
                  name="url"
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  id="url"
                  className="w-full border p-5 rounded-md outline-none"
                />
              </div>
              <input
                type="submit"
                value="Capture Screenshot"
                className="w-full p-5 bg-[#6050DC] text-white rounded-md cursor-pointer hover:bg-[rgba(96,80,220,0.9)] transition-all duration-300 font-bold"
              />
            </form>
            {loading ? (
              <div className="flex items-center justify-center gap-2 flex-col mt-5">
                <span className="loader"></span>
                <span className="font-bold">Loading...</span>
              </div>
            ) : data ? (
              <>
                <h2 className="text-xl font-extrabold capitalize tracking-wider text-center mt-5 underline">
                  Screenshot Preview
                </h2>
                <div className="w-[90%] font-semibold flex flex-col items-start gap-4 overflow-hidden">
                  <p>
                    Website URL -{" "}
                    <a href={data.websiteLink} className="underline">
                      {data.websiteLink}
                    </a>
                  </p>
                  <p>
                    Screenshot URL -{" "}
                    <a href={data.screenshotLink} className="underline">
                      {data.screenshotLink}
                    </a>
                  </p>
                  <p>
                    Created On -{" "}
                    {data?.createdAt && new Date(data.createdAt).toDateString()}
                  </p>
                  <p className="text-red-500">
                    Please note - This screenshot is securely stored in your
                    browser's local storage and will remain there until a new
                    screenshot is generated. If you want remove it{" "}
                    <span
                      className="text-[#6050DC] underline cursor-pointer"
                      onClick={removeStoredData}
                    >
                      click here
                    </span>
                  </p>
                </div>
                <div className="w-[90%] h-fit p-5 flex items-center justify-center c-shadow rounded-md">
                  <img
                    src={data?.screenshotLink}
                    className="object-contain border"
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </main>
        </div>
        <div className="w-full">
          <footer className="w-full max-w-[1260px] mx-auto p-5 text-[#6050DC] flex items-center justify-center">
            <h6 className="font-extrabold flex items-center justify-center text-center">
              &copy;2024 All Rights Reserved. Snapsite.Com
            </h6>
          </footer>
        </div>
      </div>
    </>
  );
}

export default App;
