from flask_restx import Api
from app.api.health import health_namespace
from app.api.users.views import users_namespace

api = Api(version="1.0", title="Sentimental API", doc="/swagger/")

api.add_namespace(health_namespace, path="/health")
api.add_namespace(users_namespace, path="/users")
