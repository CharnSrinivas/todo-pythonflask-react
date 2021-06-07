from flask import json
from app import db

class Task(db.Model):
    id = db.Column(db.String(20) ,primary_key=True,unique=True)
    title = db.Column(db.String(40),nullable=False)
    isCompleted = db.Column(db.Boolean,default=False)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
   
        
class User(db.Model):
    id = db.Column(db.String(20),primary_key=True )
    userName = db.Column(db.String(25),unique=True, nullable=False )
    password = db.Column(db.String(25), nullable=False )
    tasks = db.relationship('Task', backref='user', lazy=True)

    def getUserData(self):
        tasks = []
        for task in self.tasks:
            tasks.append({
                "id":task.id,
                "title":task.title,
                "isCompleted":task.isCompleted
            })
        data = {
            "id" :(self.id),
            "userName":(self.userName),
            "tasks":tasks
        }
        return data