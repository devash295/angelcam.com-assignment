# middleware.py
import logging

logger = logging.getLogger(__name__)

class RequestLoggingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        logger.info(f"Status: {response.status_code}, Method: {request.method}, Path: {request.path}, Response: {response.content}")
        return response
