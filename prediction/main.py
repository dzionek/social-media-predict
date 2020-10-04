import requests
from typing import Dict

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

    def _get_link(self) -> str:
        if self.platform == 'YouTube':
            return f'https://socialblade.com/youtube/user/{self.username}/monthly'
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
        parser = Parser(self.content)
        return parser.parse()
