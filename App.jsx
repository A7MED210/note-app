import React from "react"
import { useState, useEffect } from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {
  doc,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore"
import { notesCollection, db } from "./firebase"

export default function App() {
  const [notes, setNotes] = useState([])
  const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "")

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0]

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      console.log("things are changing!!!")
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      console.log(notesArr)
      setNotes(notesArr)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id)
    }
  }, [notes])

  async function createNewNote() {
    const time = new Date().getTime()
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: time,
      updatedAt: time,
    }

    const newNoteRef = await addDoc(notesCollection, newNote)
    setCurrentNoteId(newNoteRef.id)
  }

  async function updateNote(text, event) {
    const noteRef = doc(db, "notes", currentNoteId)
    await updateDoc(
      noteRef,
      { body: text, updatedAt: new Date().getTime() },
      { merge: true }
    )
  }

  async function deleteNote(noteId) {
    const deletedDocRef = await deleteDoc(doc(db, "notes", noteId))
  }

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />

          <Editor currentNote={currentNote} updateNote={updateNote} />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  )
}
