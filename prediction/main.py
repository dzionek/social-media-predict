import requests
from typing import Dict, List, Optional
from datetime import date, timedelta
from scipy import stats  # type: ignore

from .parser import Parser

HEADERS = {
    'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/79.0.3945.94 Safari/537.36"
}


class Prediction:
    def __init__(self, username: str, platform: str) -> None:
        self._username = username
        self._platform = platform
        self._link = self._get_link()
        self._content = self._get_content()
        self._parsed: Optional[Dict] = None

    def _get_link(self) -> str:
        if self._platform == 'YouTube':
            return f'https://socialblade.com/youtube/channel/{self._username}'\
                   '/monthly'
        elif self._platform == 'Twitch':
            return f'https://socialblade.com/twitch/user/{self._username}' \
                   '/monthly'
        elif self._platform == 'Twitter':
            return f'https://socialblade.com/twitter/user/{self._username}' \
                   '/monthly'
        else:
            raise NotImplementedError('The given platform is not supported.')

    def _get_content(self) -> str:
        response = requests.get(self._link, headers=HEADERS)
        return response.text

    def does_exist(self) -> bool:
        return 'DDoS' not in self._content

    def get_parsed(self) -> Dict:
        parser = Parser(self._content, self._platform)
        self._parsed = parser.parse()
        return self._parsed

    def get_prediction(self) -> Dict:
        if not self._parsed:
            raise ChildProcessError('You need to parse first.')
        else:
            assert isinstance(self._parsed, Dict)

        dates_str = self._parsed['dates']
        subscribers = self._parsed['subscribers']

        dates = [
            date(*map(int, date_str.split('-')))
            for date_str in dates_str
        ]

        first_day = dates[0]
        dates_num = [(d - first_day).days for d in dates]

        prediction = self._linear_regression(
            dates_num, subscribers, first_day
        )

        return prediction

    @staticmethod
    def _linear_regression(x_values: List[int], y_values: List[int],
                           first_day: date) -> Dict:

        last_day_num = x_values[-1]

        slope, intercept, r, _, _ = stats.linregress(x_values, y_values)

        def linear_function(x: int) -> float:
            return float(slope * x + intercept)

        if r == 0:
            r = 1

        predicted = [
            [
                (first_day + timedelta(days=day)).strftime('%Y-%m-%d'),
                int(linear_function(day))
            ]
            for day in range(last_day_num, last_day_num + 91)
        ]

        return {'predicted': predicted, 'r': r}
