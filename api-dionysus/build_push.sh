docker build -t expert/metis_api:latest .
docker tag expert/metis_api:latest swr.cn-north-4.myhuaweicloud.com/meinenghua/expert/dionysus_api:latest
docker push swr.cn-north-4.myhuaweicloud.com/meinenghua/expert/dionysus-api:latest