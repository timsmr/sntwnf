from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Lobby, Guest
from .serializers import LobbySerializer, GuestSerializer

# Create your views here.


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
            'Endpoint': '/notes/id/',
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
            'Endpoint': '/lobby/id/guests/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of guests in a particular lobby'
        },
        {
            'Endpoint': '/lobby/id/shuffle/',
            'method': 'GET',
            'body': None,
            'description': 'Shuffles the guest list'
        },
    ]

    return Response(routes)


@api_view(['GET', 'POST'])
def get_lobbies(request):
    if request.method == 'GET':
        lobbies = Lobby.objects.all().order_by('-created')
        serializer = LobbySerializer(lobbies, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data
        lobby = Lobby.objects.create(
            name=data['lobby']['name'],
            event_date=data['lobby']['event_date']
        )
        lobby.save()
        lobby_serializer = LobbySerializer(lobby)
        
        guest = Guest.objects.create(
            name=data['guest']['name'],
            email=data['guest']['email'],
            preferences=data['guest']['preferences'],
            lobby=lobby,
            is_host=True
        )
        guest.save()
        return Response(lobby_serializer.data, status=status.HTTP_201_CREATED)
        


@api_view(['GET', 'POST'])
def get_guests(request):

    if request.method == 'GET':
        guests = Guest.objects.all()
        serializer = GuestSerializer(guests, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data
        lobby = Lobby.objects.get(code=data['lobby'])
        guest = Guest.objects.create(
            email=data['email'],
            name=data['name'],
            preferences=data['preferences'],
            lobby=lobby
        )
        guest.save()
        serializer = GuestSerializer(guest)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
       


@api_view(['GET', 'DELETE'])
def manage_lobby(request, pk):
    if request.method == 'GET':
        lobby = Lobby.objects.get(code=pk)
        serializer = LobbySerializer(lobby)
        return Response(serializer.data)

    if request.method == 'DELETE':
        lobby = Lobby.objects.get(code=pk)
        lobby.delete()
        return Response('Lobby was deleted!')


@api_view(['GET', 'DELETE'])
def manage_guest(request, pk):
    if request.method == 'GET':
        guest = Guest.objects.get(id=pk)
        serializer = GuestSerializer(guest)
        return Response(serializer.data)

    if request.method == 'DELETE':
        guest = Guest.objects.get(id=pk)
        guest.delete()
        return Response('Guest was deleted!')


@api_view(['GET'])
def get_guests_lobby(request, pk):
    guests = Guest.objects.filter(lobby=pk).order_by('id')
    serializer = GuestSerializer(guests, many=True)
    return Response(serializer.data)



@api_view(['GET'])
def shuffle_lobby(request, pk):
    guests = Guest.objects.filter(lobby=pk).order_by('?')
    serializer = GuestSerializer(guests, many=True)
    return Response(serializer.data)
