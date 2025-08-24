//WIll be added if user selects to upload to database

//Asks for the users name and character they want to use in a single box

import characters from "./assets/Selections/characters.js";
import { uploadToDatabase } from "./utils/backendUtils.js";
import "./GlobalSubmission.css"
//props will likely be the image and description
export default function GlobalSubmission(props) {

  async function handleSubmit(event) {
    event.preventDefault();

    console.log("props in gs", props);
    
    console.log("subitting now yumm");
    const name = event.target.userName.value;
    console.log("name:", name);
    const character = event.target.characterSelection.value;
    console.log("char:", character);
    await uploadToDatabase(name, props.image, character, props.description);

    props.setDisplayCamera(false);

  }
  return (
    <main className="global-submission-container">
      <form onSubmit={handleSubmit}>
        <input type="text" name="userName" placeholder="Enter name..." required aria-label="name-input" className="name-input" maxLength={13}/>

        <section className="characters-container">

          <div className="gender-selection">
            <label className="character-container">
              <input type="radio" name="characterSelection" value="boy1" required/>
              <img src={characters["boy1"]}/>
            </label>

            <label className="character-container">
              <input type="radio" name="characterSelection" value="boy2"/>
              <img src={characters["boy2"]}/>
            </label>

            <label className="character-container">
              <input type="radio" name="characterSelection" value="boy3"/>
              <img src={characters["boy3"]}/>
            </label>

            <label className="character-container">
              <input type="radio" name="characterSelection" value="boy4"/>
              <img src={characters["boy4"]}/>
            </label>

            <label className="character-container">
              <input type="radio" name="characterSelection" value="boy5"/>
              <img src={characters["boy5"]}/>
            </label>
          </div>

          <div className="gender-selection">
            <label className="character-container">
              <input type="radio" name="characterSelection" value="girl1" required/>
              <img src={characters["girl1"]}/>
            </label>

            <label className="character-container">
              <input type="radio" name="characterSelection" value="girl2"/>
              <img src={characters["girl2"]}/>
            </label>

            <label className="character-container">
              <input type="radio" name="characterSelection" value="girl3"/>
              <img src={characters["girl3"]}/>
            </label>

            <label className="character-container">
              <input type="radio" name="characterSelection" value="girl4"/>
              <img src={characters["girl4"]}/>
            </label>

            <label className="character-container">
              <input type="radio" name="characterSelection" value="girl5"/>
              <img src={characters["girl5"]}/>
            </label>
          </div>


        </section>
        
        <button type="submit" className="submit-global">Submit</button>

      </form>
    </main>
  )
}