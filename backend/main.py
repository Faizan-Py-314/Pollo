from typing import Annotated
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session
from datebase import get_db, Base, engine
import models
from schemas import PollCreate, PollResponse

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.post('/api/poll', response_model=PollResponse, status_code=status.HTTP_201_CREATED)
def create_poll(poll: PollCreate, db: Annotated[Session, Depends(get_db)]):

    new_poll = models.Poll(
        title=poll.title,
        description=poll.description,
        options=[opt.model_dump() for opt in poll.options],
        comments=[comm.model_dump() for comm in poll.comments],
        finished_at=poll.finished_at
    )

    db.add(new_poll)
    db.commit()
    db.refresh(new_poll)

    return new_poll

@app.get('/api/poll', response_model=list[PollResponse])
def get_polls(db: Annotated[Session, Depends(get_db)]):
    result = db.execute(select(models.Poll))
    polls = result.scalars().all()

    return polls

@app.get("/api/poll/{poll_id}", response_model=PollResponse)
def get_poll(poll_id: int, db: Annotated[Session, Depends(get_db)]):
    result = db.execute(select(models.Poll).where(models.Poll.id == poll_id))
    poll = result.scalars().first()

    if not poll:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Poll not Found")

    return poll

origins = [
    'http://localhost:5173',
    'http://192.168.100.31:5173',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

