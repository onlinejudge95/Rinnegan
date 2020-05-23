#!/bin/sh

DIR="/var/log/gunicorn"

if [ ! -d "$DIR" ]; then
    echo "Info: ${DIR} does not exists. Creating\n"
    mkdir -p ${DIR}
else
    echo "${DIR} exists\n"
fi

if [ $FLASK_ENV == "production" ]; then
    flask db upgrade
fi

gunicorn --config /usr/src/app/gunicorn.conf.py manage:app && \
sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && \
nginx -g 'daemon off;'
