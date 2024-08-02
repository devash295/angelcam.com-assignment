from rest_framework.decorators import api_view
from rest_framework.response import Response
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
def say(req):
    """
    API Root Endpoint
    """
    logger.info("API Root Endpoint")

    return Response({
        'message': 'Welcome to my API',
    })
