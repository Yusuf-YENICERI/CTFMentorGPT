import DefaultIdea from "./DefaultIdea";

const defaultIdeas = [
  {
    idea: "Start hacking the machine",
    moreContext:
      "How should i start hacking this CTF machine? Tell me the first thing.",
  },
  {
    idea: "Next step",
    moreContext:
      "I have run nmap and there is only port 22 and 80 open. What should i do next?",
  },
  {
    idea: "Keep bruteforcing?",
    moreContext:
      "I ran hydra for login page but it couldn't find anything. Should i keep bruteforcing?",
  },
  {
    idea: "Check image for LSB",
    moreContext:
      " i made so many analysis on image but there was nothing until now. Should i try LSB?",
  },
];

export default function DefaultIdeas({ visible = true }) {
  return (
    <div className={`row1 ${visible ? "block" : "hidden"}`}>
      <DefaultIdea ideas={defaultIdeas.slice(0, 2)} />
      <DefaultIdea
        ideas={defaultIdeas.slice(2, 4)}
        myclassNames="hidden md:visible"
      />
    </div>
  );
}
