from django.urls import path
from api.endpoints import (
    say
)

# Paths ----------------------------------------------------------------------------------------------------------------
urlpatterns = [
    # Say
    path("say/hello", say.say_hello.say)
]
