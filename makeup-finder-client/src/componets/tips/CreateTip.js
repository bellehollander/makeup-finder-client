import { useEffect, useState } from "react";
import { CreateTip } from "../../managers/TipManager";
import { useNavigate } from "react-router-dom";

export const CreateTips = () => {
  const [tip, setTip] = useState({
    label: "",
    description: "",
    makeup_skill: 0,
    image: "",
  });
  const [Skill, setSkill] = useState([]);
  const navigate = useNavigate();

  const handleControlledInputChange = (event) => {
    const newTip = { ...tip };
    newTip[event.target.id] = event.target.value;
    setTip(newTip);
  };

  const handleClickSaveTip = (event) => {
    event.preventDefault();
    const newTip = {
      label: tip.label,
      description: tip.description,
      makeup_skill: parseInt(tip.makeup_skill),
      image: tip.image,
    };
    CreateTip(newTip).then(() => {
      navigate("/tipManager");
    });
  };

  const getSkill = () => {
    fetch("http://localhost:8000/makeupskill", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSkill(data));
  };

  useEffect(() => {
    getSkill();
  }, []);

  return (
    <>
      <form className="tipForm">
        <h2 className="tipForm__title">New Tip</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="label">Tip Label:</label>
            <input
              type="text"
              id="label"
              required
              autoFocus
              className="form-control"
              placeholder="Tip Label"
              value={tip.label}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description">Tip Description:</label>
            <input
              type="text"
              id="description"
              required
              autoFocus
              className="form-control"
              placeholder="Tip Description"
              value={tip.description}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="makeup_skill">Tip Skill Level:</label>
            <select
              value={tip.makeup_skill}
              name="makeup_skill"
              id="makeup_skill"
              className="form-control"
              onChange={handleControlledInputChange}
            >
              <option value="0">Select a Skill Level</option>
              {Skill.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.label}
                </option>
              ))}
            </select>
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="image">Tip Image:</label>
            <input
              type="text"
              id="image"
              autoFocus
              className="form-control"
              placeholder="Tip Image"
              value={tip.image}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <button className="btn btn-primary" onClick={handleClickSaveTip}>
          Save Tip
        </button>
      </form>
    </>
  );
};
