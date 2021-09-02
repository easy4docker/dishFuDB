FROM mysql
RUN apt update && apt autoremove
RUN apt -y install sudo curl dirmngr apt-transport-https lsb-release ca-certificates
RUN curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
RUN sudo apt -y install nodejs
RUN apt-get -y install git
RUN apt-get install -y cron
RUN apt-get -y install vim

# RUN openssl rand -base64 21 > /ROOT_LOCAL_PASS
# RUN mkdir -p /var/app
COPY app /var/app
# COPY init.sql /docker-entrypoint-initdb.d/
COPY /initShell.sh /initShell.sh
RUN sed -i '1 a sh /initShell.sh' /usr/local/bin/docker-entrypoint.sh
RUN (crontab -l ; echo "@reboot sh /var/app/cronOnboot.sh >> /var/log/cronOnboot.log") | crontab
RUN (crontab -l ; echo "* * * * * sh /var/app/cronMin.sh >> /var/log/cronMin.log") | crontab
RUN (crontab -l ; echo "*/5 * * * * sh /var/app/cron5Mins.sh >> /var/log/cron5Mins.log") | crontab
RUN (crontab -l ; echo "*/15 * * * * sh /var/app/cron15Mins.sh >> /var/log/cron15Mins.log") | crontab
RUN (crontab -l ; echo "*/30 * * * * sh /var/app/cron30Mins.sh >> /var/log/cron30Mins.log") | crontab
RUN (crontab -l ; echo "3 * * * * sh /var/app/cron1hr.sh >> /var/log/cron1hr.log") | crontab