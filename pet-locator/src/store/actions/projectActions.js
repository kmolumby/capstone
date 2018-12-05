
import { Redirect } from 'react-router-dom'

export const createProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore.collection('projects').add({
      ...project,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR' }, err);
    });



  }
};



export const removeProject = (project, history) => {
  return (dispatch, getState, {getFirestore}) => {
    console.log(project)
    const firestore = getFirestore();
    console.log(firestore, "<----this is firestore")
    console.log(firestore.collection("projects").doc("project"), "<------- this is document to delete")
   const deleteDoc =  firestore.collection("projects").doc(project).delete().then(() => {
      dispatch({ type: 'DELETE_PROJECT_SUCCESS', project })
      history.push("/");
    }).catch(err => {
      dispatch({ type: 'DELETE_PROJECT_ERROR' }, err);
    });

  }
};








