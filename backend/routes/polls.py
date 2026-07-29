from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from datebase import get_db
import models
from schemas import PollCreate, PollResponse
from colors import generate_unique_colors

router = APIRouter()

@router.post('', response_model=PollResponse, status_code=status.HTTP_201_CREATED)
def create_poll(poll: PollCreate, db: Annotated[Session, Depends(get_db)]):

    colors = generate_unique_colors(len(poll.options))
    
    processed_options = []
    for option, color in zip(poll.options, colors):
        option_dict = option.model_dump() 
        option_dict["color"] = color
        processed_options.append(option_dict)

    new_poll = models.Poll(
        title=poll.title,
        description=poll.description,
        options=processed_options,
        comments=[comm.model_dump() for comm in poll.comments],
        finished_at=poll.finished_at
    )

    db.add(new_poll)
    db.commit()
    db.refresh(new_poll)

    return new_poll

@router.get('', response_model=list[PollResponse])
def get_polls(db: Annotated[Session, Depends(get_db)]):
    result = db.execute(select(models.Poll))
    polls = result.scalars().all()

    return polls

@router.get("/{poll_id}", response_model=PollResponse)
def get_poll(poll_id: int, db: Annotated[Session, Depends(get_db)]):
    result = db.execute(select(models.Poll).where(models.Poll.id == poll_id))
    poll = result.scalars().first()

    if not poll:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Poll not Found")

    return poll
