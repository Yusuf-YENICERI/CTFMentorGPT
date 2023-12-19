import { IonIcon } from "@ionic/react";
import { sparkles } from "ionicons/icons";
import Avatar from "../Avatar/Avatar";
import { logoGithub } from "ionicons/icons";
export default function GptIntro() {
  return (
    <>
      {/* <div className="modals md:w-1/5 md:min-w-[300px] mx-2 relative flex items-center rounded-md justify-between mt-5 md:mx-auto p-1 bg-gray-200 dark:bg-[#202123] gap-2"> */}
      {/* <p className="gpt3 uppercase  rounded-md p-2 bg-white flex-1 flex items-center dark:bg-[#40414f] dark:text-white justify-center">
          <span className="text-green-400 mr-2 ">
            <i className="fa-solid fa-bolt "></i>
          </span>
          <span className="mr-2">gpt-3.5</span>
          <span className=" h-4 w-4 rounded-full bg-gray-400 flex items-center justify-center text-[10px] text-white">
            <i className="fa-solid fa-info "></i>
          </span>
        </p>

        <p className="gpt4 uppercase rounded p-2 text-gray-400 flex-1 flex  items-center justify-center">
          <span className="mr-2">
            <IonIcon icon={sparkles} />
          </span>
          <span className="mr-2">gpt-4</span>
          <span>
            <i className="fa-solid fa-lock text-sm"></i>
          </span>
        </p> */}
      {/* </div> */}
      <div className="h-70 flex flex-col justify-center items-center">
        <Avatar className=" h-20 w-20 mt-5" src="/imgs/bot.jpg" />
        <h1 className=" text-4xl mt-5 font-bold text-center text-gray-300 justify-center">
          CTFMentorGPT
        </h1>

        <h6 className="text-xl font-bold mt-5 text-center text-gray-500">
          Providing strategic hints to elevate your cybersecurity game in
          Capture The Flag challenges.
        </h6>

        <h6 className="text-xl font-bold mt-5 text-center text-gray-500">
          # Free Palestine && Terrorist Israel
        </h6>
        <div
          className="flex flex-row items-center mt-5"
          onClick={() => {
            window.location.href =
              "https://github.com/Yusuf-YENICERI/CTFMentorGPT";
          }}
        >
          <h6 className="text-lg font-bold text-center text-gray-500  mr-2">
            GitHub
          </h6>
          <IonIcon icon={logoGithub} size="large" color="white" />
        </div>
      </div>
    </>
  );
}
