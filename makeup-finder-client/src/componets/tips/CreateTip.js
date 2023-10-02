import { useEffect, useState } from "react";
import { CreateTip } from "../../managers/TipManager";
import { useNavigate } from "react-router-dom";

export const CreateTips = () => {
  // set up the initial state for tip
  const [tip, setTip] = useState({
    label: "",
    description: "",
    makeup_skill: 0,
    image: "",
  });
  // set up inital state for makeup skill
  const [Skill, setSkill] = useState([]);

  const navigate = useNavigate();
  // function to handle the input changes
  const handleControlledInputChange = (event) => {
    // create a copy of the tip state
    const newTip = { ...tip };
    // set the value of the input to the value of the tip state
    newTip[event.target.id] = event.target.value;
    // set the state of the tip to the new tip
    setTip(newTip);
  };
  // function to handle the save button click
  const handleClickSaveTip = (event) => {
    // prevent the default action
    event.preventDefault();
    // create a new tip object
    const newTip = {
      label: tip.label,
      description: tip.description,
      makeup_skill: parseInt(tip.makeup_skill),
      image: tip.image,
    };
    // create the tip and redirect to the tip manager
    CreateTip(newTip).then(() => {
      navigate("/tipManager");
    });
  };
  // fetch the makeupskill from the API, then set the state
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
  // on inital render of the page, get the makeup skill
  useEffect(() => {
    getSkill();
  }, []);

  return (
    <>
      <form className="edit-product-form">
        <h2 className="edit-product-form__title">New Tip</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="label" className="edit-product-label">
              Tip Label:
            </label>
            <input
              type="text"
              id="label"
              required
              autoFocus
              className="edit-product-input"
              placeholder="Tip Label"
              value={tip.label}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="description" className="edit-product-label">
              Tip Description:
            </label>
            <input
              type="text"
              id="description"
              required
              autoFocus
              className="edit-product-input"
              placeholder="Tip Description"
              value={tip.description}
              onChange={handleControlledInputChange}
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <label htmlFor="makeup_skill" className="edit-product-label">
              Tip Skill Level:
            </label>
            <select
              value={tip.makeup_skill}
              name="makeup_skill"
              id="makeup_skill"
              className="edit-product-input"
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
            <label htmlFor="image" className="edit-product-label">
              Tip Image:
            </label>
            <input
              type="text"
              id="image"
              autoFocus
              className="edit-product-input"
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
