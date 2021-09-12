# shopping-app

An e-commerce project for Hepsiburada. 

## installation for dependencies

```shell script
npm i
```

### run

```shell script
yarn start
```
### run tests

```shell script
yarn test
```

### build for docker

```shell script 
docker build -t sample:ecommerce .
```

### run for docker

```shell script
sudo docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    sample:ecommerce
```

