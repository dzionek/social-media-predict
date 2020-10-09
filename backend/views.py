from django.http import JsonResponse, HttpRequest
from django.views.decorators.http import require_http_methods

from prediction.main import Prediction


@require_http_methods(['POST'])
def predict(request: HttpRequest) -> JsonResponse:
    data = eval(request.body.decode())
    platform = data.get('platform')
    username = data.get('username')

    if not (platform and username):
        return JsonResponse({'error': '404'}, safe=True)

    prediction = Prediction(username, platform)

    if not prediction.does_exist():
        return JsonResponse({'doesExist': False}, safe=True)

    parsed_response = prediction.get_parsed()

    if parsed_response['insignificant']:
        return JsonResponse(parsed_response, safe=True)

    prediction_response = prediction.get_prediction()
    response = {**parsed_response, **prediction_response}

    return JsonResponse(response, safe=True)
