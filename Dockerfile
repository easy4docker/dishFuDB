FROM mysql
RUN apt update && apt autoremove
RUN apt -y install sudo curl dirmngr apt-transport-https lsb-release ca-certificates
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN sudo apt -y install nodejs
RUN apt-get -y install git
RUN apt-get -y install vim

# RUN openssl rand -base64 21 > /ROOT_LOCAL_PASS
# RUN mkdir -p /var/app
# COPY app /var/app
# COPY init.sql /docker-entrypoint-initdb.d/
COPY /initShell.sh /initShell.sh
RUN sed -i '1 a sh /initShell.sh' /usr/local/bin/docker-entrypoint.sh