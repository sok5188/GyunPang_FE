#!/bin/bash

IS_GREEN=$(cat /etc/nginx/conf.d/fe-route.inc | grep green)

if [ -z "$IS_GREEN" ]; then

  echo "### BLUE => GREEN ###"

  sudo cp -r /home/ubuntu/fe /var/www/fe_green

  sudo cp /etc/nginx/conf.d/fe-route-green /etc/nginx/conf.d/fe-route.inc

  sudo nginx -s reload

else
  echo "### GREEN => BLUE ###"

    sudo cp -r /home/ubuntu/fe /var/www/fe_blue

    sudo cp /etc/nginx/conf.d/fe-route-blue /etc/nginx/conf.d/fe-route.inc

    sudo nginx -s reload
fi