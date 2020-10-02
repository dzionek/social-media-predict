from django.test import Client


def test_react_url() -> None:
    client = Client()
    response = client.get('')
    assert response.status_code == 200
    assert 'React will load' in response.content.decode()
