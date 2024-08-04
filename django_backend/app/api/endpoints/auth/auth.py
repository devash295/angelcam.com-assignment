import requests
from django.http import JsonResponse
from config.settings import API_ENDPOINT
import json


API_ENDPOINT = API_ENDPOINT

def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        token = data.get('token')

        headers = {
            'Authorization': f'PersonalAccessToken {token}'
        }

        response = requests.get(f"{API_ENDPOINT}/me/", headers=headers)

        if response.status_code == 200:
            user_data = response.json()
            # can handle the user data, save it to your database if necessary
            return JsonResponse(user_data, status=200)
        else:
            return JsonResponse({'error': 'Invalid token'}, status=401)
    return JsonResponse({'error': 'Invalid request method'}, status=400)
