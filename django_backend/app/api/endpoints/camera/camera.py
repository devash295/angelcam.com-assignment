import requests
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from config.settings import API_ENDPOINT
import logging

logger = logging.getLogger(__name__)
API_ENDPOINT = API_ENDPOINT

def make_response(data, status=200):
    response = JsonResponse(data, status=status)
    response['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response['Access-Control-Allow-Credentials'] = 'true'
    return response

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
        return make_response(user_data, status=200)
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
def get_camera_streams(request, camera_id):
    token = request.headers.get('Authorization')
    print('😒token:',token)
    if not token or not token.startswith('PersonalAccessToken '):
        logger.warning('Invalid or missing token')
        return JsonResponse({'error': 'Invalid or missing token'}, status=401)

    headers = {
        'Authorization': token
    }

    try:
        print('😒camera_id:',camera_id)
        response = requests.get(f"{API_ENDPOINT}/shared-cameras/{camera_id}", headers=headers)
        print('😒response😒',response)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        user_data = response.json()
        return make_response(user_data, status=200)
    except requests.exceptions.HTTPError as http_err:
        logger.error(f'HTTP error occurred: {http_err}')
        return JsonResponse({'error': 'Invalid token'}, status=401)

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
        return make_response(recordings, status=200)
    except requests.exceptions.HTTPError as http_err:
        logger.error(f'HTTP error occurred: {http_err}')
        return JsonResponse({'error': 'No Recordings Found'}, status=401)
    except requests.exceptions.RequestException as req_err:
        logger.error(f'Request error occurred: {req_err}')
        return JsonResponse({'error': 'Request error'}, status=500)
    
@require_http_methods(["GET"])
def get_camera_live_stream(request, camera_id):
    token = request.headers.get('Authorization')
    if not token or not token.startswith('PersonalAccessToken '):
        return JsonResponse({'error': 'Invalid or missing token'}, status=401)
    headers = {
        'Authorization': token
    }

    try:
        response = requests.get(f"{API_ENDPOINT}/shared-cameras/{camera_id}/recording/stream/", headers=headers)
        response.raise_for_status()
        stream = response.json()
        return make_response(stream, status=200)
    except requests.exceptions.HTTPError as http_err:
        logger.error(f'HTTP error occurred: {http_err}')
        return JsonResponse({'error': 'Failed to fetch live stream'}, status=response.status_code)
    except requests.exceptions.RequestException as req_err:
        logger.error(f'Request error occurred: {req_err}')
        return JsonResponse({'error': 'Request error'}, status=500)

@require_http_methods(["GET"])
def get_camera_recording_stream(request, camera_id):
    token = request.headers.get('Authorization')
    if not token or not token.startswith('PersonalAccessToken '):
        return JsonResponse({'error': 'Invalid or missing token'}, status=401)

    headers = {
        'Authorization': token
    }

    start = request.GET.get('start')  # Get the 'start' parameter from the request
    print('😒start:',start)
    try:
        response = requests.get(f"{API_ENDPOINT}/shared-cameras/{camera_id}/recording/stream/", headers=headers, params={'start': start})
        response.raise_for_status()
        segments = response.json()
        return make_response(segments, status=200)
    except requests.exceptions.HTTPError as http_err:
        logger.error(f'HTTP error occurred: {http_err}')
        return JsonResponse({'error': 'Failed to fetch recording segments'}, status=response.status_code)
    except requests.exceptions.RequestException as req_err:
        logger.error(f'Request error occurred: {req_err}')
        return JsonResponse({'error': 'Request error'}, status=500)

@require_http_methods(["POST"])
def play_recorded_stream(request):
    token = request.headers.get('Authorization')
    if not token or not token.startswith('PersonalAccessToken '):
        return JsonResponse({'error': 'Invalid or missing token'}, status=401)
    playUrl = request.POST.get('playUrl')
    headers = {
        'Authorization': token
    }
    try:
        response = requests.post(f"{playUrl}", headers=headers)
        response.raise_for_status()
        return make_response(status=200)
    except requests.exceptions.HTTPError as http_err:
        return JsonResponse({'error': 'Failed to play recording'}, status=500)
    

@require_http_methods(["POST"])
def pause_recorded_stream(request):
    token = request.headers.get('Authorization')
    if not token or not token.startswith('PersonalAccessToken '):
        return JsonResponse({'error': 'Invalid or missing token'}, status=401)
    pauseUrl = request.POST.get('pauseUrl')
    headers = {
        'Authorization': token
    }
    try:
        response = requests.post(f"{pauseUrl}", headers=headers)
        response.raise_for_status()
        return make_response(status=200)
    except requests.exceptions.HTTPError as http_err:
        return JsonResponse({'error': 'Failed to play recording'}, status=500)
    
@require_http_methods(["POST"])
def speed_recorded_stream(request):
    token = request.headers.get('Authorization')
    if not token or not token.startswith('PersonalAccessToken '):
        return JsonResponse({'error': 'Invalid or missing token'}, status=401)
    speedUrl = request.POST.get('speedUrl')
    speed = request.POST.get('speed')
    headers = {
        'Authorization': token
    }
    try:
        response = requests.post(f"{speedUrl}", headers=headers, params={'speed': speed})
        print('😒response:',response)
        response.raise_for_status()
        return JsonResponse(status=200)
    except requests.exceptions.HTTPError as http_err:
        return JsonResponse({'error': 'Failed to play recording'}, status=500)