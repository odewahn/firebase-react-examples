import "./App.css";

import { useState, useEffect, useContext } from "react";
import { profileRef } from "./firebase";

import { AuthContext } from "./AuthContext";

function App() {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [profiles, setProfiles] = useState([]);

  const theContext = useContext(AuthContext);

  console.log("the context is", theContext);

  // Load the initial list of profile data
  useEffect(() => {
    getProfilesRT();
  }, [theContext]);

  // Update the list of profiles
  const getProfilesRT = async () => {
    var newProfiles = [];
    try {
      const p = await profileRef
        .where("uid", "==", theContext.user.uid)
        .onSnapshot((snapshot) => {
          snapshot.docChanges().forEach((change) => {
            // Create a new record that has been changed.
            const changedRec = {
              id: change.doc.id,
              ...change.doc.data(),
            };
            // If the record is beind added, then append to the array
            if (change.type === "added") {
              newProfiles = [...newProfiles, changedRec];
            }
            // If the record is modified, merge the new values in
            if (change.type == "modified") {
              // Find the id for the item that is changed
              const changedIdx = newProfiles.findIndex(
                (item) => item.id == changedRec.id
              );
              // Update the item in the list
              newProfiles = newProfiles.map((item, idx) =>
                idx == changedIdx ? changedRec : item
              );
            }
            //If the record is deleted, then remove it
            if (change.type == "removed") {
              newProfiles = newProfiles.filter(
                (item) => item.id !== changedRec.id
              );
            }
          });
          setProfiles(newProfiles);
        });
    } catch (err) {
      console.log("error getting profiles", err);
    }
  };

  const deleteProfile = async (id) => {
    console.log("Delete", id);
    try {
      const p = await profileRef.doc(id);
      p.delete();
    } catch (error) {
      console.error("error deleting", error);
    }
  };

  const updateProfile = async (id, e) => {
    try {
      // Write the change to firebase.  Make sure the component has a name, though!!
      if (e.target.name) {
        // Update the internal state
        var newProfiles = [...profiles];
        const idx = newProfiles.findIndex((item) => item.id === id);
        if (idx > -1) {
          newProfiles[idx][e.target.name] = e.target.value;
          setProfiles(newProfiles);
        }
        // Send change to firebase
        const p = await profileRef.doc(id);
        p.update(e.target.name, e.target.value);
        console.log("Updating", id, e.target.name, "to", e.target.value);
      } else {
        throw {
          name: "Error",
          message:
            "Input element is missing a name attribute that maps to a field",
        };
      }
    } catch (e) {
      console.log("Error updating it", e);
    }
  };

  const handleSubmit = async (uid) => {
    try {
      console.log("Trying to add a new rec");
      var profile = {
        name: name,
        handle: handle,
        created_at: new Date().toISOString(),
        uid: uid,
      };
      const newProfile = await profileRef.add(profile);
      console.log(newProfile);
    } catch (e) {
      console.error("An error occurred:", e);
    }
  };

  return (
    <div className="App">
      <h1>Hello {theContext.user.email}</h1>

      <b>Name:</b>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <b>Handle:</b>
      <input
        type="text"
        value={handle}
        onChange={(e) => {
          setHandle(e.target.value);
        }}
      />
      <button onClick={() => handleSubmit(theContext.user.uid)}>
        Click me
      </button>
      <ul>
        {profiles.map((p) => {
          return (
            <li key={p.id}>
              {p.id} =>
              <input
                type="text"
                name="name"
                value={p.name}
                onChange={(e) => {
                  updateProfile(p.id, e);
                }}
              />
              <input
                type="text"
                name="handle"
                value={p.handle}
                onChange={(e) => {
                  updateProfile(p.id, e);
                }}
              />
              <span
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  deleteProfile(p.id);
                }}
              >
                &times;
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
