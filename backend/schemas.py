from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field

class PollBase(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1)
    options: list[str]
    votes: list[int]
    finished_at: datetime

class PollCreate(PollBase):
    pass

class PollResponse(PollBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime

