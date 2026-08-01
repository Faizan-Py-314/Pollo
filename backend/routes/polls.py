from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status, WebSocket, WebSocketDisconnect
from sqlalchemy import select
from sqlalchemy.orm import Session
from sqlalchemy.orm.attributes import flag_modified
from datebase import get_db
import models
from schemas import PollCreate, PollResponse, VoteRequest, CommentsBase
from auth import CurrentUser
from colors import generate_unique_colors
from websocket_manager import manager

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

@router.websocket("/ws/{poll_id}")
async def websocket_poll_endpoint(websocket: WebSocket, poll_id: int):
    await manager.connect(poll_id, websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(poll_id, websocket)

@router.post("/{poll_id}/vote", response_model=PollResponse)
async def vote_poll(poll_id: int, vote_data: VoteRequest, current_user: CurrentUser, db: Annotated[Session, Depends(get_db)]):

    result = db.execute(select(models.Poll).where(models.Poll.id == poll_id))
    poll = result.scalars().first()

    if not poll:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='poll not found')

    if vote_data.option_index < 0 or vote_data.option_index >= len(poll.options):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='invailed option index')

    user_id = current_user.id
    options = poll.options

    already_voted_this_option = user_id in options[vote_data.option_index].get('votes', [])

    for option in options:
        if 'votes' not in option:
            option['votes'] = []
        if user_id in option['votes']:
            option['votes'].remove(user_id)

    if not already_voted_this_option:
        options[vote_data.option_index]['votes'].append(user_id)

    poll.options = options
    flag_modified(poll, 'options')

    db.commit()
    db.refresh(poll)

    update_poll_data = PollResponse.model_validate(poll).model_dump(mode='json')
    await manager.broadcast(poll_id, update_poll_data)

    return poll


@router.post('/{poll_id}/comments', response_model=PollResponse)
async def add_comment(poll_id: int, current_user: CurrentUser, comment: CommentsBase, db: Annotated[Session, Depends(get_db)]):

    result = db.execute(select(models.Poll).where(models.Poll.id == poll_id))
    poll = result.scalars().first()

    if not poll:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Poll Not Found")

    comments = poll.comments if poll.comments is not None else []

    comments.append({"user": current_user.username, "comment": comment.comment})

    poll.comments = comments
    flag_modified(poll, 'comments')

    db.commit()
    db.refresh(poll)

    update_poll_data = PollResponse.model_validate(poll).model_dump(mode='json')
    await manager.broadcast(poll_id, update_poll_data)

    return poll