#!/bin/bash

IS_GREEN=$(cat /etc/nginx/conf.d/fe-route.inc | grep green) # 현재 실행중인 App이 blue인지 확인합니다.

if [ -z $IS_GREEN  ];then # blue라면

  echo "### BLUE => GREEN ###"

  sudo cp -r /home/ubuntu/fe /var/www/fe_green

  cp /etc/nginx/conf.d/fe-route-green /etc/nginx/conf.d/fe-route.inc

  sudo nginx -s reload

else
  echo "### GREEN => BLUE ###"

    sudo cp -r /home/ubuntuf/fe /var/www/fe_green

    cp /etc/nginx/conf.d/fe-route-blue /etc/nginx/conf.d/fe-route.inc

    sudo nginx -s reload
fi