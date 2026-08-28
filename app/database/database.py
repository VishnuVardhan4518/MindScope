import os
from urllib.parse import quote_plus

from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker


load_dotenv()


DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")


missing_settings = [
    name
    for name, value in {
        "DB_HOST": DB_HOST,
        "DB_PORT": DB_PORT,
        "DB_USER": DB_USER,
        "DB_PASSWORD": DB_PASSWORD,
        "DB_NAME": DB_NAME,
    }.items()
    if not value
]

if missing_settings:
    raise RuntimeError(
        "Missing database settings: "
        f"{', '.join(missing_settings)}"
    )


DATABASE_URL = (
    f"mysql+pymysql://{DB_USER}:{quote_plus(DB_PASSWORD)}"
    f"@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)


engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()