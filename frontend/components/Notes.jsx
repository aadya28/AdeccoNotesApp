import React, { useState } from 'react';
import { Button, Card, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Notes({ notes, setNotes }) {
    const [newNote, setNewNote] = useState({ title: '', content: '' });
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();

    const handleCreateNote = () => {
        if (newNote.title.trim() && newNote.content.trim()) {
            console.log("creating note", newNote.title) // debug
            setNotes([
                ...notes,
                {
                    id: Date.now(),
                    ...newNote,
                    category: selectedCategory === 'all' ? 'personal' : selectedCategory,
                    createdAt: new Date().toISOString()
                }
            ]);
            setNewNote({ title: '', content: '' });
            setIsCreating(false);
        }
    };

    const handleDeleteNote = (id, event) => {
        event.stopPropagation();
        if (window.confirm('Are you sure you want to delete this note?')) {
            setNotes(notes.filter(note => note.id !== id));
        }
    };

    const handleNoteClick = (noteId) => {
        navigate(`/dashboard/${noteId}`);
    };

    const filteredNotes = notes;

    return (
        <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <Button onClick={() => setIsCreating(!isCreating)}>
                    {isCreating ? 'Cancel' : '+ New Note'}
                </Button>
            </div>

            {isCreating && (
                <Card className="mb-4">
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    placeholder="Note Title"
                                    value={newNote.title}
                                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Note Content"
                                    value={newNote.content}
                                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                                />
                            </Form.Group>
                            <Button onClick={handleCreateNote}>Save Note</Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}

            <Row>
                {filteredNotes.length === 0 ? (
                    <Col>
                        <p className="text-muted">No notes yet. Create your first note!</p>
                    </Col>
                ) : (
                    filteredNotes.map(note => (
                        <Col key={note.id} md={6} lg={4} className="mb-3">
                            <Card 
                                style={{ cursor: 'pointer' }}
                                onClick={() => handleNoteClick(note.id)}
                            >
                                <Card.Body>
                                    <Card.Title>{note.title}</Card.Title>
                                    <Card.Text 
                                        style={{ 
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical'
                                        }}
                                    >
                                        {note.content}
                                    </Card.Text>
                                    <Button 
                                        variant="danger" 
                                        size="sm"
                                        onClick={(e) => handleDeleteNote(note.id, e)}
                                    >
                                        Delete
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </div>
    );
}

export default Notes;