from django.http import JsonResponse, HttpRequest

from prediction.main import Prediction

def predict(request: HttpRequest) -> JsonResponse:
    data = eval(request.body.decode())
    platform = data.get('platform')
    username = data.get('username')

    if not (platform and username):
        return JsonResponse({'error': '404'}, safe=True)

    prediction = Prediction(username, platform)

    if not prediction.does_exist():
        return JsonResponse({'doesExist': False}, safe=True)

    response = prediction.get_parsed()

    return JsonResponse(response, safe=True)
