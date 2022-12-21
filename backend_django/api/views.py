from functools import partial
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import Lobby, Guest
from .serializers import LobbySerializer, GuestSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.conf import settings

# Create your views here.


class LobbyList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Lobby.objects.all()
    serializer_class = LobbySerializer


class LobbyDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Lobby.objects.all()
    serializer_class = LobbySerializer


class LobbyGuests(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        guests = Guest.objects.filter(lobby=pk).order_by('id')
        serializer = GuestSerializer(guests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # def post(self, request, pk):
    #     data = request.data
    #     guest = Guest.objects.create(
    #         lobby=Lobby.objects.get(pk=pk),
    #         user=settings.AUTH_USER_MODEL.objects.get(pk=data['user_id']),
    #         is_host=data['is_host']
    #     )
    #     # Create an article from the above data
    #     serializer = GuestSerializer(guest)
    #     if serializer.is_valid(raise_exception=True):
    #         guest_saved = serializer.save()
    #     return Response(guest_saved)


class GuestList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer


class GuestDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer


@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/lobby/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of lobbies'
        },
        {
            'Endpoint': '/lobby/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single lobby object'
        },
        {
            'Endpoint': '/lobby/',
            'method': 'POST',
            'body': {
                'lobby': {
                    'name': "",
                    'event_date': ""
                },
                'guest': {
                    'name': "",
                    'email': "",
                    'preferences': ""
                }
            },
            'description': 'Creates new lobby and new user (AKA host/admin) with data sent in post request'
        },
        {
            'Endpoint': '/lobby/id/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting lobby and all guests'
        },
        {
            'Endpoint': '/guest/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of guests'
        },
        {
            'Endpoint': '/guest/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single guest object'
        },
        {
            'Endpoint': '/guest/',
            'method': 'POST',
            'body': {
                'email': "",
                'name': "",
                'preferences': "",
                'lobby': "",
            },
            'description': 'Creates new guest with data sent in post request'
        },
        {
            'Endpoint': '/guest/id/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting guest from the lobby'
        },
        {
            'Endpoint': '/lobby/id/guest/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of guests in a particular lobby'
        },
        {
            'Endpoint': '/lobby/id/shuffle/',
            'method': 'GET',
            'body': None,
            'description': 'Shuffles the guest list and updates Lobby and Guests giving_to field'
        },
        {
            'Endpoint': '/lobby/id/?email="..."',
            'method': 'GET',
            'body': None,
            'description': 'Shuffles the guest list and updates Lobby and Guests giving_to field'
        },
    ]

    return Response(routes)


class Shuffle_lobby(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        guests = Guest.objects.filter(lobby=pk).order_by('?')
        lobby = Lobby.objects.get(code=pk)
        lobby.started = True
        lobby.save()
        for i, guest in enumerate(guests):
            guest.giving_to = guests[(i + 1) % len(guests)]
            guest.save()
        # serializer = GuestSerializer(guests, many=True)

        return Response('guests are successfully shuffled!')
