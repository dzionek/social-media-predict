from pytest import raises
from datetime import date

from prediction.main import Prediction


def test_get_link() -> None:
    youtube_prediction = Prediction('testUser', 'YouTube')
    assert youtube_prediction._link.endswith(
        'youtube/channel/testUser/monthly'
    )

    twitch_prediction = Prediction('testUser', 'Twitch')
    assert twitch_prediction._link.endswith(
        'twitch/user/testUser/monthly'
    )

    twitter_prediction = Prediction('testUser', 'Twitter')
    assert twitter_prediction._link.endswith(
        'twitter/user/testUser/monthly'
    )

    with raises(NotImplementedError):
        Prediction('testUser', 'unsupported platform')


def test_does_exist() -> None:
    exist_prediction = Prediction('pewdiepie', 'YouTube')
    assert exist_prediction.does_exist()

    not_exist_prediction = Prediction('asdjpajsdasjdalksdjlaksjdsa', 'YouTube')
    assert not not_exist_prediction.does_exist()


def test_get_prediction() -> None:
    prediction = Prediction('pewdiepie', 'YouTube')

    with raises(ChildProcessError):
        prediction.get_prediction()

    prediction.get_parsed()

    result = prediction.get_prediction()

    assert result['predicted'] and result['r']


def test_linear_regression() -> None:
    x_values = [0, 1, 2]
    y_values = [0, 5, 10]
    first_day = date(2000, 12, 1)

    result = Prediction._linear_regression(x_values, y_values, first_day)

    assert result['r'] == 1
    assert result['predicted'][0] == ['2000-12-03', 10]
    assert result['predicted'][1] == ['2000-12-04', 15]

    y_values = [0, 10, 5]
    result = Prediction._linear_regression(x_values, y_values, first_day)

    assert 0 < result['r'] < 1
    assert result['predicted'][0] == ['2000-12-03', 7]
    assert result['predicted'][1] == ['2000-12-04', 10]

    y_values = [5, 5, 5]
    result = Prediction._linear_regression(x_values, y_values, first_day)
    assert result['r'] == 1
