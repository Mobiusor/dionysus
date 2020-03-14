docker build -t expert/metis_db:latest .
docker tag expert/metis_db:latest swr.cn-north-4.myhuaweicloud.com/meinenghua/expert/metis_db:latest
docker push swr.cn-north-4.myhuaweicloud.com/meinenghua/expert/metis_db:latest