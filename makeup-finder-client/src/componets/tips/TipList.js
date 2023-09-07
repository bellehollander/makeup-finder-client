import { GetAllTips } from "../../managers/TipManager";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeleteTip } from "../../managers/TipManager";

export const TipList = () => {
  const [tips, setTips] = useState([]);

  const getTips = () => {
    return GetAllTips().then((tipsFromAPI) => {
      setTips(tipsFromAPI);
    });
  };

  useEffect(() => {
    getTips();
  }, []);

  return (
    <>
      <h1>Tips</h1>
      <div className="tips">
        {tips.map((tip) => (
          <div key={tip.id}>
            <h3>{tip.label}</h3>
            <p>{tip.description}</p>
            <p> Skill Level: {tip.makeup_skill.label}</p>
            <button
              onClick={() => {
                DeleteTip(tip.id).then(() => {
                  getTips();
                });
              }}
            >
              Delete
            </button>
          </div>
        ))}
        <Link to="/createTip"> Create a Tip!</Link>
      </div>
    </>
  );
};
