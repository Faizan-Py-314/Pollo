from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field

class Options(BaseModel):
    title: str
    votes: list[int]

class Comments(BaseModel):
    user: str
    comment: str

class PollBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1)
    options: list[Options]
    comments: list[Comments]
    finished_at: datetime

class PollCreate(PollBase):
    pass

class PollResponse(PollBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime

