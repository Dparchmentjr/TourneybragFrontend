from django.http import HttpResponse
from tourneyBrag.models import *
from rest_framework import generics, status, mixins
from rest_framework.response import Response
from rest_framework.views import APIView
import uuid
import random
from tourneyBrag.serializers import *

def index(request):
	return HttpResponse("Hello world and all those who inhabit it!")

class PlayerDetails(mixins.RetrieveModelMixin,
					mixins.UpdateModelMixin,
					mixins.DestroyModelMixin,
					generics.GenericAPIView):
	queryset = Player.objects.all()
	serializer_class = PlayerSerializer


	def get(self, request, *args, **kwargs):
		return self.retrieve(request, *args, **kwargs)


	def put(self, request, *args, **kwargs):
		return self.update(request, *args, **kwargs)


	#def delete(self, request, *args, **kwargs):
	#	return self.destroy(request, *args, **kwargs)

#Lists all players
class PlayerList(mixins.ListModelMixin,
				 mixins.CreateModelMixin,
				 generics.GenericAPIView):
	queryset = Player.objects.all()
	serializer_class = PlayerSerializer

	def get(self, request, *args, **kwargs):
		return self.list(request, *args, **kwargs)

	def post(self, request, *args, **kwargs):
		num = random.randint(0, 2147483647)
		while Player.objects.filter(playerID=num):
					num = random.randint(0, 2147483647)
		request.data['playerID'] = num
		return self.create(request, *args, **kwargs)

#	def get(self, request):
		#players = Player.objects.all()
		#serializer = PlayerSerializer(players, many=True)
		#return Response(serializer.data)

	#def post(self, request):
#		num = random.randint(0, 2147483647)
		#while Player.objects.filter(Player__playerID=num):
#			num = random.randint(0, 2147483647)
		#serializer = PlayerSerializer(data=request.data)
		#serializer.data['playerID'] = num
		#if serializer.is_valid():
#			serializer.save()
			#return Response(serializer.data, status=status.HTTP_201_CREATED)
		#newPlayer = Player(num, request.Post['playerName'], request.Post['password'], request.Post['gamePlayed'], request.Post['mainCharacter'])
		#newPlayer.save()
		#return Response("New player has been added!")


class OrganizerDetails(mixins.RetrieveModelMixin,
					mixins.UpdateModelMixin,
					mixins.DestroyModelMixin,
					generics.GenericAPIView):
	queryset = Organizer.objects.all()
	serializer_class = OrganizerSerializer


	def get(self, request, *args, **kwargs):
		return self.retrieve(request, *args, **kwargs)


	def put(self, request, *args, **kwargs):
		return self.update(request, *args, **kwargs)


	#def delete(self, request, *args, **kwargs):
	#	return self.destroy(request, *args, **kwargs)

#Lists all organizerss
class OrganizerList(mixins.ListModelMixin,
				 mixins.CreateModelMixin,
				 generics.GenericAPIView):
	queryset = Organizer.objects.all()
	serializer_class = OrganizerSerializer

	def get(self, request, *args, **kwargs):
		return self.list(request, *args, **kwargs)

	def post(self, request, *args, **kwargs):
		num = random.randint(0, 2147483647)
		while Player.objects.filter(playerID=num):
					num = random.randint(0, 2147483647)
		request.data['playerID'] = num
		return self.create(request, *args, **kwargs)


#Lists all tournamnts
class TournamentsList(mixins.ListModelMixin,
				 mixins.CreateModelMixin,
				 generics.GenericAPIView):
	queryset = Tournament.objects.all()
	serializer_class = TournamentSerializer

	def get(self, request, *args, **kwargs):
		return self.list(request, *args, **kwargs)

	def post(self, request, *args, **kwargs):
		return self.create(request, *args, **kwargs)

#Lists all tournamnts for a specific organizer
class TournamentsSpecificList(mixins.ListModelMixin,
				 mixins.CreateModelMixin,
				 generics.GenericAPIView):
	queryset = Tournament.objects.all()
	serializer_class = TournamentSerializer

	def get(self, request, *args, **kwargs):
		organizr = request.data('organizerOwner')
		queryset = Tournament.objects.all()#filter(organizerOwner = organizr)
		allSet = TournamentSerializer(queryset, many=True)
		print(allSet)
		return Response(allSet.data)

	def post(self, request, *args, **kwargs):
		num = random.randint(0, 2147483647)
		while Player.objects.filter(playerID=num):
					num = random.randint(0, 2147483647)
		request.data['playerID'] = num
		return self.create(request, *args, **kwargs)
