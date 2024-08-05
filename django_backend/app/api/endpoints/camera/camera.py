import requests
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from config.settings import API_ENDPOINT
import logging

logger = logging.getLogger(__name__)
API_ENDPOINT = API_ENDPOINT

@require_http_methods(["GET"])
def get_shared_cameras(request):
    token = request.headers.get('Authorization')
    print('😒token:',token)
    if not token or not token.startswith('PersonalAccessToken '):
        logger.warning('Invalid or missing token')
        return JsonResponse({'error': 'Invalid or missing token'}, status=401)

    headers = {
        'Authorization': token
    }

    try:
        response = requests.get(f"{API_ENDPOINT}/shared-cameras/", headers=headers)
        print('😒response😒',response)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        user_data = response.json()
        # Here you can handle the user data, save it to your database if necessary
        return JsonResponse(user_data, status=200)
    except requests.exceptions.HTTPError as http_err:
        logger.error(f'HTTP error occurred: {http_err}')
        if response.status_code == 401:
            return JsonResponse({'error': 'Invalid token'}, status=401)
        else:
            return JsonResponse({'error': 'Failed to fetch shared cameras'}, status=response.status_code)
    except requests.exceptions.RequestException as req_err:
        logger.error(f'Request error occurred: {req_err}')
        return JsonResponse({'error': 'Request error'}, status=500)

@require_http_methods(["GET"])
def get_camera_recordings(request, camera_id):
    token = request.headers.get('Authorization')
    print('😒token',token)
    if not token or not token.startswith('PersonalAccessToken '):
        return JsonResponse({'error': 'Invalid or missing token'}, status=401)
    headers = {
        'Authorization': token
    }

    try:
        response = requests.get(f"{API_ENDPOINT}/shared-cameras/{camera_id}/recording/", headers=headers)
        print('😒response cam rec',response)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        recordings = response.json()
        # Here you can handle the user data, save it to your database if necessary
        return JsonResponse(recordings, status=200)
    except requests.exceptions.HTTPError as http_err:
        logger.error(f'HTTP error occurred: {http_err}')
        return JsonResponse({'error': 'Invalid token'}, status=401)
    except requests.exceptions.RequestException as req_err:
        logger.error(f'Request error occurred: {req_err}')
        return JsonResponse({'error': 'Request error'}, status=500)