from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .utils import *

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
                'lobby_name': "",
                'event_date': '',
                'guest_name': '',
                'email': '',
                'preferences': ''
                },
            'description': 'Creates new lobby and new user (AKA host/admin) with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
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
            'Endpoint': '/guest/id/delete/',
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


@api_view(['GET'])
def get_lobbies_data(request):
    return get_lobbies(request)


@api_view(['GET'])
def get_guests_data(request):
    return get_guests(request)


@api_view(['GET', 'POST', 'DELETE'])
def manage_lobby(request, pk):
    if request.method == 'GET':
        return get_lobby(request, pk)

    if request.method == 'POST':
        return create_lobby(request)

    if request.method == 'DELETE':
        return delete_lobby(request, pk)


@api_view(['GET', 'POST', 'DELETE'])
def manage_guest(request, pk):
    if request.method == 'GET':
        return get_guest(request, pk) 
    
    if request.method == 'POST':
        return create_guest(request) 

    if request.method == 'DELETE':
        return delete_guest(request, pk)


@api_view(['GET'])
def get_guests_lobby(request, pk):
    return lobby_guests(request, pk)


@api_view(['GET'])
def shuffle_lobby(request, pk):
    return shuffle(request, pk)
