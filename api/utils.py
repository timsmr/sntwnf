from rest_framework.response import Response 
from .models import Lobby, Guest 
from .serializers import LobbySerializer, GuestSerializer



def get_lobbies(request):
    lobbies = Lobby.objects.all().order_by('-created')
    serializer = LobbySerializer(lobbies, many=True)
    return Response(serializer.data)

def get_guests(request):
    guests = Guest.objects.all()
    serializer = GuestSerializer(guests, many=True)
    return Response(serializer.data)

def get_lobby(request, pk):
    lobby = Lobby.objects.get(code=pk)
    serializer = LobbySerializer(lobby)
    return Response(serializer.data)

def get_guest(request, pk):
    guest = Guest.objects.get(id=pk)
    serializer = GuestSerializer(guest)
    return Response(serializer.data)

def create_lobby(request):
    data = request.data
    lobby = Lobby.objects.create()
    lobby.name = data['lobby_name']
    lobby.event_date = data['event_name']
    lobby.save()
    host = Guest.object.create()
    host.name = data['guest_name']
    if 'preferences' in data:
        host.preferences = data['preferences']
    host.lobby = lobby
    host.save()
    return Response('Lobby was created!')

def create_guest(request):
    data = request.data 
    lobby = Lobby.objects.get(code=data['lobby'])
    guest = Guest.objects.create()
    guest.email = data['email']
    guest.name = data['name']
    if 'preferences' in data:
        guest.preferences = data['preferences']
    guest.lobby = lobby 
    return Response('Guest was created!')

def delete_lobby(request, pk):
    lobby = Lobby.objects.get(code=pk)
    lobby.delete()
    return Response('Lobby was deleted!')

def delete_guest(request, pk):
    guest = Guest.objects.get(id=pk)
    guest.delete()
    return Response('Guest was deleted!')
