from rest_framework import serializers
from forum.models import Question, Response
from account.models import Account


'''
SubmitQuestionSerializer serializes data sent from the client
to create a Question
'''


class SubmitQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['group_id', 'title', 'body', 'id']

    def create(self, validated_data):
        # Create reponse object and fill in its data fields with its appropriate values
        question = Question()
        creator_id = self.context['creator_id']
        question.author = Account.objects.get(email=creator_id)
        question.group_id = int(validated_data.get('group_id'))
        question.title = validated_data.get('title')
        question.body = validated_data.get('body')

        question.save()
        return question


'''
SubmitResponseSerializer serializes data sent from the client
to create a Response
'''


class SubmitResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = ['group_id', 'question_id', 'body']

    def create(self, validated_data):
        # Create reponse object and fill in its data fields with its appropriate values
        response = Response()
        creator_id = self.context['creator_id']
        response.author = Account.objects.get(email=creator_id)
        response.group_id = int(validated_data.get('group_id'))
        response.body = validated_data.get('body')

        question_id = self.context.get('question_id')
        response.question = Question.objects.get(pk=question_id)

        response.save()
        return response
