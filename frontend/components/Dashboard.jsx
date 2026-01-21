import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';
import Notes from './Notes';
import NoteDetail from './NoteDetail';

function Dashboard() {
    const [notes, setNotes] = useState([]);
    const { noteId } = useParams();
    
    console.log("Dashboard rendered", notes.length, "notes")

    const handleDeleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    if (noteId) {
        const note = notes.find(note => note.id === parseInt(noteId));
        return (
            <Container fluid>
                <Row>
                    <Col md={3} className="p-0">
                        <Sidebar 
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />
                    </Col>
                    <Col md={9}>
                        <NoteDetail 
                            note={note} 
                            onDelete={handleDeleteNote}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }

    return (
        <Container fluid>
            <Row>
                <Col md={3} className="p-0">
                    <Sidebar 
                    />
                </Col>
                <Col md={9}>
                    <Notes 
                        notes={notes}
                        setNotes={setNotes}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Dashboard;