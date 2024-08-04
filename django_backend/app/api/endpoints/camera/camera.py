import requests
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from config.settings import API_ENDPOINT

API_ENDPOINT = API_ENDPOINT

@require_http_methods(["GET"])
def get_shared_cameras(request):
    token = request.headers.get('Authorization')
    if not token or not token.startswith('PersonalAccessToken '):
        return JsonResponse({'error': 'Invalid or missing token'}, status=401)

    headers = {
        'Authorization': token
    }

    response = requests.get(f"{API_ENDPOINT}/shared-cameras/", headers=headers)

    if response.status_code == 200:
        user_data = response.json()
        # Here you can handle the user data, save it to your database if necessary
        return JsonResponse(user_data, status=200)
    else:
        return JsonResponse({'error': 'Invalid token'}, status=401)

