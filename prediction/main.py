import requests
from typing import Dict, List, Tuple
from datetime import date, timedelta
from scipy import stats

from .parser import Parser

HEADERS = {
    'User-Agent': "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
                  "(KHTML, like Gecko) Chrome/79.0.3945.94 Safari/537.36"
}


class Prediction:
    def __init__(self, username: str, platform: str) -> None:
        self.username = username
        self.platform = platform
        self.link = self._get_link()
        self.content = self._get_content()
        self.parsed = None

    def _get_link(self) -> str:
        if self.platform == 'YouTube':
            return f'https://socialblade.com/youtube/channel/{self.username}/monthly'
        elif self.platform == 'Facebook':
            return f'https://socialblade.com/facebook/page/{self.username}'
        elif self.platform == 'Twitter':
            return f'https://socialblade.com/twitter/user/{self.username}/monthly'
        else:
            raise ValueError('The given platform is not supported.')

    def _get_content(self) -> str:
        response = requests.get(self.link, headers=HEADERS)
        return response.text

    def does_exist(self) -> bool:
        return 'sorry' not in self.content

    def get_parsed(self) -> Dict:
        parser = Parser(self.content, self.platform)
        self.parsed = parser.parse()
        return self.parsed

    def get_prediction(self) -> Dict:
        if not self.parsed:
            raise ChildProcessError('You need to parse first.')
        else:
            assert isinstance(self.parsed, Dict)

        dates_str = self.parsed['dates']
        subscribers = self.parsed['subscribers']
        print(subscribers)

        dates = [
            date(*map(int, date_str.split('-')))
            for date_str in dates_str
        ]

        first_day = dates[0]
        dates_num = [(d - first_day).days for d in dates]

        prediction = self._linear_regression(
            dates_num, subscribers, first_day, last_day_num=dates_num[-1]
        )

        return prediction

    @staticmethod
    def _linear_regression(x_values: List[int], y_values: List[int],
                           first_day: date, last_day_num: int) -> Dict:

        slope, intercept, r, _, _ = stats.linregress(x_values, y_values)

        def linear_function(x: int) -> float:
            return slope * x + intercept

        predicted = [
            [
                (first_day + timedelta(days=day)).strftime('%Y-%m-%d'),
                int(linear_function(day))
            ]
            for day in range(last_day_num, last_day_num + 91)
        ]

        return {'predicted': predicted, 'r': r}
