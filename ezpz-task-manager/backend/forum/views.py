from .serializers import SubmitQuestionSerializer, SubmitResponseSerializer
from forum.models import Question, Response
from forum.models import Response as QuestionResponse
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from account.models import Account


def getUserIdFromSessionKey(request):
    return Account.objects.get(email=request.data['user_id'])


'''
SubmitQuestion is the content sent back when a client posts a question
'''


class SubmitQuestion(generics.GenericAPIView):
    serializer_class = SubmitQuestionSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, **kwargs):
        # Find who the creator of the question is
        creator_id = getUserIdFromSessionKey(request)

        # Serialize the data fields
        serializer = SubmitQuestionSerializer(
            data=request.data, context={'creator_id': creator_id})

        # Check all key value pairs are valid
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
SubmitResponse is the content sent back when a client posts a question
'''


class SubmitResponse(generics.GenericAPIView):
    serializer_class = SubmitResponseSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, **kwargs):
        # Find who the creator of the response is
        creator_id = getUserIdFromSessionKey(request)

        # Find which question the response belongs to
        question_id = request.data['question_id']

        # Serialize the data fields
        serializer = SubmitResponseSerializer(data=request.data, context={
                                              'creator_id': creator_id, 'question_id': question_id})

        # Check all key value pairs are valid
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


'''
SubmitResponse is the content sent back when a client requests all the posts
'''


class GetPosts(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Question.objects.all()

    def get(self, request, group_id):
        data = []
        # Get all the questions that belong to 'group_id'
        questions = sorted([i for i in Question.objects.all()
                           if i.group_id == group_id], key=lambda x: x.id)

        for question in questions:
            # Population question_info with the right key:value
            question_info = {
                'question_id': question.id,
                'question_title': question.title,
                'question_body': question.body,
                'author_id': question.author.id,
                'author_name': question.author.first_name + ' ' + question.author.last_name,
                'author_email': question.author.email,
                'time_posted': question.created_at,
                'answers': []
            }

            # Get all responses that belong to current question being looped and 'group_id'
            responses = sorted([i for i in QuestionResponse.objects.all().filter(
                question=question) if i.group_id == group_id], key=lambda x: x.id)

            for response in responses:
                # Populatie the response
                response_info = {
                    'answer_id': response.id,
                    'time_posted': response.created_at,
                    'author_id': response.author.id,
                    'author_name': response.author.first_name + ' ' + response.author.last_name,
                    'author_email': response.author.email,
                    'answer': response.body,
                }
                # Add all responses to the question
                question_info['answers'].append(response_info)

            # Add question to the list of questions that will be retunred
            data.append(question_info)

        return Response(data, status=status.HTTP_200_OK)
