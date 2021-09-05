#! /bin/sh
BASEDIR=$(dirname "$0")
ROOTDIR="$(PWD)"
FULLDIR="$(PWD)/${BASEDIR}"

cd ${FULLDIR}

mkdir -p ${FULLDIR}/docker-entrypoint-initdb.d

docker stop dishfu-db-container && docker rm dishfu-db-container  && docker image rm dishfu-db-image && docker image prune -f

docker image build --file ${FULLDIR}/DockerfileDB -t dishfu-db-image .

docker stop dishfu-db-container && docker rm dishfu-db-container 

cat {ROOTDIR}/config/database/develop/auth.sql >> ${FULLDIR}/docker-entrypoint-initdb.d/init.sql
cat {ROOTDIR}/config/database/init.sql >> ${FULLDIR}/docker-entrypoint-initdb.d/init.sql

MAIN_NET="33.33.33"
MAIN_IP="33.33.33.254"
docker network create \
    --driver=bridge \
    --subnet=${MAIN_NET}.0/16 \
    --ip-range=${MAIN_NET}.0/24 \
    --gateway=${MAIN_IP} \
    network_dishfu &> /dev/null

# --- assigned dynamic password --$(openssl rand -base64 21)-

docker run -v "${FULLDIR}/data":/var/lib/mysql -v "${FULLDIR}/cronJobs":/var/cronJobs \
    -v "${FULLDIR}/log":/var/log \
    -v "${FULLDIR}/docker-entrypoint-initdb.d/":/docker-entrypoint-initdb.d/ \
    -p 3306:3306 \
    --network network_dishfu --restart on-failure \
    --name dishfu-db-container -e MYSQL_ROOT_PASSWORD=$(openssl rand -base64 32) -d dishfu-db-image
