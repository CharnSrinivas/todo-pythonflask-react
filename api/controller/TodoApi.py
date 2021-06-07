from flask import blueprints,jsonify,request
from flask.wrappers import Response
from  models.TodoModel import User,Task

from app import db
todoApi = blueprints.Blueprint('todoApi',__name__)

#___________________________________________________________   CURD  BLOCK     ___________________________________________________________



@todoApi.route('/todo/<userId>',methods=['GET'])
def getUserData(userId):
    try:
        usr = User.query.get(str(userId))
        ####### Return data if user exits
        if (usr!=None):
            data = usr.getUserData()
            return jsonify(data)
        else:
            print('---------------------------------      '+'No such user '+'----------------------------')
            return Response(status=500),"No such user"
    except Exception as excep:
            print('-------------------------- GET  Error    --------------------------------')
            print(excep)
            print('-------------------------------------------------------------------------------')
            return Response(status=404)        





@todoApi.route('/todo/<userId>',methods=['POST'])
def addTodo(userId):
    if(request.method=="POST"):
        data =request.get_json(force=True)
        print('++++++++++++++++++++++++++++   POST     +++++++++++++++++++++++++')
        print(data)
        print('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++')
        if data:
            try:
                usr = User.query.get(str(userId))
                task = Task(title=data['title'],userId=usr.id,id=data['id'],isCompleted=data['isCompleted'])
                db.session.add(task)
                db.session.commit()

            except Exception as excep:
                print('-------------------------- Post  Error    --------------------------------')
                print(excep)
                print('-------------------------------------------------------------------------------')
                if(excep.args[0] == '(sqlite3.IntegrityError) UNIQUE constraint failed: task.title'):
                    return Response(status=500),"User name '"+str(data['userName'])+"' already exists"
        
        return Response(status=200),"Added "+str(task.title)+"' to list"





@todoApi.route('/todo/<userId>/<taskId>',methods=['DELETE'])
def deleteTodo(userId,taskId):
        
    if(request.method=='DELETE'):
        try:
            #  Cheking if user and tasks exits
            usr = User.query.get(str(userId))
            if(usr.tasks):
                    task = Task.query.get(str(taskId))
                    title = task.title
                    db.session.delete(task)
                    db.session.commit()
                    print('============================= DELETE    =============================')
                    return Response(status=200),"Task '"+str(title)+"' deleted"
        except Exception as excep:
                print('============================= Delete  Error    =============================')
                print(excep)
                print('=======================================================================================')
                return Response(status=500),"Unable to remove task '"+str(title)+"'"
            



        
@todoApi.route('/todo/<userId>/<taskId>',methods=['PUT'])
def updateTodo(userId,taskId):
    if(request.method=='PUT'):
        try:
            #  Cheking if user and tasks exits
            usr = User.query.get(str(userId))
            if(usr!=None and usr.tasks):
                    task = Task.query.get(str(taskId))
                    task.isCompleted = not task.isCompleted
                    db.session.commit()
                    print('*********************************   PUT    *********************************')
                    return Response(status=200)
        except Exception as excep:
                print('-------------------------- Delete  Error    --------------------------------')
                print(excep)
                print('-------------------------------------------------------------------------------')
                return Response(status=500)
#_________________________________________________________________________________________________________________________________________________________________________________



#_________________________________________________________________     AUTHENTICATON BLOCK    _________________________________________________________________


@todoApi.route('/auth/login',methods=['POST'])
def login_verification():
    
    if request.method=='POST':
        try:
            data = request.get_json(force=True)
            user = User.query.filter_by(userName=data['userName']).first()
            if(user!=None):
                password = data['password']
                print('password:',password==user.password)
                print('userName :',user.userName==data['userName'])
                if password==user.password and user.userName==data['userName']:
                    print("logged in")
                else:
                    return Response(status=500),"Wrong Password"
            else:
                return Response(status=500) , "Invalid User name"
        except Exception as excep:
            print(excep)
            return Response(status=500) ,"Opps! Something Wrong"
    return jsonify({"id":str(user.id),"userName":user.userName}),"Logged in as '"+str(user.userName)+"'"





@todoApi.route('/auth/signin',methods=["POST"])
def signin():
    if request.method=='POST':
        try:
            data = request.get_json(force=True)
            newUser = User(id=data['id'],userName=data['userName'],password=data['password'])
            db.session.add(newUser)
            db.session.commit()
            print('\n',data,'\n')
        except Exception as excep:
            print(excep)
            return Response(status=500) ,"Opps! Something Wrong"
        
    return Response(status=200),"Signin as '"+str(newUser.userName)+"'"



#_________________________________________________________________________________________________________________________________________________________________________________
