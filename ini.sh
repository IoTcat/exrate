sudo pm2 stop exrate
sudo pm2 delete exrate
sudo pm2 start index.js --name exrate -o /var/log/exrate.log -e /var/log/exrate.err
sudo pm2 save
