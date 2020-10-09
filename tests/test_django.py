from django.test import Client
import json

client = Client()


def test_react_url() -> None:
    response = client.get('')
    assert response.status_code == 200
    assert 'React will load' in response.content.decode()


def test_existing_user() -> None:
    response = client.post(
        '/predict/', dict(platform='YouTube', username='pewdiepie'),
        content_type='application/json'
    )
    assert response.status_code == 200

    ajax_response = json.loads(response.content)
    assert ajax_response['username'] == 'PewDiePie'
    assert not ajax_response['insignificant']
    assert ajax_response['doesExist']
    assert ajax_response['predicted']


def test_non_existing_user() -> None:
    response = client.post(
        '/predict/', dict(platform='YouTube', username='akjsdklajsdlajswq'),
        content_type='application/json'
    )
    assert response.status_code == 200

    ajax_response = json.loads(response.content)
    assert not ajax_response.get('username')
    assert not ajax_response['doesExist']
    assert not ajax_response.get('predicted')


def test_insignificant_user() -> None:
    response = client.post(
        '/predict/', dict(platform='Twitter', username='dzionkers'),
        content_type='application/json'
    )
    assert response.status_code == 200

    ajax_response = json.loads(response.content)
    assert not ajax_response.get('username')
    assert ajax_response['insignificant']
    assert not ajax_response.get('predicted')


def test_details_not_given() -> None:
    response = client.post(
        '/predict/', dict(username='pewdiepie'),
        content_type='application/json'
    )
    assert response.status_code == 200

    ajax_response = json.loads(response.content)
    assert ajax_response['error']
