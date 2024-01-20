import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import RedDot from "./components/animation/RedDot";
import { db, storage } from "./config/firebase";

const TeamLogo = ({ imagePath }) => {
  const [imageUrl, setImageUrl] = useState("");
  const logoName =
    typeof imagePath === "string" ? imagePath.replace(/\s+/g, "_") : "";
  useEffect(() => {
    const imageRef = ref(storage, `teamLogos/${logoName}`);

    getDownloadURL(imageRef)
      .then((url) => setImageUrl(url))
      .catch((error) =>
        console.error("Error while getting team logo: ", error)
      );
  }, [logoName]);

  return (
    <div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`${imagePath} logo }`}
          className="h-28 w-28 object-cover"
        />
      )}
    </div>
  );
};

function App() {
  const [teamDetails, setTeamDetails] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const {
    teamName: firstTeamName,
    teamScore: firstTeamScore,
    teamWickets: firstTeamWickets,
    teamBalls: firstTeamBalls,
  } = teamDetails[0] || {};
  const {
    teamName: secondTeamName,
    teamScore: secondTeamScore,
    teamWickets: secondTeamWickets,
    teamBalls: secondTeamBalls,
  } = teamDetails[1] || {};

  const getTeamList = async () => {
    try {
      const team1Ref = doc(db, "teamDetails", "team1Details");
      const team2Ref = doc(db, "teamDetails", "team2Details");
      const matchRef = doc(db, "matchState", "nowMatchState");

      const team1DocSnap = await getDoc(team1Ref);
      const team2DocSnap = await getDoc(team2Ref);
      const matchDocSnap = await getDoc(matchRef);

      const team1Data = team1DocSnap.exists() ? team1DocSnap.data() : null;
      const team2Data = team2DocSnap.exists() ? team2DocSnap.data() : null;
      const matchData = matchDocSnap.exists() ? matchDocSnap.data() : null;

      setTeamDetails([team1Data, team2Data]);
      setMatchData(matchData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTeamList();
    const intervalId = setInterval(() => {
      getTeamList();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className="bg-blue-500 w-full py-6 md:py-12 px-10 md:px-48 transition-all duration-1000">
        <div className="flex flex-col text-black">
          <span className="text-black text-2xl md:text-4xl">
            Sri Lankan Premier League
          </span>
          <div className="flex items-center -ml-2 mt-1">
            <RedDot />
            <p className="text-lg ml-2">Live Score</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 flex flex-col p-4 md:w-1/3 mx-auto">
        <div className="flex flex-col items-center md:justify-around">
          <h1 className="text-xl font-semibold my-2 uppercase">
            {firstTeamName} <span className="capitalize">Vs. </span>
            {secondTeamName}
          </h1>
          <p className="mb-4">{matchData.matchNumber}</p>
          <div className="flex items-center md:gap-8 gap-24">
            <div className="flex flex-col items-center">
              <TeamLogo imagePath={firstTeamName} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-xl">
                {firstTeamScore}/{firstTeamWickets}
              </p>
              <p className="font-medium text-base">
                ({firstTeamBalls}/{matchData.totalBalls})
              </p>
            </div>
          </div>

          <div className="flex items-center md:gap-8 gap-24 mt-4">
            <div className="flex flex-col items-center">
              <TeamLogo imagePath={secondTeamName} />
            </div>
            <div className="flex flex-col items-center">
              <p className="font-bold text-xl">
                {secondTeamScore}/{secondTeamWickets}
              </p>
              <p className="font-medium text-base">
                ({secondTeamBalls}/{matchData.totalBalls})
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
