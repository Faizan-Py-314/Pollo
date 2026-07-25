from datetime import datetime, UTC

from sqlalchemy import DateTime, String, Integer, Text, JSON
from sqlalchemy.orm import mapped_column, Mapped

from datebase import Base

class Poll(Base):
    __tablename__ = 'polls'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    options: Mapped[list[str]] = mapped_column(JSON, nullable=False)
    votes: Mapped[list[int]] = mapped_column(JSON, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))
    finished_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
