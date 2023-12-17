import { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import DefaultIdeas from "./components/DefaultIdea/DefaultIdeas";
import UserQuery from "./components/UserInput/UserQuery";
import GptIntro from "./components/Ui/GptIntro";
import { IonIcon, setupIonicReact } from "@ionic/react";
import { menuOutline, addOutline } from "ionicons/icons";
import Header from "./components/Header/Header";
import useChat, { chatsLength, useAuth, useTheme } from "./store/store";
import classNames from "classnames";
import Chats from "./components/Chat/Chats";
import Modal from "./components/modals/Modal";
import Apikey from "./components/modals/Apikey";
import Summarize from "./components/modals/Summarize";

setupIonicReact();
function App() {
  const [active, setActive] = useState(false);
  const isChatsVisible = useChat(chatsLength);
  const addNewChat = useChat((state) => state.addNewChat);
  const userHasApiKey = useAuth((state) => state.apikey);
  const userHasSummarizeText = useAuth((state) => state.text_to_summarize);
  const [theme] = useTheme((state) => [state.theme]);

  const [summarizeTextOpen, setSummarizeTextOpen] = useState(true);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="App font-poppins md:flex ">
      <Navbar active={active} setActive={setActive} />
      <div className="">
        <button
          type="button"
          className="shadow p-1 fixed text-sm top-4 left-4 hidden md:inline-block text-gray-400 dark:border border-gray-400 rounded-md"
          onClick={() => setActive(true)}
        >
          <i className="fa-regular fa-window-maximize rotate-90"></i>
        </button>
      </div>
      <div className="p-3 z-10 flex items-center justify-between bg-[#202123] dark:bg-[#343541] border-b sticky top-0  text-gray-300 md:hidden">
        <button onClick={() => setActive(true)} className=" text-2xl flex">
          <IonIcon icon={menuOutline} />
        </button>
        <h2>New chat</h2>
        <button className="text-2xl flex items-center" onClick={addNewChat}>
          <IonIcon icon={addOutline} />
        </button>
      </div>
      <main
        className={classNames(" w-full transition-all duration-500", {
          "md:ml-[260px]": active,
        })}
      >
        {isChatsVisible ? <Header /> : <GptIntro />}
        {isChatsVisible && <Chats />}
        <div
          className={classNames(
            "fixed left-0 px-2  right-0 transition-all duration-500 bottom-0 dark:shadow-lg py-1",
            {
              "dark:bg-[#40414f] bg-white": isChatsVisible,
              "md:ml-[260px]": active,
            }
          )}
        >
          <div className="max-w-2xl md:max-w-[calc(100% - 260px)] mx-auto">
            {!isChatsVisible && (
              <>
                <DefaultIdeas />
              </>
            )}

            <div className="dark:bg-inherit">
              <UserQuery />
              <p className="info text-xs py-2 text-gray-400 text-center">
                <span className=" underline">CTFMentorGPT 2024</span>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Modal visible={summarizeTextOpen}>
        <Summarize setSummarizeTextOpen={setSummarizeTextOpen} />
      </Modal>
      <Modal visible={!Boolean(userHasApiKey)}>
        <Apikey />
      </Modal>
    </div>
  );
}

export default App;
