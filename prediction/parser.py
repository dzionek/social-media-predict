from bs4 import BeautifulSoup  # type: ignore
import re
from typing import List, Dict, Tuple


class Parser:
    def __init__(self, html: str, platform: str) -> None:
        self.html = html
        self.platform = platform
        self.soup = self._get_soup()

    def _get_soup(self) -> BeautifulSoup:
        return BeautifulSoup(self.html, 'html.parser')

    def parse(self) -> Dict:
        dates, subscribers = self._get_subscribers()
        return {
            'doesExist': True,
            'username': self._get_username(),
            'picture': self._get_picture(),
            'dates': dates,
            'subscribers': subscribers
        }

    def _get_username(self) -> str:
        top_info = self.soup.find(id='YouTubeUserTopInfoBlockTop')
        username_tag = 'h2' if self.platform == 'Twitter' else 'h1'
        username = str(top_info.find(username_tag).text)

        if self.platform == 'Twitter':
            username = username.split(' @')[0]

        return username

    def _get_picture(self) -> str:
        picture = self.soup.find(id='YouTubeUserTopInfoAvatar')
        return str(picture.attrs.get('src'))

    def _get_subscribers(self) -> Tuple[List[str], List[int]]:
        user_content = self.soup.find(id='socialblade-user-content')
        dates = re.findall(r'\d\d\d\d-\d\d-\d\d', str(user_content))[2:-1]

        if self.platform == 'YouTube':
            table_divs = list(user_content.children)[4:61:2]

            table_divs_children = [list(div.children) for div in table_divs]
            subscribers = [
                self.count(re.search(r'\n[\d.]+[MK]*', div[5].text)[0][1:])
                for div in table_divs_children
            ]
        else:
            subscribers_to_clean = re.findall(r'>[\d,]+ +', str(user_content))
            subscribers = [
                int(''.join([ch for ch in subscriber if ch.isnumeric()]))
                for subscriber in subscribers_to_clean
            ][1:]

        return dates, subscribers

    @staticmethod
    def count(parsed_number: str) -> int:
        number = ''.join([
            char
            for char in parsed_number
            if char.isnumeric() or char == '.'
        ])

        multiple = [
            char
            for char in parsed_number
            if not (char.isnumeric() or char == '.')
        ]

        if not multiple:
            return int(number)
        elif multiple == ['M']:
            return int(round(1000000 * float(number), 4))
        elif multiple == ['K']:
            return int(round(1000 * float(number), 3))
        else:
            raise ValueError('Problem with parsing subscribers' +
                             f'number={number}, multiple={multiple}')
