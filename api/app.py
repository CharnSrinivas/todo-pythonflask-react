from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
######################  (CORS) => Cross Origin Resources Shraing      ############################

                        # It need to be enable to allow other web app to access api
CORS(app)

##################################################################################################

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Database/todo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

##################################################

            #   This import need to be here
from controller.TodoApi import todoApi

##################################################
app.register_blueprint(todoApi,url_prefix='/api')

db.create_all()






# from flask import Flask
# from flask_sqlalchemy import SQLAlchemy
# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Database/todo.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# db = SQLAlchemy(app)
# from  models.TodoModel import User,Task
# db.create_all()