FROM node

LABEL maintainer="podgorniakj@example.com"

RUN npm update \
	&& npm install -g @angular/cli \
	&& npm install --global lite-server
	
COPY mem-app /home/mem-app

WORKDIR "/home/mem-app"

RUN npm install --save-dev @angular-devkit/build-angular \
	&& npm install @angular/compiler \
	&& npm install @angular/compiler-cli \
	&& npm link \
	&& ng build --prod
	
EXPOSE 3000

CMD lite-server --baseDir="dist/mem-app"
