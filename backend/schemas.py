from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field

class OptionsBase(BaseModel):
    title: str
    votes: list[int]

class OptionsResponse(OptionsBase):
    color: str

class Comments(BaseModel):
    user: str
    comment: str

class PollBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1)
    comments: list[Comments]
    finished_at: datetime

class PollCreate(PollBase):
    options: list[OptionsBase]
    pass

class PollResponse(PollBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    options: list[OptionsResponse]
    created_at: datetime

