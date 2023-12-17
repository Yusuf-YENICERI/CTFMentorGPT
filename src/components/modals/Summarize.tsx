import { IonIcon } from "@ionic/react";
import { informationCircleOutline } from "ionicons/icons";
import { useAuth } from "../../store/store";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSettings } from "../../store/store";
import { summarize_text } from "../../services/chatService";

const varinats = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};
const apiKeyLength = 0;

export default function Summarize({ setSummarizeTextOpen }: any) {
  const [userTextToSummarize, setUserTextToSummarize] = useState("");
  const { setTextToSummarize } = useAuth();
  const [selectedModal] = useSettings((state) => [
    state.settings.selectedModal,
  ]);
  const [saveClicked, setSaveClicked] = useState(false);
  const [showWait, setShowWait] = useState(false);
  const [setSystemMessage] = useSettings((state) => [state.setSystemMessage]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (saveClicked) {
      setShowWait(true);
      let summarized_text = await summarize_text(
        userTextToSummarize,
        selectedModal
      );
      setTextToSummarize(summarized_text || "");
      console.log(summarized_text);
      setShowWait(false);
    }
    setSummarizeTextOpen(false);
    setSystemMessage({
      message: `
      You are a helpful assistant(named as CTFMentorGPT) designed to help people playing CTF. You do provides them hints without giving them direct answer but more like a game for them.
      Let the person struggle for a while for what he doing.
       `,
      useForAllChats: true,
    });
  }

  return (
    <motion.div
      variants={varinats}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="dark:bg-gray-700 text-gray-700 dark:text-gray-300 border bg-white border-blue-400 max-w-xl w-full p-3 rounded-md mx-2 md:mx-0"
    >
      <h2 className="text-xl font-medium   text-center my-2">
        Welcome hacker! I'm CTFMentorGPT and I'm here to help you with CTFs.
        Just copy paste a writeup and then I'll provide you hints without giving
        you the direct answer. This way you will be able to hone your skills.
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Welcome to an another writeup .."
          onChange={(e) => setUserTextToSummarize(e.target.value)}
          autoFocus
          rows={20}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        />
        <div className=" flex items-center mt-4">
          <span className=" flex items-center ">
            <IonIcon icon={informationCircleOutline} />
          </span>
          <span className="ml-2 text-sm font-medium">
            Do not check the writeup!
          </span>
        </div>
        <div className={!showWait ? " text-center" : "hidden"}>
          <button
            type="submit"
            onClick={() => {
              setSaveClicked(true);
            }}
            disabled={userTextToSummarize.length < apiKeyLength}
            className="mt-4 py-2.5 disabled:cursor-not-allowed disabled:bg-white  px-5 text-sm font-medium disabled:text-gray-900 focus:outline-none bg-green-500 text-white rounded-lg border border-gray-200   focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Save
          </button>
          <button
            type="submit"
            onClick={() => {
              setSaveClicked(false);
            }}
            className="mt-4 py-2.5  px-5 text-sm font-medium bg-green-500 text-white rounded-lg border border-gray-200    dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
        <div className={showWait ? "mt-4 text-sm font-medium" : "hidden"}>
          Please wait, we are processing your writeup. It might take a while
          (max 30 seconds) ..
        </div>
      </form>
    </motion.div>
  );
}
