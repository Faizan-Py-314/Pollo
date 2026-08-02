from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, EmailStr

class UserBase(BaseModel):
    username: str = Field(min_length=1, max_length=120)
    email: EmailStr

class UserCreate(UserBase):
    password: str = Field(min_length=8, max_length=200)


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

class Token(BaseModel):
    access_token: str
    token_type: str

class OptionsBase(BaseModel):
    title: str

class OptionsResponse(OptionsBase):
    votes: list[int] = Field(default=[])
    color: str

class VoteRequest(BaseModel):
    option_index: int

class CommentsBase(BaseModel):
    comment: str

class CommentsCreate(CommentsBase):
    user: str

class CommentDelete(BaseModel):
    comment_index: int

class PollBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1)
    finished_at: datetime

class PollCreate(PollBase):
    options: list[OptionsBase]
    pass

class PollResponse(PollBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    options: list[OptionsResponse]
    comments: list[CommentsCreate] = Field(default=[])
    created_at: datetime

