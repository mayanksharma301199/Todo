from django.shortcuts import render
from django.http import HttpResponse
from .models import Users, UserTodos
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
import json
import time
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_decode_handler = api_settings.JWT_DECODE_HANDLER

# @ensure_csrf_cookie
@csrf_exempt
def LogIn(request):
    if(request.method == "POST"):
        contentObject= json.loads(request.body.decode('utf8'))
        email = contentObject["email"]
        password = contentObject["password"]
        allUsers = Users.objects.all()
        flag = 0
        for user in allUsers:
            if((user.user_email) == (email) and (user.user_password) == (password)):
                flag = 1
                break
        if flag == 1:
                currentUser = Users.objects.get(user_email = email, user_password = password)

                id = str(currentUser.id)

                currentUser.username = email

                payload = jwt_payload_handler(currentUser)

                token = jwt_encode_handler(payload)

                # ResponsedData = {"token" : token}

                Response = json.dumps(token)

                return HttpResponse(Response)  
        else:
            return HttpResponse(json.dumps("False"))
@csrf_exempt
def SignUp(request):
    if(request.method == "POST"):
        contentObject= json.loads(request.body.decode('utf8'))
        name = contentObject["name"]
        email = contentObject["email"]
        password = contentObject["password"]
        allUsers = Users.objects.all()
        flag = 0
        for user in allUsers:
            if((user.user_email) == (email) and (user.user_password) == (password)):
                flag = 1
                break
        if flag == 1:
            return HttpResponse(json.dumps("User already exists"))
        else:
            newUser = Users(user_name=name, user_email=email, user_password=password)
            newUser.save()
            return HttpResponse(json.dumps("User succesfully created"))

@csrf_exempt
def Dashboard(request):
    if(request.method == "POST"):
        contentObject = json.loads(request.body.decode('utf8'))
        decodedToken = ""
        print(contentObject)
        try:
            decodedToken = JwtTokenDecode((contentObject["headers"])["Authorization"])    
        except:
            responseData = {"componentName": "LogIn"}
            return HttpResponse(json.dumps(responseData))

        if ("Reference" in contentObject["headers"].keys()):
            if (contentObject["headers"]["Reference"] == "newTodo"):
                newTodo = UserTodos(user_id= decodedToken["user_id"], todo_content= contentObject["headers"]["Value"], todo_status = 0)
                newTodo.save()
                currentTodo = {"todoId":newTodo.id, "todoContent": newTodo.todo_content, "todoStatus": newTodo.todo_status}
                return HttpResponse(json.dumps(currentTodo))
            elif (contentObject["headers"]["Reference"] == "deleteTodo"):
                deleteTodo = UserTodos.objects.get(pk=int(contentObject["headers"]["Value"]),user_id= decodedToken["user_id"])
                deletedTodo = {"todoId":deleteTodo.id}
                deleteTodo.delete()
                return HttpResponse(json.dumps(deletedTodo))
            elif (contentObject["headers"]["Reference"] == "editTodo"):
                editTodo = UserTodos.objects.get(pk=int(contentObject["headers"]["Value"]),user_id= decodedToken["user_id"])
                editTodo.todo_content = contentObject["headers"]["todoContent"]
                editTodo.save()
                editedTodo = {"todoId":editTodo.id, "todoContent":editTodo.todo_content}
                return HttpResponse(json.dumps(editedTodo))
            elif (contentObject["headers"]["Reference"] == "checkTodo"):
                checkTodo = UserTodos.objects.get(pk=int(contentObject["headers"]["Value"]),user_id= decodedToken["user_id"])
                checkTodo.todo_status = contentObject["headers"]["todoStatus"]
                checkTodo.save()
                checkedTodo = {"todoId":checkTodo.id, "todoStatus":checkTodo.todo_status}
                return HttpResponse(json.dumps(checkedTodo))
        else:
            currentUserTodos = []
            responseData = {}    
            allTodos = {}
            try:      
                currentUserTodos = UserTodos.objects.all()      
                for singleTodo in currentUserTodos:
                    if singleTodo.user_id == decodedToken["user_id"]:
                        allTodos[str(singleTodo.id)] = {"todoId":singleTodo.id, "todoContent": singleTodo.todo_content, "todoStatus": singleTodo.todo_status}                           
                responseData = {"componentName": "UserTodo", "todos": allTodos}
                return HttpResponse(json.dumps(responseData))
            except:
                return HttpResponse(json.dumps(responseData))
        
def JwtTokenDecode(CurrentUserToken):
    RealToken = CurrentUserToken.split(" ")
    IsExpire = round(time.time())
    DecodedToken = jwt_decode_handler(RealToken[1])
    TokenExpiryTime = DecodedToken["exp"]
    return DecodedToken