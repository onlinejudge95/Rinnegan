import os


def test_admin_view_passes(test_app, test_database):
    client = test_app.test_client()

    response = client.get("/admin/user/")

    assert response.status_code == 200


def test_admin_view_fails(test_admin_app, test_database):
    client = test_admin_app.test_client()

    os.environ["FLASK_ENV"] = "production"
    response = client.get("/admin/user/")

    assert response.status_code == 404
