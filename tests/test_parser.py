import requests
from pytest import raises
from datetime import datetime, date

from prediction.parser import Parser
from prediction.main import HEADERS


def get_youtube_parser(user: str) -> Parser:
    response = requests.get(
        f'https://socialblade.com/youtube/channel/{user}/monthly',
        headers=HEADERS
    )
    return Parser(response.text, 'YouTube')


def get_twitch_parser(user: str) -> Parser:
    response = requests.get(
        f'https://socialblade.com/twitch/user/{user}/monthly',
        headers=HEADERS
    )
    return Parser(response.text, 'Twitch')


def get_twitter_parser(user: str) -> Parser:
    response = requests.get(
        f'https://socialblade.com/twitter/user/{user}/monthly',
        headers=HEADERS
    )
    return Parser(response.text, 'Twitter')


def test_count() -> None:
    parser = get_youtube_parser('_')
    assert parser.count('1.23K') == 1230
    assert parser.count('12.7M') == 12700000
    assert parser.count('0') == 0
    assert parser.count('999') == 999

    with raises(ValueError):
        parser.count('9G')


def test_get_username() -> None:
    youtube_parser = get_youtube_parser('billgates')
    assert youtube_parser._get_username() == 'Bill Gates'

    twitch_parser = get_twitch_parser('chess')
    assert twitch_parser._get_username() == 'Chess'

    twitter_parser = get_twitter_parser('billgates')
    assert twitter_parser._get_username() == 'Bill Gates'


def test_get_picture() -> None:
    youtube_parser = get_youtube_parser('billgates')
    response = requests.get(youtube_parser._get_picture())
    assert response.status_code == 200

    twitch_parser = get_twitch_parser('chess')
    response = requests.get(twitch_parser._get_picture())
    assert response.status_code == 200

    twitter_parser = get_twitter_parser('billgates')
    response = requests.get(twitter_parser._get_picture())
    assert response.status_code == 200


def test_get_subscribers() -> None:
    youtube_parser = get_youtube_parser('pewdiepie')
    youtube_dates, subscribers = youtube_parser._get_subscribers()
    assert all(map(lambda s: s > 1e6, subscribers))

    twitch_parser = get_youtube_parser('pewdiepie')
    twitch_dates, subscribers = twitch_parser._get_subscribers()
    assert all(map(lambda s: s > 1e6, subscribers))

    twitter_parser = get_youtube_parser('pewdiepie')
    twitter_dates, subscribers = twitter_parser._get_subscribers()
    assert all(map(lambda s: s > 1e6, subscribers))

    assert (youtube_dates == twitch_dates) and (twitch_dates == twitter_dates)
    first_date = date(*map(int, youtube_dates[0].split('-')))
    first_date = datetime.combine(first_date, datetime.min.time())

    assert (datetime.now() - first_date).days >= 29


def test_parse() -> None:
    youtube_parser = get_youtube_parser('billgates')
    parsed = youtube_parser.parse()
    assert parsed['username'] == 'Bill Gates'

    twitch_parser = get_twitch_parser('chess')
    parsed = twitch_parser.parse()
    assert isinstance(parsed['subscribers'], list)

    twitter_parser = get_twitter_parser('billgates')
    parsed = twitter_parser.parse()
    assert parsed['picture']

    insignificant_parser = get_twitch_parser('dzionkers')
    parsed = insignificant_parser.parse()
    assert parsed['insignificant']
