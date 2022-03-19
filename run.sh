docker build . -t jiasaw-puzzle

docker stop jiasaw-puzzle-container
docker rm jiasaw-puzzle-container
docker run -d --name jiasaw-puzzle-container -p 8421:80 jiasaw-puzzle
