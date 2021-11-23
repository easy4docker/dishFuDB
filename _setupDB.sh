#! /bin/sh
FULLDIR=$(pwd)
ROOTDIR=$(dirname $(dirname $(pwd)))
ENV=${1}
PORT=${2}

echo ${PORT}
cd ${FULLDIR}

mkdir -p ${FULLDIR}/docker-entrypoint-initdb.d

docker stop dishfu-db-container_${ENV} && docker rm dishfu-db-container_${ENV}  && docker image rm dishfu-db-image_${ENV} 
# --- && docker image prune -f

docker image build --file ${FULLDIR}/DockerfileDB -t dishfu-db-image_${ENV} .


cat ${ROOTDIR}/config/database/${ENV}/auth.sql >> ${FULLDIR}/docker-entrypoint-initdb.d/init.sql
cat ${ROOTDIR}/config/database/${ENV}/init.sql >> ${FULLDIR}/docker-entrypoint-initdb.d/init.sql

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
    -p ${PORT}:3306 \
    --network network_dishfu --restart on-failure \
    --name dishfu-db-container_${ENV} -e MYSQL_ROOT_PASSWORD=$(openssl rand -base64 32) -d dishfu-db-image_${ENV}
