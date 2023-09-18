import { GetAllTips } from "../../managers/TipManager";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteTip } from "../../managers/TipManager";
import "./TipList.css"; // Import the CSS file

export const TipList = () => {
  // set up the inital state for tips
  const [tips, setTips] = useState([]);
  // function to get all tips from the API and update the tip state
  const getTips = () => {
    return GetAllTips().then((tipsFromAPI) => {
      setTips(tipsFromAPI);
    });
  };
  // on intial render of the page, get all tips
  useEffect(() => {
    getTips();
  }, []);

  return (
    <>
      <h1>Tips</h1>
      <div className="tips-container">
        {tips.map((tip) => (
          <div key={tip.id} className="tip-card">
            <h2>{tip.label}</h2>
            <p>{tip.description}</p>
            <p className="skill-level">Skill Level: {tip.makeup_skill.label}</p>
            <button
              onClick={() => {
                DeleteTip(tip.id).then(() => {
                  getTips();
                });
              }}
              className="delete-button"
            >
              Delete
            </button>
          </div>
        ))}
        <Link to="/createTip" className="create-tip-link">
          Create a Tip!
        </Link>
      </div>
    </>
  );
};
