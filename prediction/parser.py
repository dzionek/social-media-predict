from bs4 import BeautifulSoup
import re
from typing import Dict, List


class Parser:
    def __init__(self, html: str) -> None:
        self.html = html
        self.soup = self._get_soup()

    def _get_soup(self) -> BeautifulSoup:
        return BeautifulSoup(self.html, 'html.parser')

    def parse(self) -> Dict:
        return {
            'doesExist': True,
            'username': self._get_username(),
            'picture': self._get_picture(),
            'subscribers': self._get_subscribers()
        }

    def _get_username(self) -> str:
        top_info = self.soup.find(id='YouTubeUserTopInfoBlockTop')
        return top_info.find('h1').text

    def _get_picture(self) -> str:
        picture = self.soup.find(id='YouTubeUserTopInfoAvatar')
        return picture.attrs.get('src')

    def _get_subscribers(self) -> List[Dict[str, int]]:
        user_content = self.soup.find(id='socialblade-user-content')
        table_divs = list(user_content.children)[4:61:2]
        table_divs_children = [list(div.children) for div in table_divs]

        return [
            {
                re.search(r'(\d|-)+', div[1].text)[0]:
                self.count(re.search(r'\n[\d.]+[A-Z]*', div[5].text)[0][1:])
            }
            for div in table_divs_children
        ]

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
