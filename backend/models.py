from typing import Any
from datetime import datetime, UTC

from sqlalchemy import DateTime, String, Integer, Text, JSON
from sqlalchemy.orm import mapped_column, Mapped

from datebase import Base

class User(Base):
    __tablename__ = 'users'
    id: Mapped[int] = mapped_column(Integer, primary_key=True, unique=True, index=True)
    username: Mapped[str] = mapped_column(String(120), nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String(200), nullable=False, unique=True)
    password_hash: Mapped[str] = mapped_column(String(300), nullable=False)

class Poll(Base):
    __tablename__ = 'polls'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    options: Mapped[list[dict[str, Any]]] = mapped_column(JSON, nullable=False)
    comments: Mapped[list[dict[str, Any]]] = mapped_column(JSON, nullable=False, default=[])
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=lambda: datetime.now(UTC))
    finished_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
