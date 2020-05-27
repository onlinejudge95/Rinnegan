import jwt


class User(dict):
    def __init__(self, *args, **kwargs):
        super(User, self).__init__(*args, **kwargs)
        self.__dict__ = self


class Token(dict):
    def __init__(self, *args, **kwargs):
        super(Token, self).__init__(*args, **kwargs)
        self.__dict__ = self


def get_user_id_by_token(token):
    return 1


def get_invalid_user_id_by_token(token):
    return 2


def get_expired_token_exception(token):
    raise jwt.ExpiredSignatureError()


def get_invalid_token_exception(token):
    raise jwt.InvalidTokenError()


def get_no_user_by_email(email):
    return None


def get_user_by_email(email):
    return True


def get_user_object_by_email(email):
    user = User()
    user.update(
        {
            "id": 1,
            "username": "test_user",
            "email": "test_user@mail.com",
            "password": "test_password",
        }
    )
    return user


def add_user(username, email, password):
    user = User()
    user.update(
        {
            "id": 1,
            "username": "test_user",
            "email": "test_user@mail.com",
            "password": "test_password",
        }
    )
    return user


def get_all_users():
    return [
        {
            "id": 1,
            "username": "test_user_one",
            "email": "test_user_one@mail.com",
        },
        {
            "id": 2,
            "username": "test_user_two",
            "email": "test_user_two@mail.com",
        },
    ]


def get_user_by_id(user_id):
    return {
        "id": 1,
        "username": "test_user",
        "email": "test_user@mail.com",
    }


def get_no_user_by_id(user_id):
    return None


def remove_user(user):
    return True


def update_user(user, username, email):
    mock_user = User()
    mock_user.update({"id": 1, "username": username, "email": email})
    return mock_user


def add_token(user_id):
    token = Token()
    token.update(
        {"access_token": "access_token", "refresh_token": "refresh_token"}
    )
    return token


def update_token(token, user_id):
    mock_token = Token()
    mock_token.update(
        {
            "refresh_token": "refresh_token_updated",
            "access_token": "access_token_updated",
        }
    )
    return mock_token
