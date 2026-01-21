import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NoteDetail({ note, onDelete, onBack }) {
    const navigate = useNavigate();
    console.log("viewing note", note?.id) // debug

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            onDelete(note.id);
            navigate('/dashboard');
        }
    };

    const handleBack = () => {
        if (onBack) {
            onBack();
        } else {
            navigate('/dashboard');
        }
    };

    if (!note) {
        return (
            <Container className="p-4">
                <Button variant="secondary" onClick={() => navigate('/dashboard')} className="mb-3">
                    ← Back to Dashboard
                </Button>
                <p className="text-muted">Note not found</p>
            </Container>
        );
    }

    return (
        <Container className="p-4">
            <Button variant="secondary" onClick={handleBack} className="mb-3">
                ← Back to Dashboard
            </Button>
            
            <Card>
                <Card.Body>
                    <Card.Title as="h2">{note.title}</Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                        Category: {note.category || 'all'}
                    </Card.Subtitle>
                    <Card.Text style={{ whiteSpace: 'pre-wrap', fontSize: '1.1rem' }}>
                        {note.content}
                    </Card.Text>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                            Created: {new Date(note.createdAt).toLocaleString()}
                        </small>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete Note
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default NoteDetail;
