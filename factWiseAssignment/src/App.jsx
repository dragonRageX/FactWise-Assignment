import React from "react"
import initialUsersData from "./../../celebrities.json"
import './App.css'
import NameField from "./components/NameField";
import AgeField from "./components/AgeField";
import GenderDropdown from "./components/GenderDropdown";
import CountryField from "./components/CountryField";
import DescriptionArea from "./components/DescriptionArea";

function App() {
  let newInitialUsersData = initialUsersData.map((user) => {
    return ({
      ...user,
      isExpanded: false
    })
  });
  let [usersData, setUsersData] = React.useState(newInitialUsersData);
  console.log(usersData);

  let [showDeleteDialogueBox, setShowDeleteDialogueBox] = React.useState(false);
  let [showEditBox, setShowEditBox] = React.useState(false);

  let [currentUser, setCurrentUser] = React.useState(null);
  console.log(currentUser);

  function expandUser(event, userId)
  {
    event.stopPropagation();
    setUsersData((prevUsersData) => {
      return prevUsersData.map((user) => {
        if(user.id === userId)
        {
          return ({
            ...user,
            isExpanded: !user.isExpanded   //this adds a new property of 'isExpanded' to the 'user' object.
          });
        }
        else
        {
          return ({
            ...user,
            isExpanded: false
          });
        }
      });
    });

    setCurrentUser(usersData.find((user) => user.id === userId));

    setShowDeleteDialogueBox(false);
    setShowEditBox(false);
  }

  function calculateAge(birthdate)
  {
    const birthYear = new Date(birthdate).getFullYear();
    const currentYear = new Date().getFullYear();

    return (currentYear - birthYear);
  }

  function deleteBeforeDialogueBox(event)
  {
    event.stopPropagation();
    setShowDeleteDialogueBox(true);
    setShowEditBox(false);
  }

  function cancelDelete(event)
  {
    event.stopPropagation();
    setShowDeleteDialogueBox(false);
  }

  function deleteUser(event, userId)
  {
    event.stopPropagation();
    setUsersData((prevUsersData) => {
      return prevUsersData.filter((user) => user.id !== userId);
    });
    setShowDeleteDialogueBox(false);
  }

  function editDetails(event)
  {
    event.stopPropagation();
    setShowEditBox(true);
    setShowDeleteDialogueBox(false);
  }

  function cancelEdit(event)
  {
    event.stopPropagation();
    setShowEditBox(false);
    // setShowDeleteDialogueBox(false);
  }

  function confirmEdit(event, userId)
  {
    event.stopPropagation();

    if(Object.values(currentUser).some(value => value === "" || value === null))   //to check if there are any empty string or null values inside all properties of the 'currentUser' object.
    {
      alert("Dont leave any fields empty!");
    }
    else   //if there ain't any empty fields, we update the edits.
    {
      setUsersData((prevUsersData) => {
        return prevUsersData.map((user) => {
          if(user.id === userId)
          {
            return currentUser;
          }
          else
          {
            return ({
              ...user
            });
          }
        });
      });
  
      setShowEditBox(false);
    }
  }
  
  let usersElements = usersData.map((user) => {
    if(user.isExpanded === true)   //open/expanded accordions
    {
      return (
        <div key={user.id} className="expanded-user-container" onClick={(event) => expandUser(event, user.id)}>
          <div className="top-line">
            <img src={user.picture} alt="celeb pfp" className="user-image" />
            <div className="celeb-name">
              {showEditBox ? <NameField firstName = {user.first} lastName = {user.last} currentUser = {currentUser} setCurrentUser = {setCurrentUser} /> : <h5 className="expanded-name">{user.first} {user.last}</h5>}
            </div>
            <span className="material-symbols-outlined">expand_less</span>
          </div>
          <div className="general-details">
            <div className="age-container">
              <p className="gen-head">Age</p>
              {showEditBox ? <AgeField age = {calculateAge(user.dob)} currentUser = {currentUser} setCurrentUser = {setCurrentUser} /> : <p>{calculateAge(user.dob)} Years</p>}
            </div>
            <div className="gender-container">
              <p className="gen-head">Gender</p>
              {showEditBox ? <GenderDropdown gender = {user.gender} currentUser = {currentUser} setCurrentUser = {setCurrentUser} /> : <p>{user.gender}</p>}
            </div>
            <div className="country-container">
              <p className="gen-head">Country</p>
              {showEditBox ? <CountryField country = {user.country} currentUser = {currentUser} setCurrentUser = {setCurrentUser} /> : <p>{user.country}</p>}
            </div>
          </div>
          <div className="description-container">
            <p className="gen-head">Description</p>
            {showEditBox ? <DescriptionArea description = {user.description} currentUser = {currentUser} setCurrentUser = {setCurrentUser} /> : <p>{user.description}</p>}
          </div>
          {
            (!showEditBox) &&   //delete and edit buttons
            <div className="user-options">
              <div className="delete-container" onClick={(event) => deleteBeforeDialogueBox(event)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-trash3" viewBox="0 0 16 16">
                  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                </svg>
              </div>
              {
              // (calculateAge(user.dob) >= 18) && 
              <div className={`edit-container ${calculateAge(user.dob) >= 18 ? null : "not-adult"}`} onClick={(event) => {calculateAge(user.dob) >= 18 ? editDetails(event) : event.stopPropagation()}}>
                <svg xmlns="http://www.w3.org/2000/svg" className="bi bi-pencil" viewBox="0 0 16 16">
                  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                </svg>
              </div>
              }
            </div>
          }   {/*Put them in their own card component */}

          {
            showDeleteDialogueBox &&   //cancel-delete and confirm-delete buttons
            <div className="delete-dialogue-box-container">
              <p>Are you sure you want to delete?</p>
              <div className="delete-buttons-container">
                <button className="cancel-delete-button" onClick={(event) => cancelDelete(event)}>Cancel</button>
                <button className="delete-button" onClick={(event) => deleteUser(event, user.id)}>Delete</button>
              </div>
            </div>
          }

          {
            showEditBox &&   //cancel-edit and confirm-edit buttons
            <div className="confirm-edit-container">
              <div className="cancel-edit-button" onClick={(event) => {cancelEdit(event)}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
                aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <title>Cancel Edits</title>
                  <desc>A line styled icon from Orion Icon Library.</desc>
                  <circle data-name="layer2"
                  cx="32.001" cy="32" r="30" transform="rotate(-45 32.001 32)" fill="none"
                  stroke="red" strokeMiterlimit="10" strokeWidth="4" strokeLinejoin="round"
                  strokeLinecap="round"></circle>
                  <path data-name="layer1" fill="none" stroke="red" strokeMiterlimit="10"
                  strokeWidth="4" d="M42.999 21.001l-22 22m22 0L21 21" strokeLinejoin="round"
                  strokeLinecap="round"></path>
                </svg>
              </div>
              <div className="confirm-edit-button" onClick={(event) => {confirmEdit(event, user.id)}}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
                aria-describedby="desc" role="img" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <title>Confirm Edits</title>
                  <desc>A line styled icon from Orion Icon Library.</desc>
                  <circle data-name="layer2"
                  cx="32" cy="32" r="30" transform="rotate(-45 32 32)" fill="none" stroke="#699e19"
                  strokeMiterlimit="10" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"></circle>
                  <path data-name="layer1" fill="none" stroke="#699e19" strokeMiterlimit="10"
                  strokeWidth="4" d="M20.998 32.015l8.992 8.992 16.011-16.011" strokeLinejoin="round"
                  strokeLinecap="round"></path>
                </svg>
              </div>
            </div>
          }
        </div>
      );
    }
    else   //closed accordions
    {
      return (
        <div key={user.id} className="user-container" onClick={(event) => expandUser(event, user.id)}>
          <img src={user.picture} alt="celeb pfp" className="user-image" />
          <div className="celeb-name">
            <h5>{user.first}</h5>
            <h5>{user.last}</h5>
          </div>
          <span className="material-symbols-outlined">expand_more</span>
        </div>
      )
    }
  });

  return (
    <div className="list-container">
      {usersElements}
    </div>
  );
}

export default App
