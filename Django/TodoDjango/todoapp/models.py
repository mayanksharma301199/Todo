from django.db import models

class Users(models.Model):

    def __str__(self):
        return self.user_name

    user_name = models.CharField(max_length = 225)
    user_email = models.EmailField(max_length = 225)
    user_password = models.CharField(max_length = 225)

class UserTodos(models.Model):

    def __int__(self):
        return self.user_id
    
    user_id = models.IntegerField()
    todo_content = models.CharField(max_length = 500)
    todo_status = models.BooleanField()